"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useMounted } from "@/shared/hooks/useMounted";
import { localize } from "@/shared/lib/format";
import { useCookingStore } from "../store";
import { lookupRecipe } from "../recipeLookup";

export type ReplaceDialogState = {
  open: boolean;
  currentRecipeName: string;
  onKeep: () => void;
  onStartNew: () => void;
};

export function cookPath(recipeId: string) {
  return `/recipes/${recipeId}/cook`;
}

function useActiveRecipeName() {
  const locale = useLocale();
  const activeId = useCookingStore((state) => state.session?.recipeId);
  const recipe = lookupRecipe(activeId);
  return recipe ? localize(recipe.name, locale) : "";
}

/**
 * Start-cooking flow: start fresh, resume the same recipe, or ask before
 * replacing a different active session.
 */
export function useStartCooking() {
  const router = useRouter();
  const start = useCookingStore((state) => state.start);
  const replace = useCookingStore((state) => state.replace);
  const currentRecipeName = useActiveRecipeName();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const dialog: ReplaceDialogState = {
    open: pendingId !== null,
    currentRecipeName,
    onKeep: () => setPendingId(null),
    onStartNew: () => {
      if (!pendingId) return;
      replace(pendingId);
      setPendingId(null);
      router.push(cookPath(pendingId));
    },
  };

  return {
    startCooking(recipeId: string) {
      if (start(recipeId) === "needs-confirm") setPendingId(recipeId);
      else router.push(cookPath(recipeId));
    },
    dialog,
  };
}

export type CookingPageStatus = "loading" | "ready" | "confirm" | "none";

/**
 * Cooking mode entry: opening a recipe's cooking page with no session starts
 * one; with a different active session it asks first.
 */
export function useCookingSessionFor(recipeId: string) {
  const mounted = useMounted();
  const router = useRouter();
  const session = useCookingStore((state) => state.session);
  const start = useCookingStore((state) => state.start);
  const replace = useCookingStore((state) => state.replace);
  const currentRecipeName = useActiveRecipeName();
  const attempted = useRef(false);

  useEffect(() => {
    // Only on arrival, so finishing (which ends the session) doesn't start a new one.
    if (!mounted || attempted.current) return;
    attempted.current = true;
    start(recipeId);
  }, [mounted, recipeId, start]);

  let status: CookingPageStatus = "none";
  if (!mounted) status = "loading";
  else if (session?.recipeId === recipeId) status = "ready";
  else if (session) status = "confirm";

  const dialog: ReplaceDialogState = {
    open: status === "confirm",
    currentRecipeName,
    onKeep: () => {
      if (session) router.replace(cookPath(session.recipeId));
    },
    onStartNew: () => replace(recipeId),
  };

  return { status, session: status === "ready" ? session : null, dialog };
}
