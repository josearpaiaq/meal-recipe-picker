import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSafeStorage } from "@/shared/lib/storage";

export type PantryState = { keys: string[] };

type PantryStore = PantryState & {
  add(key: string): void;
  remove(key: string): void;
};

export const usePantryStore = create<PantryStore>()(
  persist(
    (set) => ({
      keys: [],
      add: (key) =>
        set((state) => (state.keys.includes(key) ? state : { keys: [...state.keys, key] })),
      remove: (key) => set((state) => ({ keys: state.keys.filter((k) => k !== key) })),
    }),
    {
      name: "mp.pantry.v1",
      version: 1,
      storage: createSafeStorage<PantryState>(),
      partialize: ({ keys }) => ({ keys }),
      migrate: (persisted) => persisted as PantryState,
    },
  ),
);
