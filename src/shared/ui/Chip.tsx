import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type Props = {
  variant?: "filled" | "dashed" | "outline";
  children: ReactNode;
  className?: string;
};

const variants = {
  filled: "bg-herb-soft px-2.5 py-1 text-sm font-semibold text-herb-ink",
  dashed: "border border-dashed border-line-strong px-2.5 py-1 text-sm font-medium text-muted",
  outline: "rounded-xl border border-line bg-surface px-3 py-2 text-base font-medium text-ink",
};

export function Chip({ variant = "filled", children, className }: Props) {
  return (
    <span className={cn("inline-flex items-center rounded-full", variants[variant], className)}>
      {children}
    </span>
  );
}
