import { z } from "zod";

export const localizedSchema = z.object({
  en: z.string().min(1),
  es: z.string().min(1).optional(),
});

export const mealSchema = z.enum(["breakfast", "lunch", "dinner"]);
export const effortSchema = z.enum(["nocook", "easy", "medium"]);
export const aisleSchema = z.enum(["produce", "protein", "dairy", "pantry", "other"]);
export const tintSchema = z.enum([
  "oat",
  "berry",
  "paprika",
  "sage",
  "corn",
  "herb",
  "salmon",
  "olive",
  "turmeric",
]);

const kebab = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "must be kebab-case");

export const ingredientSchema = z.object({
  id: kebab,
  qty: z.string(),
  label: localizedSchema,
  shoppingKey: kebab,
  aisle: aisleSchema,
});

export const stepSchema = z.object({
  text: localizedSchema,
  uses: z.array(z.string()),
  timer: z
    .object({
      durationSec: z.number().int().positive(),
      label: localizedSchema,
    })
    .optional(),
});

export const recipeSchema = z
  .object({
    id: kebab,
    meals: z.array(mealSchema).min(1),
    timeMin: z.number().int().positive(),
    effort: effortSchema,
    servings: z.number().int().positive(),
    plate: z.object({
      veg: z.boolean(),
      protein: z.boolean(),
      grain: z.boolean(),
      fat: z.boolean(),
    }),
    tint: tintSchema,
    image: z.string().startsWith("/recipes/").optional(),
    /** Required for licenses like CC BY; shown on the recipe photo. */
    imageCredit: z.object({ author: z.string(), license: z.string(), url: z.url() }).optional(),
    name: localizedSchema,
    flavorNote: localizedSchema,
    ingredients: z.array(ingredientSchema).min(1),
    steps: z.array(stepSchema).min(1),
    source: z.object({ title: z.string(), url: z.url() }).optional(),
  })
  .superRefine((recipe, ctx) => {
    if (recipe.image && !recipe.imageCredit) {
      ctx.addIssue({ code: "custom", path: ["imageCredit"], message: "photos need a credit" });
    }
    const ids = new Set(recipe.ingredients.map((i) => i.id));
    if (ids.size !== recipe.ingredients.length) {
      ctx.addIssue({ code: "custom", message: "ingredient ids must be unique" });
    }
    recipe.steps.forEach((step, index) => {
      step.uses.forEach((id) => {
        if (!ids.has(id)) {
          ctx.addIssue({
            code: "custom",
            path: ["steps", index, "uses"],
            message: `unknown ingredient id "${id}"`,
          });
        }
      });
    });
  });
