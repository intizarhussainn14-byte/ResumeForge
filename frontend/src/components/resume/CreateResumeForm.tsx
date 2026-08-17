"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateResume } from "@/hooks/useCreateResume";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),

  originalText: z
    .string()
    .trim()
    .min(20, "Resume must contain at least 20 characters."),
});

type FormValues = z.infer<typeof schema>;

export default function CreateResumeForm() {
  const { mutate, isPending } = useCreateResume();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      originalText: "",
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create New Resume</h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your resume information to start analyzing and optimizing it with
          AI.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Resume Title */}
        <div className="space-y-2">
          <label htmlFor="resume-title" className="text-sm font-medium">
            Resume Title
          </label>

          <Input
            id="resume-title"
            placeholder="e.g. Software Engineer Resume"
            {...register("title")}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Resume Content */}
        <div className="space-y-2">
          <label htmlFor="resume-content" className="text-sm font-medium">
            Resume Content
          </label>

          <textarea
            id="resume-content"
            {...register("originalText")}
            placeholder={`Paste your resume here...

Example:
Experienced Software Engineer with expertise in React,
Next.js, Node.js, TypeScript...`}
            className="min-h-56 w-full rounded-md border p-3 text-sm outline-none transition focus:ring-2"
          />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Minimum 20 characters</span>

            <span>{watch("originalText")?.length ?? 0} characters</span>
          </div>

          {errors.originalText && (
            <p className="text-sm text-red-500">
              {errors.originalText.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating Resume..." : "Create Resume"}
          </Button>

          {isPending && (
            <p className="text-sm text-gray-500">Saving your resume...</p>
          )}
        </div>
      </form>
    </Card>
  );
}
