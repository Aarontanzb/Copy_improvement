import { z } from 'zod';

// Define the schema for each section
export const SectionSchema = z.object({
  textSnippet: z.string(),
  suggestion: z.string(),
});

// Define the schema for the entire structure
export const ContentSchema = z.object({
  Header: SectionSchema,
  HeroSection: SectionSchema,
  FeaturesBenefits: SectionSchema,
  Testimonials: SectionSchema,
  CallToAction: SectionSchema,
  Footer: SectionSchema,
});

// Define TypeScript types for the schema
export type Section = z.infer<typeof SectionSchema>;
export type ContentStructure = z.infer<typeof ContentSchema>;
