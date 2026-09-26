import { cn } from "../lib/cn";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "tabs" | "compact" | "pills";
  className?: string;
};

const groupClasses = {
  tabs: "grid auto-cols-fr grid-flow-col gap-1 rounded-button bg-sunken p-1",
  compact: "flex gap-0.5 rounded-lg bg-sunken p-0.5",
  pills: "flex flex-wrap items-center gap-2",
};

const itemClasses = {
  tabs: {
    base: "min-h-touch rounded-lg text-base",
    on: "bg-ink font-semibold text-ground",
    off: "font-medium text-ink hover:bg-line",
  },
  compact: {
    base: "size-11 rounded-md text-sm",
    on: "bg-ink font-semibold text-ground",
    off: "font-medium text-ink hover:bg-line",
  },
  pills: {
    base: "min-h-touch rounded-full border-2 px-3.5 text-sm",
    on: "border-herb bg-herb font-semibold text-surface",
    off: "border-line-strong font-medium text-ink hover:bg-sunken",
  },
};

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  variant = "tabs",
  className,
}: Props<T>) {
  const item = itemClasses[variant];
  return (
    <div role="group" aria-label={label} className={cn(groupClasses[variant], className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              item.base,
              selected ? item.on : item.off,
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-herb",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
