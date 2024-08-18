"use client";
import React, { useState } from 'react';
import MainInput from './main-input';
import MainTable from './main-table';

import { ContentStructure } from "@/lib/types";

const MainContainer: React.FC = () => {
  const [generatedResult, setGeneratedResult] = useState<ContentStructure | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResultGenerated = (result: ContentStructure) => {
    setGeneratedResult(result);
    setIsLoading(false);
  };

  const handleGenerateStart = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <MainInput onResultGenerated={handleResultGenerated} onGenerateStart={handleGenerateStart} />
      <MainTable generatedResult={generatedResult} isLoading={isLoading} />
    </div>
  );
};

export default MainContainer;