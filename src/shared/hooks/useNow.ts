"use client";

import { useSyncExternalStore } from "react";

// One shared ticking clock: a single interval serves every subscriber.
const listeners = new Map<() => void, number>();
let now = Date.now();
let timer: ReturnType<typeof setInterval> | undefined;
let tickMs = 0;

function restart() {
  if (timer) clearInterval(timer);
  timer = undefined;
  if (listeners.size === 0) return;
  tickMs = Math.min(...listeners.values());
  timer = setInterval(() => {
    now = Date.now();
    listeners.forEach((_, listener) => listener());
  }, tickMs);
}

function subscribe(listener: () => void, intervalMs: number) {
  listeners.set(listener, intervalMs);
  now = Date.now();
  if (!timer || intervalMs < tickMs) restart();
  return () => {
    listeners.delete(listener);
    restart();
  };
}

/** Current epoch ms, refreshed by the shared clock. Returns 0 on the server. */
export function useNow(intervalMs = 1000): number {
  return useSyncExternalStore(
    (listener) => subscribe(listener, intervalMs),
    () => now,
    () => 0,
  );
}
