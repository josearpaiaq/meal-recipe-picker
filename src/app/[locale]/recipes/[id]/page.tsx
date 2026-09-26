import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CookButton } from "@/features/cooking";
import { CookedItButton, FavoriteButton } from "@/features/favorites";
import { AddToWeekButton } from "@/features/planner";
import { getAllRecipes, getRecipe, RecipeDetail } from "@/features/recipes";
import { routing, type Locale } from "@/i18n/routing";
import { localize } from "@/shared/lib/format";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllRecipes().map((recipe) => ({ locale, id: recipe.id })),
  );
}

export default async function RecipePage({ params }: PageProps<"/[locale]/recipes/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);
  const recipe = getRecipe(id);
  if (!recipe) notFound();

  return (
    <RecipeDetail
      recipe={recipe}
      favorite={<FavoriteButton recipeId={recipe.id} />}
      primaryAction={<CookButton recipeId={recipe.id} />}
      footerActions={
        <>
          <AddToWeekButton recipeId={recipe.id} meals={recipe.meals} />
          <CookedItButton
            recipeId={recipe.id}
            recipeName={localize(recipe.name, locale as Locale)}
          />
        </>
      }
    />
  );
}
