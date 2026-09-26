import type { z } from "zod";
import type {
  aisleSchema,
  effortSchema,
  ingredientSchema,
  mealSchema,
  recipeSchema,
  stepSchema,
  tintSchema,
} from "./schema";

export type Meal = z.infer<typeof mealSchema>;
export type Effort = z.infer<typeof effortSchema>;
export type Aisle = z.infer<typeof aisleSchema>;
export type Tint = z.infer<typeof tintSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Step = z.infer<typeof stepSchema>;
export type Recipe = z.infer<typeof recipeSchema>;

export const MEALS: Meal[] = ["breakfast", "lunch", "dinner"];
export const AISLES: Aisle[] = ["produce", "protein", "dairy", "pantry", "other"];
