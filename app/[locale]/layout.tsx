import "@/app/globals.css";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { routing } from "@/i18n";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL("https://felipesrutkoske.dev"),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      url: path,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="paper-grain bg-paper font-sans text-ink antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScroll />
          <CustomCursor />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
