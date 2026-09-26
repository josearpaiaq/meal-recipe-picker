import { setRequestLocale } from "next-intl/server";
import { PickerScreen } from "@/features/picker";
import { getAllRecipes } from "@/features/recipes";
import type { Locale } from "@/i18n/routing";

export default async function PickerPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <PickerScreen recipes={getAllRecipes()} />;
}
