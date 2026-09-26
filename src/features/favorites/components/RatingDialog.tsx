"use client";

import { useTranslations } from "next-intl";
import { Button, Dialog } from "@/shared/ui";
import type { Rating } from "../store";
import { StarRating } from "./StarRating";

type Props = {
  open: boolean;
  recipeName: string;
  onDone: (rating: Rating | undefined) => void;
};

export function RatingDialog({ open, recipeName, onDone }: Props) {
  const t = useTranslations("favorites");
  return (
    <Dialog open={open} onClose={() => onDone(undefined)} title={t("rateTitle")}>
      <p className="text-base leading-relaxed text-muted">
        {t("rateBody", { recipe: recipeName })}
      </p>
      <div className="flex justify-center py-2">
        <StarRating value={undefined} onChange={onDone} size="lg" />
      </div>
      <Button variant="secondary" onClick={() => onDone(undefined)}>
        {t("skip")}
      </Button>
    </Dialog>
  );
}
