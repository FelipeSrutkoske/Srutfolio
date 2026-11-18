import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n";
import IntroCurtain from "@/components/intro-curtain";
import EditorialNav from "@/components/editorial-nav";
import HeroEditorial from "@/components/sections/hero-editorial";
import StackMarquee from "@/components/sections/stack-marquee";
import SelectedWorks from "@/components/sections/selected-works";
import EngineeringProof from "@/components/sections/engineering-proof";
import ExperienceEditorial from "@/components/sections/experience-editorial";
import AboutContact from "@/components/sections/about-contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <IntroCurtain />
      <EditorialNav />

      <main>
        <HeroEditorial />
        <StackMarquee />
        <SelectedWorks locale={locale} />
        <EngineeringProof locale={locale} />
        <ExperienceEditorial locale={locale} />
      </main>

      <AboutContact />
    </div>
  );
}
