import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSafeStorage } from "@/shared/lib/storage";
import type { Timers } from "./lib/timers";

export type CookSession = {
  recipeId: string;
  stepIndex: number;
  startedAt: number;
  /** Key = step index; one timer per step. A timer is only its end timestamp. */
  timers: Timers;
};

export type StartResult = "started" | "resumed" | "needs-confirm";

type CookingState = { session: CookSession | null };

type CookingStore = CookingState & {
  start(recipeId: string): StartResult;
  replace(recipeId: string): void;
  end(): void;
  goToStep(index: number): void;
  startTimer(step: number, durationSec: number): void;
  clearTimer(step: number): void;
};

function newSession(recipeId: string): CookSession {
  return { recipeId, stepIndex: 0, startedAt: Date.now(), timers: {} };
}

export const useCookingStore = create<CookingStore>()(
  persist(
    (set, get) => ({
      session: null,
      start: (recipeId) => {
        const { session } = get();
        if (!session) {
          set({ session: newSession(recipeId) });
          return "started";
        }
        return session.recipeId === recipeId ? "resumed" : "needs-confirm";
      },
      replace: (recipeId) => set({ session: newSession(recipeId) }),
      end: () => set({ session: null }),
      goToStep: (index) =>
        set(({ session }) => (session ? { session: { ...session, stepIndex: index } } : {})),
      startTimer: (step, durationSec) =>
        set(({ session }) =>
          session
            ? {
                session: {
                  ...session,
                  timers: {
                    ...session.timers,
                    [step]: { endsAt: Date.now() + durationSec * 1000 },
                  },
                },
              }
            : {},
        ),
      clearTimer: (step) =>
        set(({ session }) => {
          if (!session) return {};
          const timers = { ...session.timers };
          delete timers[step];
          return { session: { ...session, timers } };
        }),
    }),
    {
      name: "mp.cooking.v1",
      version: 1,
      storage: createSafeStorage<CookingState>(),
      partialize: ({ session }) => ({ session }),
      migrate: (persisted) => persisted as CookingState,
    },
  ),
);
