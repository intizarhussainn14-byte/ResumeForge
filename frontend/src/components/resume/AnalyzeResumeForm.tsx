"use client";

import { useState } from "react";
import { useAnalyzeResume } from "@/hooks/useAnalyzeResume";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  resumeId: string;
}

export default function AnalyzeResumeForm({ resumeId }: Props) {
  const [jobDescription, setJobDescription] = useState("");

  const { mutate, isPending } = useAnalyzeResume();

  function handleAnalyze() {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    mutate(
      {
        id: resumeId,
        jobDescription: jobDescription.trim(),
      },
      {
        onSuccess: () => {
          alert("Resume analyzed successfully!");
          setJobDescription("");
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to analyze resume.");
        },
      }
    );
  }

  return (
    <Card className="mt-4 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Analyze Resume</h3>

        <p className="mt-1 text-sm text-gray-500">
          Paste a job description to compare your resume against the
          requirements and generate an optimized version.
        </p>
      </div>

      {/* Job Description */}
      <Textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="min-h-40"
      />

      {/* Analyze Button */}
      <div className="mt-4 flex items-center gap-3">
        <Button
          onClick={handleAnalyze}
          disabled={isPending || !jobDescription.trim()}
        >
          {isPending ? "Analyzing..." : "Analyze Resume"}
        </Button>

        {isPending && (
          <p className="text-sm text-gray-500">
            AI is analyzing your resume...
          </p>
        )}
      </div>
    </Card>
  );
}
