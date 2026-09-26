"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FavoriteButton, useFavoritesStore } from "@/features/favorites";
import { usePantryStore } from "@/features/pantry";
import {
  MEALS,
  PlateChips,
  RecipeHero,
  RecipeMeta,
  WhyItTastesGood,
  type Meal,
  type Recipe,
} from "@/features/recipes";
import { Link } from "@/i18n/navigation";
import { useMounted } from "@/shared/hooks/useMounted";
import { localize } from "@/shared/lib/format";
import { Button, buttonClasses, Icon, LanguageSwitch, SegmentedControl } from "@/shared/ui";
import { mealForHour, seededRandom, suggest } from "../lib/suggest";

type TimeFilter = "any" | "15" | "30";

export function PickerScreen({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations();
  const mounted = useMounted();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
      {/* Default meal and ranking depend on local time and saved data, so they render after mount. */}
      {mounted ? (
        <Picker recipes={recipes} />
      ) : (
        <p className="py-16 text-center text-muted">{t("common.loading")}</p>
      )}
    </div>
  );
}

function Picker({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [meal, setMeal] = useState<Meal>(() => mealForHour(new Date().getHours()));
  const [time, setTime] = useState<TimeFilter>("any");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [seed] = useState(() => Math.floor(Math.random() * 2 ** 32));
  const [openedAt] = useState(() => Date.now());
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const history = useFavoritesStore((state) => state.history);
  const pantryKeys = usePantryStore((state) => state.keys);

  const candidates = useMemo(
    () =>
      suggest(recipes, {
        meal,
        maxTime: time === "any" ? null : Number(time),
        favoriteIds,
        history,
        pantryKeys,
        now: openedAt,
        random: seededRandom(seed),
      }),
    [recipes, meal, time, favoriteIds, history, pantryKeys, openedAt, seed],
  );

  // Track the shown recipe by id so re-ranking (e.g. after a heart tap) keeps it on screen.
  const found = candidates.findIndex((recipe) => recipe.id === currentId);
  const index = found === -1 ? 0 : found;
  const recipe = candidates[index];

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium tracking-wider text-muted uppercase">
            {t("common.kicker")}
          </p>
          <h1 className="font-display text-3xl leading-tight font-semibold">
            {t(`picker.titles.${meal}`)}
          </h1>
        </div>
        <LanguageSwitch />
      </header>

      <SegmentedControl
        label={t("picker.mealLabel")}
        value={meal}
        onChange={(next) => {
          setMeal(next);
          setCurrentId(null);
        }}
        options={MEALS.map((m) => ({ value: m, label: t(`common.meals.${m}`) }))}
      />

      <div className="flex items-center gap-2">
        <Icon name="clock" className="size-4.5 text-muted" />
        <SegmentedControl
          variant="pills"
          label={t("picker.timeLabel")}
          value={time}
          onChange={(next) => {
            setTime(next);
            setCurrentId(null);
          }}
          options={[
            { value: "any", label: t("picker.anyTime") },
            { value: "15", label: t("common.minutes", { count: 15 }) },
            { value: "30", label: t("common.minutes", { count: 30 }) },
          ]}
        />
      </div>

      {recipe ? (
        <>
          <article className="flex flex-col overflow-hidden rounded-card bg-surface shadow-sm">
            <RecipeHero
              recipe={recipe}
              sizes="(min-width: 768px) 640px, 100vw"
              className="flex h-48 items-end justify-end p-3.5 lg:h-72"
            >
              <span className="relative rounded-full bg-surface/80 px-2.5 py-1 text-xs font-semibold">
                {t("picker.position", { current: index + 1, total: candidates.length })}
              </span>
            </RecipeHero>
            <div className="flex flex-col gap-3 px-4.5 pt-4 pb-4.5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-2xl leading-tight font-semibold">
                  {localize(recipe.name, locale)}
                </h2>
                <FavoriteButton recipeId={recipe.id} />
              </div>
              <RecipeMeta recipe={recipe} />
              <PlateChips plate={recipe.plate} />
              <WhyItTastesGood text={localize(recipe.flavorNote, locale)} />
            </div>
          </article>

          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setCurrentId(candidates[(index + 1) % candidates.length].id)}
            >
              <Icon name="refresh" className="size-4.5" />
              {t("picker.somethingElse")}
            </Button>
            <Link
              href={`/recipes/${recipe.id}`}
              className={buttonClasses("primary", "md", "flex-1")}
            >
              {t("picker.cookThis")}
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-card bg-surface px-6 py-8 text-center">
          <p className="font-display text-xl font-semibold">{t("picker.emptyTitle")}</p>
          <p className="text-sm leading-relaxed text-muted">{t("picker.emptyBody")}</p>
        </div>
      )}
    </>
  );
}
