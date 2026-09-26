"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "../lib/cn";
import { SegmentedControl } from "./SegmentedControl";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export function LanguageSwitch({ onImage = false }: { onImage?: boolean }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SegmentedControl
      variant="compact"
      label={t("language")}
      options={options}
      value={locale}
      onChange={(next) => router.replace(pathname, { locale: next, scroll: false })}
      className={cn("shrink-0", onImage && "bg-surface/90")}
    />
  );
}
