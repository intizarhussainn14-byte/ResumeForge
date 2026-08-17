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
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data: resumes, isLoading, error } = useResumes();

  const router = useRouter();

  const totalResumes = resumes?.length ?? 0;

  const analyzedResumes =
    resumes?.filter(
      (resume) => resume.status === "ANALYZED" || resume.status === "OPTIMIZED"
    ).length ?? 0;

  const analyzedScores =
    resumes
      ?.map((resume) => resume.atsScore)
      .filter((score): score is number => score !== null) ?? [];

  const averageATS =
    analyzedScores.length > 0
      ? Math.round(
          analyzedScores.reduce((sum, score) => sum + score, 0) /
            analyzedScores.length
        )
      : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              ResumeForge Dashboard
            </h1>

            <p className="mt-1 text-muted-foreground">
              Create, optimize, and analyze your resumes with AI.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Resumes */}
          <Card className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Total Resumes
            </p>

            <p className="mt-2 text-3xl font-bold">{totalResumes}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Resumes in your account
            </p>
          </Card>

          {/* Analyzed Resumes */}
          <Card className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Analyzed Resumes
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analyzedResumes}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Resumes analyzed by AI
            </p>
          </Card>

          {/* Average ATS */}
          <Card className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Average ATS Score
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${
                averageATS === null
                  ? "text-muted-foreground"
                  : averageATS >= 80
                    ? "text-green-600 dark:text-green-400"
                    : averageATS >= 60
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
              }`}
            >
              {averageATS !== null ? `${averageATS}/100` : "N/A"}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Based on analyzed resumes
            </p>
          </Card>
        </div>

        {/* Create Resume */}
        <CreateResumeForm />

        {/* Resume List */}
        <Card className="mt-6 p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">My Resumes</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage and analyze your saved resumes.
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {totalResumes} {totalResumes === 1 ? "resume" : "resumes"}
            </span>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="rounded-md border bg-background p-6 text-center">
              <p className="text-muted-foreground">Loading resumes...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
              <p className="text-red-600 dark:text-red-400">
                Failed to load resumes.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && resumes?.length === 0 && (
            <div className="rounded-lg border border-dashed bg-background p-10 text-center">
              <h3 className="text-lg font-semibold">No resumes yet</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Create your first resume above to start using ResumeForge AI.
              </p>
            </div>
          )}

          {/* Resume Cards */}
          <div className="space-y-8">
            {resumes?.map((resume) => (
              <div key={resume.id}>
                {/* Resume Card */}
                <Card className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{resume.title}</h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Created{" "}
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Original Resume */}
                  <div className="mt-5">
                    <h4 className="mb-2 font-semibold">Original Resume</h4>

                    <div className="max-h-60 overflow-y-auto rounded-md border bg-muted/30 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {resume.originalText}
                      </p>
                    </div>
                  </div>

                  {/* Status + ATS + Actions */}
                  <div className="mt-5 flex flex-col gap-4 border-t pt-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status */}
                      <div>
                        <span className="mr-2 text-sm text-muted-foreground">
                          Status:
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            resume.status === "ANALYZED"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : resume.status === "OPTIMIZED"
                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span className="mr-1.5">●</span>

                          {resume.status}
                        </span>
                      </div>

                      {/* ATS */}
                      <div
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                          resume.atsScore === null
                            ? "bg-muted text-muted-foreground"
                            : resume.atsScore >= 80
                              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                              : resume.atsScore >= 60
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                                : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        ATS: {resume.atsScore ?? "Not analyzed"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <EditResumeForm resume={resume} />

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

                      <DeleteResumeButton resumeId={resume.id} />
                    </div>
                  </div>
                </Card>

                {/* AI Analysis Form */}
                <AnalyzeResumeForm resumeId={resume.id} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
