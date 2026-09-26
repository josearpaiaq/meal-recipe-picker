"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { useLogCooked } from "../hooks";
import { RatingDialog } from "./RatingDialog";

export function CookedItButton({ recipeId, recipeName }: { recipeId: string; recipeName: string }) {
  const t = useTranslations("favorites");
  const { log, ratingOpen, finishRating } = useLogCooked();

  return (
    <>
      <Button variant="secondary" className="flex-1" onClick={() => log(recipeId)}>
        {t("cookedIt")}
      </Button>
      <RatingDialog open={ratingOpen} recipeName={recipeName} onDone={finishRating} />
    </>
  );
}
