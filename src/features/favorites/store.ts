import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSafeStorage } from "@/shared/lib/storage";

export type Rating = 1 | 2 | 3 | 4 | 5;
export type HistoryEntry = { recipeId: string; cookedAt: number; rating?: Rating };
export type FavoritesState = { favoriteIds: string[]; history: HistoryEntry[] };

type FavoritesStore = FavoritesState & {
  toggleFavorite(recipeId: string): void;
  /** Logs a cooked entry and returns its `cookedAt`, which identifies it. */
  logCooked(recipeId: string): number;
  rate(cookedAt: number, rating: Rating | undefined): void;
};

const initialState: FavoritesState = { favoriteIds: [], history: [] };

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      ...initialState,
      toggleFavorite: (recipeId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(recipeId)
            ? state.favoriteIds.filter((id) => id !== recipeId)
            : [...state.favoriteIds, recipeId],
        })),
      logCooked: (recipeId) => {
        const cookedAt = Date.now();
        set((state) => ({ history: [...state.history, { recipeId, cookedAt }] }));
        return cookedAt;
      },
      rate: (cookedAt, rating) =>
        set((state) => ({
          history: state.history.map((entry) =>
            entry.cookedAt === cookedAt ? { ...entry, rating } : entry,
          ),
        })),
    }),
    {
      name: "mp.favorites.v1",
      version: 1,
      storage: createSafeStorage<FavoritesState>(),
      partialize: ({ favoriteIds, history }) => ({ favoriteIds, history }),
      migrate: (persisted) => persisted as FavoritesState,
    },
  ),
);
