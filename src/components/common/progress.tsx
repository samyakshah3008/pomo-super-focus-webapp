"use client";

import { useEffect } from "react";

import { Progress } from "@/components/ui/primitives/progress";

export function ProgressBar({
  progress,
  setProgress,
}: {
  progress: any;
  setProgress: any;
}) {
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-full" />;
}
