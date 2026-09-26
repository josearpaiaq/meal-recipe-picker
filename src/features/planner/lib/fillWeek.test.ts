import { describe, expect, it } from "vitest";
import { getAllRecipes } from "@/features/recipes";
import { seededRandom } from "@/features/picker";
import { fillEmptySlots, MAX_REPEATS_PER_WEEK } from "./fillWeek";

const input = { favoriteIds: [], history: [], pantryKeys: [], now: 0, random: seededRandom(3) };

describe("fillEmptySlots", () => {
  it("fills every empty slot without repeating a recipe more than twice", () => {
    const filled = fillEmptySlots({}, getAllRecipes(), input);
    const counts = new Map<string, number>();
    for (const id of Object.values(filled)) counts.set(id, (counts.get(id) ?? 0) + 1);
    for (const count of counts.values()) expect(count).toBeLessThanOrEqual(MAX_REPEATS_PER_WEEK);
    for (const [key, id] of Object.entries(filled)) {
      const meal = key.split("-")[1];
      expect(getAllRecipes().find((r) => r.id === id)!.meals).toContain(meal);
    }
  });

  it("keeps filled slots and counts them toward the limit", () => {
    const slots = { "0-dinner": "miso-salmon", "1-dinner": "miso-salmon" };
    const filled = fillEmptySlots(slots, getAllRecipes(), {
      ...input,
      favoriteIds: ["miso-salmon"],
    });
    expect(filled["0-dinner"]).toBeUndefined();
    expect(Object.values(filled)).not.toContain("miso-salmon");
  });

  it("leaves a slot empty when no recipe is left", () => {
    const [only] = getAllRecipes().filter((r) => r.id === "miso-salmon");
    const filled = fillEmptySlots({}, [only], input);
    expect(Object.keys(filled)).toEqual(["0-dinner", "1-dinner"]);
  });
});
