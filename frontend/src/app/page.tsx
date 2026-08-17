"use client";

import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import CreateResumeForm from "@/components/resume/CreateResumeForm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data: resumes, isLoading, error } = useResumes();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">ResumeForge Dashboard</h1>

          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>

        {/* Create Resume Form */}
        <CreateResumeForm />

        {/* Resume List */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">My Resumes</h2>

          {isLoading && <p>Loading resumes...</p>}

          {error && <p className="text-red-500">Failed to load resumes.</p>}

          {resumes && resumes.length === 0 && <p>No resumes found.</p>}

          <div className="space-y-4">
            {resumes?.map((resume) => (
              <Card key={resume.id} className="p-4">
                <h3 className="text-lg font-semibold">{resume.title}</h3>

                <p className="text-gray-600 mt-2 line-clamp-3">
                  {resume.originalText}
                </p>

                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Status: {resume.status}</span>

                  <span>ATS: {resume.atsScore ?? "Not analyzed"}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
