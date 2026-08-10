"use client";

import { Card } from "@/components/ui/card";

interface ResumePreviewProps {
  title: string;
  content: string;
}

export default function ResumePreview({
  title,
  content,
}: ResumePreviewProps) {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      {/* Resume Header */}
      <div className="border-b px-8 py-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Resume Preview
        </p>
      </div>

      {/* Resume Content */}
      <div className="min-h-[600px] px-8 py-8">
        {content ? (
          <div className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-800">
            {content}
          </div>
        ) : (
          <div className="flex min-h-[500px] items-center justify-center">
            <p className="text-center text-sm text-gray-400">
              Your resume preview will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-8 py-3">
        <p className="text-center text-xs text-gray-400">
          ResumeForge
        </p>
      </div>
    </Card>
  );
}