import type { Meal, Recipe } from "@/features/recipes";

export const RECENT_COOK_MS = 3 * 24 * 60 * 60 * 1000;

type SuggestRecipe = Pick<Recipe, "id" | "meals" | "timeMin" | "ingredients">;

export type SuggestInput = {
  meal: Meal;
  /** Max total minutes, or null for any. */
  maxTime: number | null;
  favoriteIds: string[];
  history: { recipeId: string; cookedAt: number; rating?: number }[];
  pantryKeys: string[];
  now: number;
  /** Returns a number in [0, 1). Injected so ties are reproducible. */
  random: () => number;
};

function averageRatings(history: SuggestInput["history"]): Map<string, number> {
  const sums = new Map<string, { total: number; count: number }>();
  for (const { recipeId, rating } of history) {
    if (rating === undefined) continue;
    const sum = sums.get(recipeId) ?? { total: 0, count: 0 };
    sums.set(recipeId, { total: sum.total + rating, count: sum.count + 1 });
  }
  return new Map([...sums].map(([id, { total, count }]) => [id, total / count]));
}

/**
 * Candidate order for the picker: filter by meal and time, drop anything cooked
 * in the last 3 days, then favorites first, higher-rated next, more pantry
 * matches next, and random order for ties.
 */
export function suggest<R extends SuggestRecipe>(recipes: R[], input: SuggestInput): R[] {
  const recent = new Set(
    input.history.filter((h) => input.now - h.cookedAt < RECENT_COOK_MS).map((h) => h.recipeId),
  );
  const ratings = averageRatings(input.history);
  const favorites = new Set(input.favoriteIds);
  const pantry = new Set(input.pantryKeys);

  return recipes
    .filter(
      (r) =>
        r.meals.includes(input.meal) &&
        (input.maxTime === null || r.timeMin <= input.maxTime) &&
        !recent.has(r.id),
    )
    .map((recipe) => ({
      recipe,
      favorite: favorites.has(recipe.id) ? 1 : 0,
      rating: ratings.get(recipe.id) ?? 0,
      pantry: new Set(recipe.ingredients.map((i) => i.shoppingKey).filter((k) => pantry.has(k)))
        .size,
      tie: input.random(),
    }))
    .sort(
      (a, b) =>
        b.favorite - a.favorite || b.rating - a.rating || b.pantry - a.pantry || a.tie - b.tie,
    )
    .map(({ recipe }) => recipe);
}

export function mealForHour(hour: number): Meal {
  if (hour < 11) return "breakfast";
  if (hour < 16) return "lunch";
  return "dinner";
}

/** Small seeded PRNG (mulberry32) so a shuffle stays stable across renders. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
