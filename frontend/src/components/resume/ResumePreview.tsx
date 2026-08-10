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
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Resume Preview
        </p>
      </div>

      {/* Resume Content */}
      <div className="min-h-[600px] px-8 py-8">
        <div className="whitespace-pre-wrap text-sm leading-7 text-gray-800">
          {content}
        </div>
      </div>
    </Card>
  );
}