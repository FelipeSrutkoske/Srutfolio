import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Whoami from "@/components/sections/whoami";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen">
      <a
        href="#whoami"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-primary-container focus:bg-surface-container-lowest focus:px-3 focus:py-2 focus:text-code-sm focus:text-primary-container"
      >
        {t("skip")}
      </a>

      <TopNav />

      <main className="mx-auto max-w-container-max px-4 pb-16 md:px-6 md:pb-24">
        <Hero locale={locale} />

        <div className="space-y-16 md:space-y-24">
          <Whoami locale={locale} />
          <Projects locale={locale} />
          <Skills locale={locale} />
          <Experience locale={locale} />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
