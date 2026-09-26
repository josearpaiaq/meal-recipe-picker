import { setRequestLocale } from "next-intl/server";
import { PantryScreen } from "@/features/pantry";
import { getAllRecipes } from "@/features/recipes";
import type { Locale } from "@/i18n/routing";

export default async function PantryPage({ params }: PageProps<"/[locale]/pantry">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <PantryScreen recipes={getAllRecipes()} />;
}
