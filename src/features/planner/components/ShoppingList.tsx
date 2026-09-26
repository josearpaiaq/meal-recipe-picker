"use client";

import { useLocale, useTranslations } from "next-intl";
import { localize } from "@/shared/lib/format";
import type { ShoppingGroup } from "../lib/shoppingList";

type Props = {
  groups: ShoppingGroup[];
  checked: string[];
  onToggle: (key: string) => void;
};

export function ShoppingList({ groups, checked, onToggle }: Props) {
  const t = useTranslations("planner");
  const locale = useLocale();

  if (groups.length === 0) return <p className="text-base text-muted">{t("emptyList")}</p>;
  return (
    <div className="flex flex-col gap-4.5">
      {groups.map((group) => (
        <section key={group.aisle} className="flex flex-col gap-0.5">
          <h3 className="pb-1 text-xs font-semibold tracking-wider text-muted uppercase">
            {t(`aisles.${group.aisle}`)}
          </h3>
          <ul>
            {group.items
              .map((item) => ({ ...item, text: localize(item.label, locale) }))
              .sort((a, b) => a.text.localeCompare(b.text, locale))
              .map((item) => (
                <li key={item.key}>
                  <label className="flex min-h-touch items-center gap-2.5 text-base">
                    <input
                      type="checkbox"
                      checked={checked.includes(item.key)}
                      onChange={() => onToggle(item.key)}
                      className="size-4.5 shrink-0 accent-herb"
                    />
                    <span className="flex-1">{item.text}</span>
                    <span className="text-sm text-muted">{item.quantities.join(" + ")}</span>
                  </label>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
