import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n";
import EditorialNav from "@/components/editorial-nav";
import HeroEditorial from "@/components/sections/hero-editorial";
import SelectedWorks from "@/components/sections/selected-works";
import ProductionExperience from "@/components/sections/production-experience";
import EngineeringProof from "@/components/sections/engineering-proof";
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
      <EditorialNav />

      <main>
        <HeroEditorial />
        <SelectedWorks locale={locale} />
        <ProductionExperience locale={locale} />
        <EngineeringProof locale={locale} />
      </main>

      <AboutContact />
    </div>
  );
}
