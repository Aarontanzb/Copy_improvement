"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { ContentStructure } from "@/lib/types";

interface MainInputProps {
  onResultGenerated: (result: ContentStructure) => void;
  onGenerateStart: () => void;
}

const MainInput: React.FC<MainInputProps> = ({ onResultGenerated, onGenerateStart }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateStart(); // Call this function when generation starts
    try {
      // Log the input to ensure it's correct
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: input.trim(),
        }),
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data: ContentStructure = await response.json();
      onResultGenerated(data); // Pass the result as ContentStructure
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your site url here"
          className="w-full mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Generate
        </button>
      </form>
    </div>
  );
};

export default MainInput;