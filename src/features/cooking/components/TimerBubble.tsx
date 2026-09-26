"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useMounted } from "@/shared/hooks/useMounted";
import { useNow } from "@/shared/hooks/useNow";
import { cn } from "@/shared/lib/cn";
import { localize } from "@/shared/lib/format";
import { Icon } from "@/shared/ui";
import { cookPath } from "../hooks/useStartCooking";
import { useTimerAlerts } from "../hooks/useTimerAlerts";
import { formatClock, isDone, remainingSec, sortBySoonest } from "../lib/timers";
import { lookupRecipe } from "../recipeLookup";
import { useCookingStore } from "../store";

/** Global floating pill for running timers. Hidden when there are none to show. */
export function TimerBubble() {
  const t = useTranslations("cooking");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const now = useNow();
  const session = useCookingStore((state) => state.session);
  const goToStep = useCookingStore((state) => state.goToStep);
  const [expanded, setExpanded] = useState(false);
  useTimerAlerts(session, now);

  const recipe = lookupRecipe(session?.recipeId);
  if (!mounted || !session || !recipe || !now) return null;

  const inCookingMode = pathname === cookPath(session.recipeId);
  const items = sortBySoonest(session.timers)
    .filter(({ step }) => !(inCookingMode && step === session.stepIndex))
    .map(({ step, endsAt }) => ({
      step,
      label: localize(recipe.steps[step]?.timer?.label ?? recipe.name, locale),
      done: isDone(endsAt, now),
      clock: formatClock(remainingSec(endsAt, now)),
    }));
  if (items.length === 0) return null;

  const soonest = items[0];
  const single = items.length === 1;
  const anyDone = items.some((item) => item.done);
  const open = (step: number) => {
    goToStep(step);
    setExpanded(false);
    router.push(cookPath(session.recipeId));
  };

  const position = inCookingMode
    ? "bottom-28"
    : pathname.startsWith("/recipes/")
      ? "bottom-5"
      : "bottom-24 lg:bottom-6";

  return (
    <div className={cn("fixed right-5 z-30 flex flex-col items-end gap-2", position)}>
      {expanded && !single && (
        <ul className="flex flex-col items-end gap-2">
          {items.map((item) => (
            <li key={item.step}>
              <button
                type="button"
                onClick={() => open(item.step)}
                aria-label={t("goToStep", { step: item.step + 1, label: item.label })}
                className={cn(
                  "flex h-12 items-center gap-2.5 rounded-full px-4 text-base shadow-lg",
                  item.done
                    ? "bg-tomato font-semibold text-surface"
                    : "border border-line bg-surface text-ink",
                )}
              >
                <span className="font-semibold">{item.label}</span>
                <span className={item.done ? undefined : "text-muted"}>
                  {t("stepTag", { step: item.step + 1 })}
                </span>
                <span className="font-semibold tabular-nums">
                  {item.done ? t("timesUp") : item.clock}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => (single ? open(soonest.step) : setExpanded(!expanded))}
        aria-expanded={single ? undefined : expanded}
        aria-label={
          single
            ? t("goToStep", { step: soonest.step + 1, label: soonest.label })
            : expanded
              ? t("hideTimers")
              : t("showTimers")
        }
        className={cn(
          "flex h-13 items-center gap-2.5 rounded-full px-4.5 text-base font-semibold text-surface shadow-xl",
          anyDone ? "bg-tomato" : "bg-ink",
        )}
      >
        <Icon name="timer" className="size-4.5" />
        <span className="tabular-nums">
          {single
            ? `${soonest.label} · ${soonest.done ? t("timesUp") : soonest.clock}`
            : `${t("timers", { count: items.length })} · ${soonest.done ? t("timesUp") : soonest.clock}`}
        </span>
      </button>
    </div>
  );
}
