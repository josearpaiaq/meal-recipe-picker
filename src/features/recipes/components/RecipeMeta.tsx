import { useTranslations } from "next-intl";
import type { Recipe } from "../types";

type Props = {
  recipe: Pick<Recipe, "timeMin" | "effort" | "servings">;
  showServings?: boolean;
};

export function RecipeMeta({ recipe, showServings = false }: Props) {
  const t = useTranslations();
  return (
    <p className="flex flex-wrap gap-3.5 text-sm text-muted">
      <span>{t("common.minutes", { count: recipe.timeMin })}</span>
      <span>{t(`common.effort.${recipe.effort}`)}</span>
      {showServings && <span>{t("recipes.servings", { count: recipe.servings })}</span>}
    </p>
  );
}
