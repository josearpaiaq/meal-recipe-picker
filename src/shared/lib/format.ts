import type { Locale } from "@/i18n/routing";

export type Localized = { en: string; es?: string };

export function localize(field: Localized, locale: Locale): string {
  return field[locale] ?? field.en;
}
