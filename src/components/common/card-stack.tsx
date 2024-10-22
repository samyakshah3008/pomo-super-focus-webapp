"use client";
import { cn } from "@/lib/utils";
import { CardStack } from "../ui/card-stack";

export function CardStackUsage({ className, items }: any) {
  return (
    <div className={cn(`flex items-center justify-center`, className)}>
      <CardStack items={items} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};
