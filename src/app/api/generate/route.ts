import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

export const runtime = "edge";

// Define the schema for each section
const SectionSchema = z.object({
  textSnippet: z.string(),
  suggestion: z.string(),
});

// Define the schema for the entire structure
const ContentSchema = z.object({
  Header: SectionSchema,
  HeroSection: SectionSchema,
  FeaturesBenefits: SectionSchema,
  Testimonials: SectionSchema,
  CallToAction: SectionSchema,
  Footer: SectionSchema,
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const { url } = JSON.parse(rawBody);

    if (!url) {
      return new Response(JSON.stringify({ error: 'Invalid request. Provide a valid url.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Wordware API call
    const apiUrl = "https://app.wordware.ai/api/released-app/a69539da-b825-40ce-81f6-7b1fc86f1e86/run";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout

    try {
      const response = await fetch(apiUrl, {
        method: "post",
        body: JSON.stringify({
          inputs: {
            url: url.trim(),
          },
          version: "^1.6",
        }),
        headers: {
          Authorization: `Bearer ${process.env.WORDWARE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Initial response to prevent timeout
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue('{"status":"processing"}');
        }
      });

      return new Response(stream, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return new Response(JSON.stringify({ error: 'Request timed out' }), {
          status: 504,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        console.error('Error from API:', response.status, response.statusText, responseText);
        return new Response(JSON.stringify({ error: 'API request failed', details: responseText }), {
          status: response.status,
          statusText: response.statusText,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // {"type":"chunk","value":{"type":"prompt","state":"error","output":"Error: Failed to generate structured output on attempt 4. Giving up."}}
      // Temp workaround to get the Wordware API response to OpenAI for further structuring
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await client.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Please structure the content according to the provided schema.",
          },
          { 
            role: "user", 
            content: `Please structure the following content: ${responseText}`, 
          },
        ],
        response_format: zodResponseFormat(ContentSchema, 'contentResponse'),
      });

      const message = completion.choices[0]?.message;
      if (message?.parsed) {
        return new Response(JSON.stringify(message.parsed), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Failed to parse structured response', details: message.refusal }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid request. Provide a valid url.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
