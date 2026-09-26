import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TimerBubble } from "@/features/cooking";
import { routing } from "@/i18n/routing";
import { AppShell } from "@/shared/ui";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: hasLocale(routing.locales, locale) ? locale : "en" });
  return {
    title: t("common.appName"),
    description: t("common.kicker"),
    icons: { apple: "/icons/apple-touch-icon.png" },
    appleWebApp: { capable: true, title: t("common.appName"), statusBarStyle: "default" },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-ground font-body text-ink antialiased">
        <NextIntlClientProvider>
          <AppShell>{children}</AppShell>
          <TimerBubble />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
