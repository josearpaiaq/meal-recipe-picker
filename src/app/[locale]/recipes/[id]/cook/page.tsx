import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CookingMode } from "@/features/cooking";
import { getAllRecipes, getRecipe } from "@/features/recipes";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllRecipes().map((recipe) => ({ locale, id: recipe.id })),
  );
}

export default async function CookPage({ params }: PageProps<"/[locale]/recipes/[id]/cook">) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);
  const recipe = getRecipe(id);
  if (!recipe) notFound();
  return <CookingMode recipe={recipe} />;
}
