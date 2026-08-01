"use client";

import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/services/auth.service";
import { getResumes } from "@/services/resume.service";

export function useResumes() {
  const isAuthenticated = typeof window !== "undefined" && !!getToken();

  return useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    enabled: isAuthenticated,
  });
}
