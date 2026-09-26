"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";
import { Icon } from "@/shared/ui";
import type { Rating } from "../store";

const ratings: Rating[] = [1, 2, 3, 4, 5];

type Props = {
  value: Rating | undefined;
  onChange: (rating: Rating) => void;
  size?: "md" | "lg";
};

export function StarRating({ value, onChange, size = "md" }: Props) {
  const t = useTranslations("favorites");
  return (
    <div role="group" aria-label={t("ratingLabel")} className="flex gap-0.5">
      {ratings.map((rating) => (
        <button
          key={rating}
          type="button"
          aria-label={t("rateOption", { rating })}
          aria-pressed={value === rating}
          onClick={() => onChange(rating)}
          className={cn(
            "flex items-center justify-center rounded-lg text-tomato hover:bg-sunken",
            size === "lg" ? "size-12" : "size-11",
          )}
        >
          <Icon
            name="star"
            filled={value !== undefined && rating <= value}
            className={size === "lg" ? "size-8" : "size-5"}
          />
        </button>
      ))}
    </div>
  );
}
