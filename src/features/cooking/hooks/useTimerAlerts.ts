"use client";

import { useEffect, useRef } from "react";
import type { CookSession } from "../store";

let audio: AudioContext | undefined;

function chime() {
  try {
    audio ??= new AudioContext();
    const start = audio.currentTime;
    [0, 0.25, 0.5].forEach((offset) => {
      const osc = audio!.createOscillator();
      const gain = audio!.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.2, start + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, start + offset + 0.2);
      osc.connect(gain).connect(audio!.destination);
      osc.start(start + offset);
      osc.stop(start + offset + 0.2);
    });
  } catch {
    // No audio available.
  }
  navigator.vibrate?.([200, 100, 200]);
}

/**
 * Sound and vibration once per timer, when it finishes while the app is visible.
 * Timers already finished on load (e.g. after the phone was locked) stay silent.
 */
export function useTimerAlerts(session: CookSession | null, now: number) {
  const running = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (!now) return;
    const next = new Set<string>();
    for (const [step, { endsAt }] of Object.entries(session?.timers ?? {})) {
      const key = `${session!.startedAt}:${step}:${endsAt}`;
      if (endsAt > now) next.add(key);
      else if (running.current?.has(key) && document.visibilityState === "visible") chime();
    }
    running.current = next;
  }, [session, now]);
}
