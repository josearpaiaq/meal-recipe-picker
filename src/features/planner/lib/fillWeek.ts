import { suggest, type SuggestInput } from "@/features/picker";
import { MEALS, type Recipe } from "@/features/recipes";
import { DAYS, slotKey } from "./week";

export const MAX_REPEATS_PER_WEEK = 2;

/**
 * Picks a recipe for every empty slot using suggest(), never letting a recipe
 * appear more than twice in the week. Returns only the newly filled slots.
 */
export function fillEmptySlots(
  slots: Record<string, string | null>,
  recipes: Recipe[],
  input: Omit<SuggestInput, "meal" | "maxTime">,
): Record<string, string> {
  const counts = new Map<string, number>();
  for (const id of Object.values(slots)) if (id) counts.set(id, (counts.get(id) ?? 0) + 1);

  const filled: Record<string, string> = {};
  for (const day of DAYS) {
    for (const meal of MEALS) {
      const key = slotKey({ day, meal });
      if (slots[key]) continue;
      const pick = suggest(recipes, { ...input, meal, maxTime: null }).find(
        (recipe) => (counts.get(recipe.id) ?? 0) < MAX_REPEATS_PER_WEEK,
      );
      if (!pick) continue;
      filled[key] = pick.id;
      counts.set(pick.id, (counts.get(pick.id) ?? 0) + 1);
    }
  }
  return filled;
}
