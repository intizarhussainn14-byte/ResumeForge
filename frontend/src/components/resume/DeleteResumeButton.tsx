"use client";

import { useDeleteResume } from "@/hooks/useDeleteResume";
import { Button } from "@/components/ui/button";

interface Props {
  resumeId: string;
}

export default function DeleteResumeButton({ resumeId }: Props) {
  const { mutate, isPending } = useDeleteResume();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume? if yes then click ok."
    );

    if (!confirmed) return;

    mutate(resumeId);
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
