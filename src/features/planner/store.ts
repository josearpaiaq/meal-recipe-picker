import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSafeStorage } from "@/shared/lib/storage";

/** Slot key is 'day-meal' (e.g. '0-breakfast'); checked holds shopping keys. */
export type WeekPlan = {
  weekStart: string;
  slots: Record<string, string | null>;
  checked: string[];
};

type PlannerState = { plans: Record<string, WeekPlan> };

type PlannerStore = PlannerState & {
  setSlot(weekStart: string, key: string, recipeId: string | null): void;
  setSlots(weekStart: string, slots: Record<string, string>): void;
  toggleChecked(weekStart: string, shoppingKey: string): void;
};

export function emptyWeek(weekStart: string): WeekPlan {
  return { weekStart, slots: {}, checked: [] };
}

function updateWeek(state: PlannerState, weekStart: string, update: (plan: WeekPlan) => WeekPlan) {
  const plan = state.plans[weekStart] ?? emptyWeek(weekStart);
  return { plans: { ...state.plans, [weekStart]: update(plan) } };
}

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set) => ({
      plans: {},
      setSlot: (weekStart, key, recipeId) =>
        set((state) =>
          updateWeek(state, weekStart, (plan) => ({
            ...plan,
            slots: { ...plan.slots, [key]: recipeId },
          })),
        ),
      setSlots: (weekStart, slots) =>
        set((state) =>
          updateWeek(state, weekStart, (plan) => ({ ...plan, slots: { ...plan.slots, ...slots } })),
        ),
      toggleChecked: (weekStart, shoppingKey) =>
        set((state) =>
          updateWeek(state, weekStart, (plan) => ({
            ...plan,
            checked: plan.checked.includes(shoppingKey)
              ? plan.checked.filter((k) => k !== shoppingKey)
              : [...plan.checked, shoppingKey],
          })),
        ),
    }),
    {
      name: "mp.planner.v1",
      version: 1,
      storage: createSafeStorage<PlannerState>(),
      partialize: ({ plans }) => ({ plans }),
      migrate: (persisted) => persisted as PlannerState,
    },
  ),
);
