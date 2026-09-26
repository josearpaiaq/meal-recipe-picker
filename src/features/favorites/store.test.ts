import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFavoritesStore } from "./store";

const store = () => useFavoritesStore.getState();

describe("favorites store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-24T12:00:00Z"));
    useFavoritesStore.setState({ favoriteIds: [], history: [] });
  });
  afterEach(() => vi.useRealTimers());

  it("toggles favorites", () => {
    store().toggleFavorite("a");
    store().toggleFavorite("b");
    store().toggleFavorite("a");
    expect(store().favoriteIds).toEqual(["b"]);
  });

  it("logs cooked entries and rates them", () => {
    const first = store().logCooked("a");
    vi.advanceTimersByTime(1000);
    store().logCooked("a");
    store().rate(first, 4);
    expect(store().history).toEqual([
      { recipeId: "a", cookedAt: first, rating: 4 },
      { recipeId: "a", cookedAt: first + 1000 },
    ]);
  });
});
