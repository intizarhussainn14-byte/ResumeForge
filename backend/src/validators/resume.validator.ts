import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  originalText: z
    .string()
    .min(50, "Resume content must be at least 50 characters"),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
