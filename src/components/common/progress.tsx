"use client";

import { useEffect } from "react";

import { Progress } from "@/components/ui/primitives/progress";

export function ProgressBar({
  progress,
  setProgress,
  fetchedChecklistCompletedCount,
  totalCount,
}: {
  progress: any;
  setProgress: any;
  fetchedChecklistCompletedCount: any;
  totalCount: number;
}) {
  let percentage = (fetchedChecklistCompletedCount * 100) / totalCount;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-full" />;
}
