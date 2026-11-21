import "@/app/globals.css";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { routing } from "@/i18n";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
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
  const path = `/${locale}`;

  return {
    metadataBase: new URL("https://felipesrutkoske.dev"),
    title: {
      default: t("title"),
      template: `%s | ${profile.name}`,
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
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `https://felipesrutkoske.dev/${locale}`,
    email: `mailto:${profile.email}`,
    jobTitle: locale === "en" ? profile.roleEn : profile.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Campo Mourão",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    sameAs: [profile.githubUrl, profile.linkedinUrl],
    knowsAbout: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Go (Golang)",
      "PostgreSQL",
      "MySQL",
      "Oracle Database",
      "Redis",
      "Linux",
      "Nginx",
      "Docker",
      "Rust",
      "Next.js",
      "React Native",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="paper-grain bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
