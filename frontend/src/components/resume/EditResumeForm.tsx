"use client";

import { useState } from "react";

import { useUpdateResume } from "@/hooks/useUpdateResume";
import { Resume } from "@/services/resume.service";

import ResumePreview from "@/components/resume/ResumePreview";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
  resume: Resume;
}

export default function EditResumeForm({ resume }: Props) {
  const { mutate, isPending } = useUpdateResume();

  const [title, setTitle] = useState(resume.title);
  const [originalText, setOriginalText] = useState(resume.originalText);

  const [editing, setEditing] = useState(false);

  const characterCount = originalText.length;

  const wordCount = originalText.trim()
    ? originalText.trim().split(/\s+/).length
    : 0;

  function handleSave() {
    if (title.trim().length < 3) {
      alert("Resume title must be at least 3 characters.");
      return;
    }

    if (originalText.trim().length < 20) {
      alert("Resume must contain at least 20 characters.");
      return;
    }

    mutate(
      {
        id: resume.id,
        data: {
          title: title.trim(),
          originalText: originalText.trim(),
        },
      },
      {
        onSuccess: () => {
          setEditing(false);
        },
      }
    );
  }

  function handleCancel() {
    setTitle(resume.title);
    setOriginalText(resume.originalText);
    setEditing(false);
  }

  if (!editing) {
    return (
      <Button variant="outline" onClick={() => setEditing(true)}>
        Edit
      </Button>
    );
  }

  return (
    <Card className="mt-4 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Edit Resume</h3>

        <p className="mt-1 text-sm text-gray-500">
          Update your resume information and preview the changes before saving.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Edit Form */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor={`resume-title-${resume.id}`}
              className="text-sm font-medium"
            >
              Resume Title
            </label>

            <Input
              id={`resume-title-${resume.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer Resume"
            />

            {title.trim().length > 0 && title.trim().length < 3 && (
              <p className="text-sm text-red-500">
                Title must be at least 3 characters.
              </p>
            )}
          </div>

          {/* Resume Content */}
          <div className="space-y-2">
            <label
              htmlFor={`resume-content-${resume.id}`}
              className="text-sm font-medium"
            >
              Resume Content
            </label>

            <textarea
              id={`resume-content-${resume.id}`}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-80 w-full rounded-md border p-3 text-sm outline-none transition focus:ring-2"
              placeholder="Enter your resume content..."
            />

            {/* Counters */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Minimum 20 characters</span>

              <span>
                {characterCount} characters · {wordCount} words
              </span>
            </div>

            {originalText.trim().length > 0 &&
              originalText.trim().length < 20 && (
                <p className="text-sm text-red-500">
                  Resume must contain at least 20 characters.
                </p>
              )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleSave}
              disabled={
                isPending ||
                title.trim().length < 3 ||
                originalText.trim().length < 20
              }
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Live Preview</h3>

          <p className="mb-3 text-sm text-gray-500">
            Preview updates as you edit your resume.
          </p>

          <ResumePreview
            title={title || "Untitled Resume"}
            content={originalText || "Your resume preview will appear here..."}
          />
        </div>
      </div>
    </Card>
  );
}
