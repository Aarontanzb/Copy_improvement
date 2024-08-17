"use client";
import React, { useState } from 'react';
import MainInput from './main-input';
import MainTable from './main-table';

import { ContentStructure } from "@/lib/types";

const MainContainer: React.FC = () => {
  const [generatedResult, setGeneratedResult] = useState<ContentStructure | null>(null);

  const handleResultGenerated = (result: ContentStructure) => {
    setGeneratedResult(result);
  };

  return (
    <div>
      <MainInput onResultGenerated={handleResultGenerated} />
      <MainTable generatedResult={generatedResult} />
    </div>
  );
};

export default MainContainer;
