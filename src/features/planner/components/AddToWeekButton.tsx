"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import type { Meal } from "@/features/recipes";
import { Button, Dialog, SegmentedControl } from "@/shared/ui";
import { DAYS, dateOf, slotKey, weekStartOf, type Day } from "../lib/week";
import { usePlannerStore } from "../store";

type Props = { recipeId: string; meals: Meal[] };

export function AddToWeekButton({ recipeId, meals }: Props) {
  const t = useTranslations("planner");
  const tc = useTranslations("common");
  const format = useFormatter();
  const setSlot = usePlannerStore((state) => state.setSlot);
  const [weekStart, setWeekStart] = useState<string | null>(null);
  const [day, setDay] = useState<Day>(0);
  const [meal, setMeal] = useState<Meal>(meals[0]);

  const openDialog = () => {
    const now = new Date();
    setWeekStart(weekStartOf(now));
    setDay(((now.getDay() + 6) % 7) as Day);
  };

  return (
    <>
      <Button variant="secondary" className="flex-1" onClick={openDialog}>
        {t("addToWeek")}
      </Button>
      <Dialog
        open={weekStart !== null}
        onClose={() => setWeekStart(null)}
        title={t("addToWeekTitle")}
      >
        {weekStart && (
          <div className="flex flex-col gap-4">
            <SegmentedControl
              variant="pills"
              label={t("day")}
              value={String(day)}
              onChange={(value) => setDay(Number(value) as Day)}
              options={DAYS.map((d) => ({
                value: String(d),
                label: format.dateTime(dateOf(weekStart, d), { weekday: "short" }),
              }))}
            />
            <SegmentedControl
              label={t("meal")}
              value={meal}
              onChange={setMeal}
              options={meals.map((m) => ({ value: m, label: tc(`meals.${m}`) }))}
            />
            <Button
              onClick={() => {
                setSlot(weekStart, slotKey({ day, meal }), recipeId);
                setWeekStart(null);
              }}
            >
              {t("save")}
            </Button>
          </div>
        )}
      </Dialog>
    </>
  );
}
