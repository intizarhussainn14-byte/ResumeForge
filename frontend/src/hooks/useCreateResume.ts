"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResume } from "@/services/resume.service";

export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
}