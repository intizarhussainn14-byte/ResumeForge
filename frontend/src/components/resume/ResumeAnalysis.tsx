"use client";

import { useState } from "react";

import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";

import ResumePreview from "@/components/resume/ResumePreview";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResumeAnalysisProps {
  resumeId: string;
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs Improvement";
  return "Poor";
}

function getScoreColor(score: number) {
  if (score >= 80) {
    return "text-green-600";
  }

  if (score >= 60) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

function getProgressColor(score: number) {
  if (score >= 80) {
    return "bg-green-500";
  }

  if (score >= 60) {
    return "bg-yellow-500";
  }

  return "bg-red-500";
}

export default function ResumeAnalysis({ resumeId }: ResumeAnalysisProps) {
  const { data: analysis, isLoading, error } = useResumeAnalysis(resumeId);

  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <Card className="mt-6 p-6">
        <p className="text-gray-500">Loading AI analysis...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 p-6">
        <p className="text-gray-500">
          No AI analysis available yet. Analyze your resume to see results.
        </p>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  async function copyOptimizedResume() {
    if (!analysis.optimizedResume) return;

    await navigator.clipboard.writeText(analysis.optimizedResume);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  function downloadOptimizedResume() {
    if (!analysis.optimizedResume) return;

    const blob = new Blob([analysis.optimizedResume], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "optimized-resume.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const scores = [
    {
      label: "Overall",
      score: analysis.overallScore,
    },
    {
      label: "Keywords",
      score: analysis.keywordScore,
    },
    {
      label: "Skills",
      score: analysis.skillsScore,
    },
    {
      label: "Formatting",
      score: analysis.formattingScore,
    },
  ];

  return (
    <Card className="mt-6 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">AI Resume Analysis</h3>

        <p className="mt-1 text-sm text-gray-500">
          AI-powered ATS analysis of your resume.
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {scores.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-white p-4 text-center shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{item.label}</p>

            <p
              className={`mt-2 text-3xl font-bold ${getScoreColor(item.score)}`}
            >
              {item.score}
              <span className="text-base text-gray-400">/100</span>
            </p>

            <p
              className={`mt-1 text-xs font-medium ${getScoreColor(
                item.score
              )}`}
            >
              {getScoreLabel(item.score)}
            </p>

            {/* Progress Bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${getProgressColor(
                  item.score
                )}`}
                style={{
                  width: `${item.score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Missing Keywords */}
      {analysis.missingKeywords?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-lg font-semibold">Missing Keywords</h4>

          <p className="mb-3 text-sm text-gray-500">
            Consider adding these keywords if they accurately reflect your
            experience.
          </p>

          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((item: string, index: number) => (
              <span
                key={index}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {analysis.strengths?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-lg font-semibold">Strengths</h4>

          <div className="space-y-2">
            {analysis.strengths.map((item: string, index: number) => (
              <div
                key={index}
                className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
              >
                <span className="mr-2 font-bold">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {analysis.weaknesses?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-lg font-semibold">Weaknesses</h4>

          <div className="space-y-2">
            {analysis.weaknesses.map((item: string, index: number) => (
              <div
                key={index}
                className="rounded-md border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800"
              >
                <span className="mr-2 font-bold">⚠</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-lg font-semibold">AI Suggestions</h4>

          <div className="space-y-2">
            {analysis.suggestions.map((item: string, index: number) => (
              <div
                key={index}
                className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800"
              >
                <span className="mr-2 font-bold">💡</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Optimized Resume */}
      {analysis.optimizedResume && (
        <div className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-lg font-semibold">AI Optimized Resume</h4>

              <p className="text-sm text-gray-500">
                Your resume optimized for the selected job description.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={copyOptimizedResume}
              >
                {copied ? "Copied!" : "Copy Resume"}
              </Button>

              <Button type="button" onClick={downloadOptimizedResume}>
                Download Resume
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <ResumePreview
            title="AI Optimized Resume"
            content={analysis.optimizedResume}
          />
        </div>
      )}
    </Card>
  );
}
