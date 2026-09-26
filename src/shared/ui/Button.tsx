import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "timer" | "quiet";
export type ButtonSize = "sm" | "md" | "lg" | "cook";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-herb text-surface hover:bg-herb-ink",
  secondary: "border-2 border-ink bg-transparent text-ink hover:bg-sunken",
  destructive: "bg-tomato-strong text-surface hover:bg-warm-ink",
  timer: "bg-tomato text-surface hover:bg-tomato-strong",
  quiet: "bg-sunken text-ink hover:bg-line",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-touch px-4 text-sm",
  md: "h-13 px-5 text-base",
  lg: "h-14 px-6 text-base",
  cook: "h-cook-button px-6 text-lg",
};

/** Shared classes so links can look like buttons. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-button font-semibold no-underline transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-herb",
    "disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...rest }: Props) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}
