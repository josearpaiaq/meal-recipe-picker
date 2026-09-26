"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

/** Side nav on desktop, bottom nav on phone. Recipe screens are full-bleed on phone; cooking mode on both. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const inRecipe = pathname.startsWith("/recipes/");
  const cooking = inRecipe && pathname.endsWith("/cook");

  return (
    <div className="flex min-h-dvh">
      {!cooking && <SideNav />}
      <main className={inRecipe ? "min-w-0 flex-1" : "min-w-0 flex-1 pb-24 lg:pb-0"}>
        {children}
      </main>
      {!inRecipe && <BottomNav />}
    </div>
  );
}
