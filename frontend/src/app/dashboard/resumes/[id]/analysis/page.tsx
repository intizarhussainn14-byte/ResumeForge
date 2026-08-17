"use client";

import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";
import { useResumes } from "@/hooks/useResumes";

export default function ResumeAnalysisPage() {
  const router = useRouter();
  const params = useParams();

  const resumeId = params.id as string;

  const { data: resumes, isLoading } = useResumes();

  const resume = resumes?.find((item) => item.id === resumeId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">Loading resume...</p>
        </div>
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="p-6">
            <h1 className="text-xl font-semibold">Resume not found</h1>

            <Button className="mt-4" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>

          <h1 className="mt-5 text-3xl font-bold">{resume.title}</h1>

          <p className="mt-1 text-gray-600">
            AI-powered ATS analysis and resume optimization.
          </p>
        </div>

        {/* Analysis */}
        <ResumeAnalysis resumeId={resumeId} />
      </div>
    </main>
  );
}
