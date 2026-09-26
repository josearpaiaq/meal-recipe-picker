"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { RecipeHero, RecipeMeta, type Meal, type Recipe } from "@/features/recipes";
import { Link } from "@/i18n/navigation";
import { localize } from "@/shared/lib/format";
import { Button, buttonClasses, Dialog } from "@/shared/ui";

type Props = {
  open: boolean;
  title: string;
  meal: Meal;
  current: Recipe | undefined;
  recipes: Recipe[];
  onChoose: (recipeId: string | null) => void;
  onClose: () => void;
};

/** Empty slot: recipe chooser for that meal. Filled slot: open, replace or clear. */
export function SlotDialog({ open, title, meal, current, recipes, onChoose, onClose }: Props) {
  const t = useTranslations("planner");
  const locale = useLocale();
  const [choosing, setChoosing] = useState(false);
  const close = () => {
    setChoosing(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} title={title}>
      {current && !choosing ? (
        <div className="flex flex-col gap-2.5">
          <p className="text-base font-semibold">{localize(current.name, locale)}</p>
          <Link href={`/recipes/${current.id}`} className={buttonClasses("primary")}>
            {t("open")}
          </Link>
          <Button variant="secondary" onClick={() => setChoosing(true)}>
            {t("replace")}
          </Button>
          <Button
            variant="quiet"
            onClick={() => {
              onChoose(null);
              close();
            }}
          >
            {t("clear")}
          </Button>
        </div>
      ) : (
        <ul className="-mx-2 flex max-h-[60dvh] flex-col gap-1 overflow-y-auto">
          {recipes
            .filter((recipe) => recipe.meals.includes(meal))
            .map((recipe) => (
              <li key={recipe.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChoose(recipe.id);
                    close();
                  }}
                  className="flex w-full items-center gap-3 rounded-button p-2 text-left hover:bg-ground"
                >
                  <RecipeHero
                    recipe={recipe}
                    sizes="48px"
                    className="size-12 shrink-0 rounded-lg"
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-semibold">{localize(recipe.name, locale)}</span>
                    <RecipeMeta recipe={recipe} />
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </Dialog>
  );
}
