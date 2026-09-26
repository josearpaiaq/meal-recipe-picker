"use client";

import { useTranslations } from "next-intl";
import { Button, Icon } from "@/shared/ui";
import { useStartCooking } from "../hooks/useStartCooking";
import { ReplaceSessionDialog } from "./ReplaceSessionDialog";

export function CookButton({ recipeId }: { recipeId: string }) {
  const t = useTranslations("recipes");
  const { startCooking, dialog } = useStartCooking();

  return (
    <>
      <Button size="lg" onClick={() => startCooking(recipeId)}>
        <Icon name="play" />
        {t("cookStepByStep")}
      </Button>
      <ReplaceSessionDialog {...dialog} />
    </>
  );
}
