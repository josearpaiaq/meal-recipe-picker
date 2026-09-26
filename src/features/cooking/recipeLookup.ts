import { getRecipe, type Recipe } from "@/features/recipes";

/** Single place where cooking's client code looks recipes up by id. */
export function lookupRecipe(id: string | undefined): Recipe | undefined {
  return id ? getRecipe(id) : undefined;
}
