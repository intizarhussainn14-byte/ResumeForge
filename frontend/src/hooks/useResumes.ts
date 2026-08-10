"use client";

import { useQuery } from "@tanstack/react-query";
import { getResumes } from "@/services/resume.service";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
  });
}