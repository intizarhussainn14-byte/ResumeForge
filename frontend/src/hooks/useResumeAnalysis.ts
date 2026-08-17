"use client";

import { useQuery } from "@tanstack/react-query";
import { getResumeAnalysis } from "@/services/resume.service";

export function useResumeAnalysis(resumeId: string) {
  return useQuery({
    queryKey: ["resume-analysis", resumeId],
    queryFn: () => getResumeAnalysis(resumeId),
    enabled: !!resumeId,
  });
}
