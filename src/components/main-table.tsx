"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentStructure } from "@/lib/types";

interface MainTableProps {
  generatedResult: ContentStructure | null;
  isLoading: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ generatedResult, isLoading }) => {
  return (
    <Table>
      <TableCaption>Generated Result</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Section</TableHead>
          <TableHead>Text Snippet</TableHead>
          <TableHead>Suggestion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Hang tight... Might take a minute or two!
            </TableCell>
          </TableRow>
        ) : generatedResult ? (
          <>
            <TableRow>
              <TableCell>Header</TableCell>
              <TableCell>{generatedResult.Header.textSnippet}</TableCell>
              <TableCell>{generatedResult.Header.suggestion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hero Section</TableCell>
              <TableCell>{generatedResult.HeroSection.textSnippet}</TableCell>
              <TableCell>{generatedResult.HeroSection.suggestion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Features & Benefits</TableCell>
              <TableCell>{generatedResult.FeaturesBenefits.textSnippet}</TableCell>
              <TableCell>{generatedResult.FeaturesBenefits.suggestion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Testimonials</TableCell>
              <TableCell>{generatedResult.Testimonials.textSnippet}</TableCell>
              <TableCell>{generatedResult.Testimonials.suggestion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Call to Action</TableCell>
              <TableCell>{generatedResult.CallToAction.textSnippet}</TableCell>
              <TableCell>{generatedResult.CallToAction.suggestion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Footer</TableCell>
              <TableCell>{generatedResult.Footer.textSnippet}</TableCell>
              <TableCell>{generatedResult.Footer.suggestion}</TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No result generated yet</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MainTable;