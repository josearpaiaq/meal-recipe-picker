import { useTranslations } from "next-intl";

export function WhyItTastesGood({ text }: { text: string }) {
  const t = useTranslations("recipes");
  return (
    <div className="flex flex-col gap-1.5 rounded-button bg-warm px-4 py-3.5">
      <p className="text-xs font-semibold tracking-wider text-warm-ink uppercase">{t("why")}</p>
      <p className="text-base leading-relaxed">{text}</p>
    </div>
  );
}
