import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getAllRecipes, getRecipe, getRecipesByMeal } from "./repository";
import { recipeSchema } from "./schema";
import { MEALS } from "./types";

const recipes = getAllRecipes();

describe("recipe data", () => {
  it("has 10 to 15 recipes with unique ids", () => {
    expect(recipes.length).toBeGreaterThanOrEqual(10);
    expect(recipes.length).toBeLessThanOrEqual(15);
    expect(new Set(recipes.map((r) => r.id)).size).toBe(recipes.length);
  });

  it.each(recipes.map((r) => [r.id, r] as const))("%s matches the schema", (_, recipe) => {
    const result = recipeSchema.safeParse(recipe);
    expect(result.error?.issues ?? []).toEqual([]);
  });

  it.each(recipes.map((r) => [r.id, r] as const))(
    "%s: step `uses` reference real ingredient ids",
    (_, recipe) => {
      const ids = new Set(recipe.ingredients.map((i) => i.id));
      for (const step of recipe.steps) for (const id of step.uses) expect(ids).toContain(id);
    },
  );

  it.each(recipes.map((r) => [r.id, r] as const))("%s has Spanish text everywhere", (_, recipe) => {
    const fields = [
      recipe.name,
      recipe.flavorNote,
      ...recipe.ingredients.map((i) => i.label),
      ...recipe.steps.flatMap((s) => [s.text, ...(s.timer ? [s.timer.label] : [])]),
    ];
    for (const field of fields) expect(field.es).toBeTruthy();
  });

  it("has at least 3 recipes per meal", () => {
    for (const meal of MEALS) expect(getRecipesByMeal(meal).length).toBeGreaterThanOrEqual(3);
  });

  it("rejects a step that uses an unknown ingredient", () => {
    const bad = { ...recipes[0], steps: [{ text: { en: "x" }, uses: ["nope"] }] };
    expect(recipeSchema.safeParse(bad).success).toBe(false);
  });
});

describe("repository", () => {
  it("finds recipes by id and meal", () => {
    expect(getRecipe("miso-salmon")?.meals).toContain("dinner");
    expect(getRecipe("missing")).toBeUndefined();
    expect(getRecipesByMeal("breakfast").every((r) => r.meals.includes("breakfast"))).toBe(true);
  });
});

describe("recipe photos", () => {
  it.each(recipes.filter((r) => r.image).map((r) => [r.id, r] as const))(
    "%s: photo file exists and has a credit",
    (_, recipe) => {
      expect(existsSync(join(process.cwd(), "public", recipe.image!))).toBe(true);
      expect(recipe.imageCredit?.author).toBeTruthy();
    },
  );
});
