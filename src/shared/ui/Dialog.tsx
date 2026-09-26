"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

type Props = {
  open: boolean;
  /** Called on Esc and backdrop click too: those always mean the safe choice. */
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Modal built on the native <dialog> opened with showModal(): the page behind
 * is inert, focus moves inside and returns to the trigger when it closes.
 */
export function Dialog({ open, onClose, title, children, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-3rem)] max-w-md rounded-card bg-surface p-0 text-ink shadow-2xl",
        className,
      )}
    >
      {open && (
        <div className="flex flex-col gap-3 px-5.5 pt-6 pb-5">
          <h2 id={titleId} className="font-display text-2xl leading-tight font-semibold">
            {title}
          </h2>
          {children}
        </div>
      )}
    </dialog>
  );
}
