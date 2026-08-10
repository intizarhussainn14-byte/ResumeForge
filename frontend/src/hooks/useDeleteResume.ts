"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResume } from "@/services/resume.service";

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
}