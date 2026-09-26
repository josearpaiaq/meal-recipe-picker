import { setRequestLocale } from "next-intl/server";
import { SavedScreen } from "@/features/favorites";
import { getAllRecipes } from "@/features/recipes";
import type { Locale } from "@/i18n/routing";

export default async function SavedPage({ params }: PageProps<"/[locale]/saved">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <SavedScreen recipes={getAllRecipes()} />;
}
