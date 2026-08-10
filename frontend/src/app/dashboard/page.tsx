"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";

import CreateResumeForm from "@/components/resume/CreateResumeForm";
import EditResumeForm from "@/components/resume/EditResumeForm";
import DeleteResumeButton from "@/components/resume/DeleteResumeButton";
import AnalyzeResumeForm from "@/components/resume/AnalyzeResumeForm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data: resumes, isLoading, error } = useResumes();

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              ResumeForge Dashboard
            </h1>

            <p className="mt-1 text-gray-600">
              Create, optimize, and analyze your resumes with AI.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        {/* Create Resume */}
        <CreateResumeForm />

        {/* Resume List */}
        <Card className="mt-6 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            My Resumes
          </h2>

          {isLoading && (
            <p className="text-gray-500">
              Loading resumes...
            </p>
          )}

          {error && (
            <p className="text-red-500">
              Failed to load resumes.
            </p>
          )}

          {!isLoading &&
            !error &&
            resumes?.length === 0 && (
              <p className="text-gray-500">
                No resumes found.
              </p>
            )}

          <div className="space-y-8">
            {resumes?.map((resume) => (
              <div key={resume.id}>
                {/* Resume Card */}
                <Card className="p-5">
                  <h3 className="text-xl font-semibold">
                    {resume.title}
                  </h3>

                  {/* Original Resume */}
                  <div className="mt-4">
                    <h4 className="mb-2 font-semibold text-gray-700">
                      Original Resume
                    </h4>

                    <p className="whitespace-pre-wrap text-gray-600">
                      {resume.originalText}
                    </p>
                  </div>

                  {/* Resume Status + ATS + Actions */}
                  <div className="mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                      <div className="mb-2">
                        <span className="mr-2 text-gray-500">
                          Status:
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${resume.status === "ANALYZED"
                              ? "bg-blue-100 text-blue-700"
                              : resume.status === "OPTIMIZED"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          <span className="mr-1.5">●</span>
                          {resume.status}
                        </span>
                      </div>

                      <div
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${resume.atsScore === null
                            ? "bg-gray-100 text-gray-700"
                            : resume.atsScore >= 80
                              ? "bg-green-100 text-green-700"
                              : resume.atsScore >= 60
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                      >
                        ATS:{" "}
                        {resume.atsScore ?? "Not analyzed"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <EditResumeForm
                        resume={resume}
                      />

                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/dashboard/resumes/${resume.id}/analysis`
                          )
                        }
                      >
                        View Analysis
                      </Button>

                      <DeleteResumeButton
                        resumeId={resume.id}
                      />
                    </div>
                  </div>
                </Card>

                {/* AI Analysis Form */}
                <AnalyzeResumeForm
                  resumeId={resume.id}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}