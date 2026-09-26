"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";
import { isActive, navItems } from "./navItems";

export function BottomNav() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-nav px-2 pt-1.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-14 flex-col items-center justify-center gap-1 text-xs",
              active ? "font-semibold text-herb" : "font-medium text-muted",
            )}
          >
            <Icon name={item.icon} className="size-5.5" />
            {t(item.short)}
          </Link>
        );
      })}
    </nav>
  );
}
