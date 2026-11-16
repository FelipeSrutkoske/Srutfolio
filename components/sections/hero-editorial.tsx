"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const KineticMonolith = dynamic(
  () => import("@/components/webgl/kinetic-monolith"),
  { ssr: false }
);

export default function HeroEditorial() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden border-b border-rule-strong bg-paper px-4 pb-10 pt-8 md:px-8 md:pb-14 md:pt-12">
      {/* Three.js GLSL Sculpture Layer */}
      <KineticMonolith />

      {/* Top Metadata Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest">
        <span className="text-ink-muted">{t("eyebrow")}</span>
        <span className="border border-ink bg-mustard px-2.5 py-1 font-bold text-ink">
          {t("priorityTag")}
        </span>
      </div>

      {/* Giant Mix-Blend-Difference Typography */}
      <div className="relative z-10 my-auto py-12 md:py-16">
        <h1 className="pointer-events-none select-none font-display text-[clamp(3.25rem,10.5vw,9rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.04em] text-white mix-blend-difference">
          <span className="block">{t("headlineTop")}</span>
          <span className="block font-serif font-normal italic tracking-[-0.02em]">
            {t("headlineMid")}
          </span>
          <span className="block">{t("headlineBottom")}</span>
        </h1>
      </div>

      {/* Bottom Editorial Summary + CTAs */}
      <div className="relative z-10 grid items-end gap-6 border-t border-rule pt-6 md:grid-cols-12">
        <p className="max-w-xl text-base leading-relaxed text-ink md:col-span-7 md:text-lg">
          {t("subcopy")}
        </p>

        <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
          <a
            href="#works"
            data-cursor="EXPLORE"
            className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-mustard hover:text-ink"
          >
            {t("ctaPrimary")}
            <ArrowDownRight className="h-4 w-4" />
          </a>

          <a
            href="/Curriculo-Felipe_Srutkoske.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="PDF"
            className="inline-flex items-center gap-2 border border-ink bg-paper/90 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-mustard"
          >
            {t("ctaSecondary")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
