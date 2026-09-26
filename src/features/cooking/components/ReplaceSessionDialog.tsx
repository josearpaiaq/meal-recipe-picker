"use client";

import { useTranslations } from "next-intl";
import { Button, Dialog } from "@/shared/ui";
import type { ReplaceDialogState } from "../hooks/useStartCooking";

export function ReplaceSessionDialog({
  open,
  currentRecipeName,
  onKeep,
  onStartNew,
}: ReplaceDialogState) {
  const t = useTranslations("cooking");
  return (
    <Dialog open={open} onClose={onKeep} title={t("replaceTitle")}>
      <p className="text-base leading-relaxed text-muted">
        {t("replaceBody", { recipe: currentRecipeName })}
      </p>
      <div className="flex gap-2.5 pt-2">
        <Button variant="secondary" className="flex-1" onClick={onKeep}>
          {t("keepCooking")}
        </Button>
        <Button variant="destructive" className="flex-1" onClick={onStartNew}>
          {t("startNew")}
        </Button>
      </div>
    </Dialog>
  );
}
