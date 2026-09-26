import { describe, expect, it } from "vitest";
import type { Recipe } from "@/features/recipes";
import { buildShoppingList, mergeQuantities } from "./shoppingList";

const recipe = (
  id: string,
  ingredients: Array<[string, string, Recipe["ingredients"][0]["aisle"]]>,
): Recipe => ({
  id,
  meals: ["dinner"],
  timeMin: 10,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "oat",
  name: { en: id },
  flavorNote: { en: id },
  ingredients: ingredients.map(([key, qty, aisle]) => ({
    id: key,
    qty,
    label: { en: key },
    shoppingKey: key,
    aisle,
  })),
  steps: [{ text: { en: "cook" }, uses: [] }],
});

const recipes = [
  recipe("salmon", [
    ["salmon-fillet", "2", "protein"],
    ["limes", "1/2", "produce"],
    ["rice", "3/4 cup", "pantry"],
  ]),
  recipe("tacos", [
    ["limes", "2", "produce"],
    ["avocado", "1", "produce"],
    ["feta", "1/4 cup", "dairy"],
  ]),
];

describe("buildShoppingList", () => {
  it("returns nothing for an empty plan", () => {
    expect(buildShoppingList({ slots: { "0-dinner": null } }, recipes)).toEqual([]);
  });

  it("merges duplicates by shopping key, keeping each quantity", () => {
    const groups = buildShoppingList(
      { slots: { "0-dinner": "salmon", "1-dinner": "tacos", "2-dinner": "salmon" } },
      recipes,
    );
    const produce = groups.find((g) => g.aisle === "produce")!;
    expect(produce.items.find((i) => i.key === "limes")?.quantities).toEqual(["3"]);
    expect(groups.find((g) => g.aisle === "protein")!.items).toHaveLength(1);
  });

  it("groups by aisle in store order and skips empty aisles", () => {
    const groups = buildShoppingList(
      { slots: { "0-dinner": "salmon", "1-lunch": "tacos" } },
      recipes,
    );
    expect(groups.map((g) => g.aisle)).toEqual(["produce", "protein", "dairy", "pantry"]);
    expect(groups[0].items.map((i) => i.key).sort()).toEqual(["avocado", "limes"]);
  });

  it("ignores unknown recipe ids", () => {
    expect(buildShoppingList({ slots: { "0-dinner": "gone" } }, recipes)).toEqual([]);
  });
});

describe("mergeQuantities", () => {
  it("sums amounts that share a unit and keeps the rest", () => {
    expect(
      mergeQuantities(["1/2", "2", "1 cup", "1/2 cup", "1 1/2 cup", "1 small", "1 small"]),
    ).toEqual(["2 1/2", "3 cup", "2 small"]);
    expect(mergeQuantities(["1 can (15 oz / 425 g)", "1 can (15 oz / 425 g)"])).toEqual([
      "2 can (15 oz / 425 g)",
    ]);
    expect(mergeQuantities(["a pinch"])).toEqual(["a pinch"]);
    expect(mergeQuantities(["1 handful", "2 handfuls"])).toEqual(["3 handfuls"]);
  });
});
