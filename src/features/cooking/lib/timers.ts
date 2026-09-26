export type Timers = Record<number, { endsAt: number }>;
export type TimerEntry = { step: number; endsAt: number };

export function remainingSec(endsAt: number, now: number): number {
  return Math.max(0, Math.ceil((endsAt - now) / 1000));
}

export function isDone(endsAt: number, now: number): boolean {
  return endsAt <= now;
}

export function sortBySoonest(timers: Timers): TimerEntry[] {
  return Object.entries(timers)
    .map(([step, { endsAt }]) => ({ step: Number(step), endsAt }))
    .sort((a, b) => a.endsAt - b.endsAt || a.step - b.step);
}

/** 90 → "1:30", 3725 → "1:02:05". */
export function formatClock(totalSec: number): string {
  const sec = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}
