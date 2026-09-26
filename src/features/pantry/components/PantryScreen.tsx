"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import type { Recipe } from "@/features/recipes";
import { useMounted } from "@/shared/hooks/useMounted";
import { localize } from "@/shared/lib/format";
import { Button, Icon, LanguageSwitch } from "@/shared/ui";
import { knownIngredients, resolvePantryKey } from "../lib/pantryKeys";
import { usePantryStore } from "../store";

export function PantryScreen({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations("pantry");
  const locale = useLocale();
  const mounted = useMounted();
  const keys = usePantryStore((state) => state.keys);
  const add = usePantryStore((state) => state.add);
  const remove = usePantryStore((state) => state.remove);
  const [text, setText] = useState("");
  const inputId = useId();
  const listId = useId();

  const known = knownIngredients(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((i) => ({
        shoppingKey: i.shoppingKey,
        label: localize(i.label, locale),
      })),
    ),
  );
  const labelFor = (key: string) => known.find((item) => item.key === key)?.label ?? key;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-5 pt-6 lg:px-8 lg:pt-8">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
          <p className="text-base text-muted">{t("intro")}</p>
        </div>
        <LanguageSwitch />
      </header>

      <form
        className="flex items-end gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const key = resolvePantryKey(text, known);
          if (key) add(key);
          setText("");
        }}
      >
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor={inputId} className="text-sm font-semibold text-muted">
            {t("inputLabel")}
          </label>
          <input
            id={inputId}
            list={listId}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={t("placeholder")}
            className="h-13 rounded-button border border-line bg-surface px-4 text-base outline-herb"
          />
          <datalist id={listId}>
            {known.map((item) => (
              <option key={item.key} value={item.label} />
            ))}
          </datalist>
        </div>
        <Button type="submit" disabled={!text.trim()}>
          {t("add")}
        </Button>
      </form>

      {mounted &&
        (keys.length === 0 ? (
          <p className="py-6 text-center text-muted">{t("empty")}</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {keys.map((key) => (
              <li
                key={key}
                className="flex items-center gap-1 rounded-full border border-line bg-surface pl-4 text-base"
              >
                {labelFor(key)}
                <button
                  type="button"
                  aria-label={t("remove", { item: labelFor(key) })}
                  onClick={() => remove(key)}
                  className="flex size-11 items-center justify-center rounded-full text-muted hover:bg-sunken"
                >
                  <Icon name="close" className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
