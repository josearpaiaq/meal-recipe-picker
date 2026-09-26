"use client";

import { useLocale, useTranslations } from "next-intl";
import { useLogCooked, RatingDialog } from "@/features/favorites";
import type { Recipe } from "@/features/recipes";
import { Link, useRouter } from "@/i18n/navigation";
import { useNow } from "@/shared/hooks/useNow";
import { cn } from "@/shared/lib/cn";
import { localize } from "@/shared/lib/format";
import { Button, Chip, Icon, LanguageSwitch } from "@/shared/ui";
import { useCookingSessionFor } from "../hooks/useStartCooking";
import { useWakeLock } from "../hooks/useWakeLock";
import { useCookingStore, type CookSession } from "../store";
import { ReplaceSessionDialog } from "./ReplaceSessionDialog";
import { TimerCard } from "./TimerCard";

export function CookingMode({ recipe }: { recipe: Recipe }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { status, session, dialog } = useCookingSessionFor(recipe.id);
  const { log, ratingOpen, finishRating } = useLogCooked();
  const end = useCookingStore((state) => state.end);
  useWakeLock();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col">
      {session ? (
        <CookingSteps
          recipe={recipe}
          session={session}
          onFinish={() => {
            end();
            log(recipe.id);
          }}
        />
      ) : (
        status !== "none" && <p className="py-16 text-center text-muted">{t("common.loading")}</p>
      )}
      <ReplaceSessionDialog {...dialog} />
      <RatingDialog
        open={ratingOpen}
        recipeName={localize(recipe.name, locale)}
        onDone={(rating) => {
          finishRating(rating);
          router.push("/");
        }}
      />
    </div>
  );
}

type StepsProps = { recipe: Recipe; session: CookSession; onFinish: () => void };

function CookingSteps({ recipe, session, onFinish }: StepsProps) {
  const t = useTranslations("cooking");
  const locale = useLocale();
  const now = useNow();
  const goToStep = useCookingStore((state) => state.goToStep);
  const startTimer = useCookingStore((state) => state.startTimer);
  const clearTimer = useCookingStore((state) => state.clearTimer);

  const total = recipe.steps.length;
  const index = Math.min(session.stepIndex, total - 1);
  const step = recipe.steps[index];
  const isLast = index === total - 1;
  const ingredients = new Map(recipe.ingredients.map((i) => [i.id, i]));

  return (
    <>
      <header className="flex flex-col gap-3.5 px-4 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/recipes/${recipe.id}`}
            aria-label={t("exit")}
            className="flex size-11 items-center justify-center rounded-xl bg-sunken text-ink"
          >
            <Icon name="close" />
          </Link>
          <p className="flex-1 text-center text-sm font-semibold text-muted">
            {t("stepOf", { current: index + 1, total })}
          </p>
          <LanguageSwitch />
        </div>
        <div
          role="progressbar"
          aria-label={t("progress")}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          className="flex gap-1.5"
        >
          {recipe.steps.map((_, k) => (
            <div
              key={k}
              className={cn("h-1.5 flex-1 rounded-full", k <= index ? "bg-herb" : "bg-track")}
            />
          ))}
        </div>
      </header>

      <section className="flex flex-1 flex-col gap-6 px-5 pt-7">
        <p aria-hidden="true" className="font-display text-step-number font-semibold text-herb">
          {index + 1}
        </p>
        <p className="font-display text-step font-medium">{localize(step.text, locale)}</p>

        {step.uses.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">
              {t("youllNeed")}
            </p>
            <ul className="flex flex-wrap gap-2">
              {step.uses.map((id) => {
                const ingredient = ingredients.get(id);
                return (
                  ingredient && (
                    <li key={id}>
                      <Chip variant="outline">
                        {ingredient.qty} {localize(ingredient.label, locale)}
                      </Chip>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        )}

        {step.timer && (
          <TimerCard
            label={localize(step.timer.label, locale)}
            durationSec={step.timer.durationSec}
            endsAt={session.timers[index]?.endsAt}
            now={now}
            onStart={() => startTimer(index, step.timer!.durationSec)}
            onReset={() => clearTimer(index)}
          />
        )}

        <p className="mt-auto flex items-center gap-2 text-sm text-muted">
          <Icon name="sun" className="size-4" />
          {t("screenAwake")}
        </p>
      </section>

      <footer className="flex gap-2.5 px-5 pt-4 pb-7">
        <Button
          variant="secondary"
          size="cook"
          className="w-30"
          disabled={index === 0}
          onClick={() => goToStep(index - 1)}
        >
          {t("back")}
        </Button>
        {isLast ? (
          <Button size="cook" className="flex-1" onClick={onFinish}>
            {t("finish")}
          </Button>
        ) : (
          <Button size="cook" className="flex-1" onClick={() => goToStep(index + 1)}>
            {t("next")}
          </Button>
        )}
      </footer>
    </>
  );
}
