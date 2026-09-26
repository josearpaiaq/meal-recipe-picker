"use client";

import { useTranslations } from "next-intl";
import { Button, Icon } from "@/shared/ui";
import { formatClock, isDone, remainingSec } from "../lib/timers";

type Props = {
  label: string;
  durationSec: number;
  endsAt: number | undefined;
  now: number;
  onStart: () => void;
  onReset: () => void;
};

export function TimerCard({ label, durationSec, endsAt, now, onStart, onReset }: Props) {
  const t = useTranslations("cooking");
  const done = endsAt !== undefined && isDone(endsAt, now);

  return (
    <div className="flex items-center justify-between gap-3 rounded-card bg-surface px-4.5 py-4 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-muted">{label}</p>
        <p
          role="timer"
          aria-live={done ? "assertive" : "off"}
          className={
            done
              ? "font-display text-3xl font-semibold text-warm-ink"
              : "font-display text-3xl font-semibold tabular-nums"
          }
        >
          {done
            ? t("timesUp")
            : formatClock(endsAt === undefined ? durationSec : remainingSec(endsAt, now))}
        </p>
      </div>
      {endsAt === undefined ? (
        <Button variant="timer" onClick={onStart}>
          <Icon name="timer" className="size-4.5" />
          {t("start")}
        </Button>
      ) : (
        <Button variant="secondary" onClick={onReset}>
          {t("reset")}
        </Button>
      )}
    </div>
  );
}
