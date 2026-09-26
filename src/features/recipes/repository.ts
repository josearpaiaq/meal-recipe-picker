import { recipes } from "./data";
import type { Meal, Recipe } from "./types";

// The only access path to recipe data. Synchronous for now; call sites are
// kept few so this can become async (API or database) without touching features.

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function getRecipesByMeal(meal: Meal): Recipe[] {
  return recipes.filter((recipe) => recipe.meals.includes(meal));
}
