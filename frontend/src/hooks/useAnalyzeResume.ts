"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { analyzeResume } from "@/services/resume.service";

export function useAnalyzeResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      jobDescription,
    }: {
      id: string;
      jobDescription: string;
    }) => analyzeResume(id, jobDescription),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
}
