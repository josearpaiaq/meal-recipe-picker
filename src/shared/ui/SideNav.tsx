"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "../lib/cn";
import { isActive, navItems } from "./navItems";

export function SideNav() {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-side-nav shrink-0 flex-col gap-7 border-r border-line bg-nav px-4 py-7 lg:flex">
      <div className="px-2 font-display text-2xl font-semibold">{t("appName")}</div>
      <nav aria-label={t("nav.label")} className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-touch items-center rounded-lg px-3 text-base",
                active
                  ? "bg-ink font-semibold text-ground"
                  : "font-medium text-ink hover:bg-sunken",
              )}
            >
              {t(`nav.${item.long}`)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
