import { describe, expect, it } from "vitest";
import type { Recipe } from "@/features/recipes";
import { mealForHour, RECENT_COOK_MS, seededRandom, suggest, type SuggestInput } from "./suggest";

type R = Pick<Recipe, "id" | "meals" | "timeMin" | "ingredients">;

const recipe = (
  id: string,
  timeMin: number,
  meals: R["meals"] = ["dinner"],
  keys: string[] = [],
): R => ({
  id,
  meals,
  timeMin,
  ingredients: keys.map((shoppingKey) => ({
    id: shoppingKey,
    qty: "1",
    label: { en: shoppingKey },
    shoppingKey,
    aisle: "pantry",
  })),
});

const NOW = 1_800_000_000_000;
const base: SuggestInput = {
  meal: "dinner",
  maxTime: null,
  favoriteIds: [],
  history: [],
  pantryKeys: [],
  now: NOW,
  random: seededRandom(1),
};
const ids = (list: R[]) => list.map((r) => r.id);

describe("suggest", () => {
  const recipes = [recipe("a", 10), recipe("b", 20), recipe("c", 40), recipe("d", 10, ["lunch"])];

  it("filters by meal and max time", () => {
    expect(ids(suggest(recipes, base)).sort()).toEqual(["a", "b", "c"]);
    expect(ids(suggest(recipes, { ...base, maxTime: 15 }))).toEqual(["a"]);
    expect(ids(suggest(recipes, { ...base, meal: "lunch" }))).toEqual(["d"]);
  });

  it("drops recipes cooked in the last 3 days", () => {
    const history = [
      { recipeId: "a", cookedAt: NOW - RECENT_COOK_MS + 1000 },
      { recipeId: "b", cookedAt: NOW - RECENT_COOK_MS - 1000 },
    ];
    expect(ids(suggest(recipes, { ...base, history })).sort()).toEqual(["b", "c"]);
  });

  it("ranks favorites first, then higher average rating", () => {
    const old = NOW - 10 * RECENT_COOK_MS;
    const result = suggest(recipes, {
      ...base,
      favoriteIds: ["c"],
      history: [
        { recipeId: "b", cookedAt: old, rating: 5 },
        { recipeId: "b", cookedAt: old + 1, rating: 3 },
        { recipeId: "a", cookedAt: old + 2, rating: 2 },
      ],
    });
    expect(ids(result)).toEqual(["c", "b", "a"]);
  });

  it("ranks recipes using more pantry items higher", () => {
    const list = [
      recipe("x", 10, ["dinner"], ["eggs"]),
      recipe("y", 10, ["dinner"], ["eggs", "rice"]),
    ];
    expect(ids(suggest(list, { ...base, pantryKeys: ["eggs", "rice"] }))).toEqual(["y", "x"]);
  });

  it("breaks ties with the injected random source", () => {
    const list = [recipe("a", 10), recipe("b", 10), recipe("c", 10)];
    const descending = () => {
      let n = 1;
      return () => (n -= 0.1);
    };
    expect(ids(suggest(list, { ...base, random: descending() }))).toEqual(["c", "b", "a"]);
    expect(ids(suggest(list, { ...base, random: seededRandom(7) }))).toEqual(
      ids(suggest(list, { ...base, random: seededRandom(7) })),
    );
  });
});

describe("mealForHour", () => {
  it("follows local time", () => {
    expect(mealForHour(7)).toBe("breakfast");
    expect(mealForHour(10)).toBe("breakfast");
    expect(mealForHour(11)).toBe("lunch");
    expect(mealForHour(15)).toBe("lunch");
    expect(mealForHour(16)).toBe("dinner");
  });
});
