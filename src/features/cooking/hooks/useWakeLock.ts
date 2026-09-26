"use client";

import { useEffect } from "react";

/** Keeps the screen awake while mounted, where the browser supports it. */
export function useWakeLock() {
  useEffect(() => {
    if (!("wakeLock" in navigator)) return;
    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    const request = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const next = await navigator.wakeLock.request("screen");
        if (cancelled) void next.release();
        else sentinel = next;
      } catch {
        // Denied (battery saver, unsupported context): the app still works.
      }
    };

    // The lock is released when the tab is hidden; take it again on return.
    const onVisibility = () => void request();

    void request();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      void sentinel?.release();
    };
  }, []);
}
