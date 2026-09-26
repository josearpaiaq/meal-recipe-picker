import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/shared/ui";

export default function NotFound() {
  const t = useTranslations("recipes");
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold">{t("notFound")}</h1>
      <Link href="/" className={buttonClasses("primary")}>
        {t("backToPicker")}
      </Link>
    </div>
  );
}
