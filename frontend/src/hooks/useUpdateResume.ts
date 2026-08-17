"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResume } from "@/services/resume.service";

export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        originalText?: string;
      };
    }) => updateResume(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
}
