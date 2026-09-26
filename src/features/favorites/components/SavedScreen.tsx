"use client";

import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { RecipeHero, RecipeMeta, type Recipe } from "@/features/recipes";
import { Link } from "@/i18n/navigation";
import { useMounted } from "@/shared/hooks/useMounted";
import { localize } from "@/shared/lib/format";
import { LanguageSwitch, SegmentedControl } from "@/shared/ui";
import { useFavoritesStore } from "../store";
import { FavoriteButton } from "./FavoriteButton";
import { StarRating } from "./StarRating";

type Tab = "saved" | "history";

export function SavedScreen({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations("favorites");
  const [tab, setTab] = useState<Tab>("saved");
  const mounted = useMounted();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 pt-6 lg:px-8 lg:pt-8">
      <header className="flex items-start justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
        <LanguageSwitch />
      </header>
      <SegmentedControl
        label={t("title")}
        value={tab}
        onChange={setTab}
        options={[
          { value: "saved", label: t("tabSaved") },
          { value: "history", label: t("tabHistory") },
        ]}
      />
      {mounted &&
        (tab === "saved" ? <SavedList recipes={recipes} /> : <HistoryList recipes={recipes} />)}
    </div>
  );
}

function RecipeRow({ recipe, children }: { recipe: Recipe; children?: ReactNode }) {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-3">
      <RecipeHero recipe={recipe} sizes="64px" className="size-16 shrink-0 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link href={`/recipes/${recipe.id}`} className="font-semibold text-ink hover:underline">
          {localize(recipe.name, locale)}
        </Link>
        <RecipeMeta recipe={recipe} />
      </div>
      {children}
    </div>
  );
}

function SavedList({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations("favorites");
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const saved = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  if (saved.length === 0) return <p className="py-8 text-center text-muted">{t("emptySaved")}</p>;
  return (
    <ul className="flex flex-col gap-2.5">
      {saved.map((recipe) => (
        <li key={recipe.id} className="rounded-button bg-surface p-3">
          <RecipeRow recipe={recipe}>
            <FavoriteButton recipeId={recipe.id} />
          </RecipeRow>
        </li>
      ))}
    </ul>
  );
}

function HistoryList({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations("favorites");
  const format = useFormatter();
  const history = useFavoritesStore((state) => state.history);
  const rate = useFavoritesStore((state) => state.rate);
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const entries = [...history].sort((a, b) => b.cookedAt - a.cookedAt);

  if (entries.length === 0)
    return <p className="py-8 text-center text-muted">{t("emptyHistory")}</p>;
  return (
    <ul className="flex flex-col gap-2.5">
      {entries.map((entry) => {
        const recipe = byId.get(entry.recipeId);
        if (!recipe) return null;
        return (
          <li key={entry.cookedAt} className="flex flex-col gap-2 rounded-button bg-surface p-3">
            <RecipeRow recipe={recipe} />
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <span className="text-sm text-muted">
                {t("cookedOn", { date: format.dateTime(entry.cookedAt, { dateStyle: "medium" }) })}
                {entry.rating === undefined && ` · ${t("notRated")}`}
              </span>
              <StarRating
                value={entry.rating}
                onChange={(rating) => rate(entry.cookedAt, rating)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
