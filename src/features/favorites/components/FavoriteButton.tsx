"use client";

import { useTranslations } from "next-intl";
import { useMounted } from "@/shared/hooks/useMounted";
import { cn } from "@/shared/lib/cn";
import { Icon } from "@/shared/ui";
import { useFavoritesStore } from "../store";

export function FavoriteButton({ recipeId, className }: { recipeId: string; className?: string }) {
  const t = useTranslations("favorites");
  const mounted = useMounted();
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(recipeId)) && mounted;
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? t("remove") : t("add")}
      onClick={() => toggleFavorite(recipeId)}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl bg-ground",
        isFavorite ? "text-tomato" : "text-ink",
        className,
      )}
    >
      <Icon name="heart" filled={isFavorite} className="size-5.5" />
    </button>
  );
}
