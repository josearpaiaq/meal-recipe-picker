"use client";

import { useState } from "react";
import { useFavoritesStore, type Rating } from "./store";

/** Log a cooked entry, then ask for an optional rating. */
export function useLogCooked() {
  const logCooked = useFavoritesStore((state) => state.logCooked);
  const rate = useFavoritesStore((state) => state.rate);
  const [pending, setPending] = useState<number | null>(null);

  return {
    log(recipeId: string) {
      setPending(logCooked(recipeId));
    },
    ratingOpen: pending !== null,
    finishRating(rating: Rating | undefined) {
      if (pending !== null && rating) rate(pending, rating);
      setPending(null);
    },
  };
}
