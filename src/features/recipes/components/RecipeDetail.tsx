import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { localize } from "@/shared/lib/format";
import { Icon, LanguageSwitch } from "@/shared/ui";
import type { Recipe } from "../types";
import { PlateChips } from "./PlateChips";
import { RecipeHero } from "./RecipeHero";
import { RecipeMeta } from "./RecipeMeta";
import { WhyItTastesGood } from "./WhyItTastesGood";

type Props = {
  recipe: Recipe;
  /** Slots filled by other features, so recipes stays independent of them. */
  favorite?: ReactNode;
  primaryAction: ReactNode;
  footerActions: ReactNode;
};

export function RecipeDetail({ recipe, favorite, primaryAction, footerActions }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col lg:px-8 lg:py-8">
      <RecipeHero
        recipe={recipe}
        priority
        className="flex h-60 shrink-0 flex-col justify-between lg:h-96 lg:rounded-card"
      >
        <div className="relative flex items-center justify-between px-4 pt-5">
          <Link
            href="/"
            aria-label={t("common.back")}
            className="flex size-11 items-center justify-center rounded-xl bg-surface/90 text-ink"
          >
            <Icon name="back" />
          </Link>
          <LanguageSwitch onImage />
        </div>
        {recipe.imageCredit && (
          <a
            href={recipe.imageCredit.url}
            target="_blank"
            rel="noreferrer"
            className="relative m-3 self-end rounded-full bg-ink/60 px-2.5 py-1 text-xs text-surface hover:bg-ink/80"
          >
            {t("recipes.photoCredit", {
              author: recipe.imageCredit.author,
              license: recipe.imageCredit.license,
            })}
          </a>
        )}
      </RecipeHero>

      <div className="flex flex-col gap-5 p-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:px-0 lg:pt-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-3xl leading-tight font-semibold">
                {localize(recipe.name, locale)}
              </h1>
              <RecipeMeta recipe={recipe} showServings />
            </div>
            {favorite}
          </div>
          <PlateChips plate={recipe.plate} />
          {primaryAction}
          <WhyItTastesGood text={localize(recipe.flavorNote, locale)} />
        </div>

        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-2.5">
            <h2 className="font-display text-xl font-semibold">{t("recipes.ingredients")}</h2>
            <ul className="flex flex-col rounded-button bg-surface px-4 py-1">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="border-b border-sunken last:border-b-0">
                  <label className="flex min-h-touch items-center gap-3 text-base">
                    <input type="checkbox" className="size-5 shrink-0 accent-herb" />
                    {ingredient.qty} {localize(ingredient.label, locale)}
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2.5">
            <h2 className="font-display text-xl font-semibold">{t("recipes.steps")}</h2>
            <ol className="flex list-decimal flex-col gap-3 pl-5.5 text-base leading-relaxed">
              {recipe.steps.map((step, index) => (
                <li key={index}>{localize(step.text, locale)}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="flex gap-2.5 px-5 pt-4 pb-6 lg:px-0">{footerActions}</div>
    </article>
  );
}
