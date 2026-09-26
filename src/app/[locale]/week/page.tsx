import { setRequestLocale } from "next-intl/server";
import { WeekPlanner } from "@/features/planner";
import { getAllRecipes } from "@/features/recipes";
import type { Locale } from "@/i18n/routing";

export default async function WeekPage({ params }: PageProps<"/[locale]/week">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <WeekPlanner recipes={getAllRecipes()} />;
}
