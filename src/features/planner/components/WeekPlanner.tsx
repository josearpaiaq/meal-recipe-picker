"use client";

import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useFavoritesStore } from "@/features/favorites";
import { usePantryStore } from "@/features/pantry";
import { MEALS, RecipeHero, type Meal, type Recipe } from "@/features/recipes";
import { useMounted } from "@/shared/hooks/useMounted";
import { cn } from "@/shared/lib/cn";
import { localize } from "@/shared/lib/format";
import { Button, Icon, LanguageSwitch, SegmentedControl } from "@/shared/ui";
import { fillEmptySlots } from "../lib/fillWeek";
import { buildShoppingList } from "../lib/shoppingList";
import { DAYS, dateOf, slotKey, weekStartOf, type Day } from "../lib/week";
import { emptyWeek, usePlannerStore } from "../store";
import { ShoppingList } from "./ShoppingList";
import { SlotDialog } from "./SlotDialog";

export function WeekPlanner({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations();
  const mounted = useMounted();
  if (!mounted) return <p className="py-16 text-center text-muted">{t("common.loading")}</p>;
  // The current week depends on the local date, so it's computed after mount.
  return <Planner recipes={recipes} weekStart={weekStartOf(new Date())} />;
}

type OpenSlot = { day: Day; meal: Meal } | null;

function Planner({ recipes, weekStart }: { recipes: Recipe[]; weekStart: string }) {
  const t = useTranslations("planner");
  const tc = useTranslations("common");
  const format = useFormatter();
  const locale = useLocale();
  const stored = usePlannerStore((state) => state.plans[weekStart]);
  const setSlot = usePlannerStore((state) => state.setSlot);
  const setSlots = usePlannerStore((state) => state.setSlots);
  const toggleChecked = usePlannerStore((state) => state.toggleChecked);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const history = useFavoritesStore((state) => state.history);
  const pantryKeys = usePantryStore((state) => state.keys);
  const [tab, setTab] = useState<"plan" | "list">("plan");
  const [openSlot, setOpenSlot] = useState<OpenSlot>(null);

  const plan = stored ?? emptyWeek(weekStart);
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const recipeAt = (day: Day, meal: Meal) => {
    const id = plan.slots[slotKey({ day, meal })];
    return id ? byId.get(id) : undefined;
  };
  const dayName = (day: Day, weekday: "short" | "long" = "short") =>
    format.dateTime(dateOf(weekStart, day), { weekday });
  const groups = buildShoppingList(plan, recipes);

  const fill = () =>
    setSlots(
      weekStart,
      fillEmptySlots(plan.slots, recipes, {
        favoriteIds,
        history,
        pantryKeys,
        now: Date.now(),
        random: Math.random,
      }),
    );

  const slotButton = (day: Day, meal: Meal, className?: string) => {
    const recipe = recipeAt(day, meal);
    const labels = { day: dayName(day, "long"), meal: tc(`meals.${meal}`) };
    return recipe ? (
      <button
        type="button"
        onClick={() => setOpenSlot({ day, meal })}
        aria-label={t("slotLabel", { ...labels, recipe: localize(recipe.name, locale) })}
        className={cn(
          "flex min-h-touch flex-col gap-2 rounded-xl bg-surface p-2.5 text-left shadow-sm",
          className,
        )}
      >
        <RecipeHero
          recipe={recipe}
          sizes="(min-width: 1024px) 140px, 120px"
          className="h-8 w-full shrink-0 rounded-lg lg:h-11"
        />
        <span className="line-clamp-3 text-sm leading-snug font-semibold">
          {localize(recipe.name, locale)}
        </span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpenSlot({ day, meal })}
        aria-label={t("addTo", labels)}
        className={cn(
          "flex min-h-touch items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line-strong text-sm font-medium text-muted hover:bg-sunken",
          className,
        )}
      >
        <Icon name="plus" className="size-4" />
        {t("add")}
      </button>
    );
  };

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-5 px-5 pt-6 pb-6 lg:px-7 lg:pt-7">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium tracking-wider text-muted uppercase">
              {t("weekOf", {
                date: format.dateTime(dateOf(weekStart, 0), { month: "long", day: "numeric" }),
              })}
            </p>
            <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <Button size="sm" onClick={fill}>
              {t("fill")}
            </Button>
          </div>
        </header>

        <SegmentedControl
          className="lg:hidden"
          label={t("title")}
          value={tab}
          onChange={setTab}
          options={[
            { value: "plan", label: t("planTab") },
            { value: "list", label: t("listTab") },
          ]}
        />

        {/* Phone: one row per day. */}
        <div className={cn("flex flex-col gap-4 lg:hidden", tab !== "plan" && "hidden")}>
          {DAYS.map((day) => (
            <section key={day} className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-muted">{dayName(day, "long")}</h2>
              <div className="grid grid-cols-3 gap-2">
                {MEALS.map((meal) => (
                  <div key={meal} className="flex flex-col gap-1">
                    <span className="text-xs text-muted">{tc(`meals.${meal}`)}</span>
                    {slotButton(day, meal, "min-h-24")}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Desktop: meals × days grid. */}
        <div className="hidden grid-cols-[4.75rem_repeat(7,minmax(0,1fr))] grid-rows-[auto] auto-rows-[minmax(7rem,auto)] content-start gap-2 lg:grid">
          <div />
          {DAYS.map((day) => (
            <div key={day} className="px-0.5 py-1 text-sm font-semibold text-muted">
              {dayName(day)}
            </div>
          ))}
          {MEALS.map((meal) => (
            <div key={meal} className="contents">
              <div className="pt-3 text-sm font-semibold text-muted">{tc(`meals.${meal}`)}</div>
              {DAYS.map((day) => (
                <div key={day} className="flex">
                  {slotButton(day, meal, "flex-1")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={cn("lg:hidden", tab !== "list" && "hidden")}>
          <ShoppingList
            groups={groups}
            checked={plan.checked}
            onToggle={(key) => toggleChecked(weekStart, key)}
          />
        </div>
      </div>

      <aside className="hidden w-shopping shrink-0 flex-col gap-4.5 border-l border-line bg-surface px-5 py-7 lg:flex">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold">{t("shoppingList")}</h2>
          <span className="text-sm text-muted">{t("auto")}</span>
        </div>
        <ShoppingList
          groups={groups}
          checked={plan.checked}
          onToggle={(key) => toggleChecked(weekStart, key)}
        />
      </aside>

      {openSlot && (
        <SlotDialog
          open
          title={t("chooseTitle", {
            day: dayName(openSlot.day, "long"),
            meal: tc(`meals.${openSlot.meal}`),
          })}
          meal={openSlot.meal}
          current={recipeAt(openSlot.day, openSlot.meal)}
          recipes={recipes}
          onChoose={(recipeId) => setSlot(weekStart, slotKey(openSlot), recipeId)}
          onClose={() => setOpenSlot(null)}
        />
      )}
    </div>
  );
}
