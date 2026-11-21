"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";

import { profile } from "@/data/profile";

const HeroRobot3D = dynamic(
  () => import("@/components/webgl/hero-robot-3d"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);

export default function HeroEditorial() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden border-b border-rule-strong bg-paper lg:snap-start">
      <div className="mx-auto flex w-full max-w-[1680px] flex-1 items-center px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="grid w-full items-center gap-6 lg:grid-cols-12 lg:gap-4">
          {/* Left Column: Anchored left with crisp typography and concrete facts */}
          <div className="relative z-10 lg:col-span-5">
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl xl:text-[4.5rem]">
              {profile.name}
            </h1>

            <p className="mt-4 max-w-xl font-display text-xl font-medium leading-snug tracking-[-0.015em] text-ink/85 sm:text-2xl">
              {t("headline")}
            </p>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-[17px]">
              {t("subcopy")}
            </p>

            {/* Primary CTAs + direct engineering profile links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#works"
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-mustard hover:text-ink"
              >
                {t("ctaPrimary")}
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink bg-paper px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-mustard"
              >
                {t("ctaSecondary")}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="flex items-center gap-4 pl-1 font-mono text-xs uppercase tracking-wider text-ink">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Verifiable engineering facts strip */}
            <dl className="mt-10 grid gap-5 border-t border-rule pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-mustard-deep">
                  {t("factProductionLabel")}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink">
                  {t("factProductionValue")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-mustard-deep">
                  {t("factSystemsLabel")}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink">
                  {t("factSystemsValue")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-mustard-deep">
                  {t("factLanguageLabel")}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink">
                  {t("factLanguageValue")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Wide frameless full-height stage for the roaming 3D robot */}
          <div className="relative h-[420px] w-full sm:h-[500px] lg:col-span-7 lg:h-[min(78svh,680px)]">
            <HeroRobot3D />
          </div>
        </div>
      </div>

      {/* Subtle scroll cue anchored to the bottom of the full-viewport hero */}
      <div className="flex justify-center pb-5">
        <a
          href="#works"
          aria-label={t("ctaPrimary")}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          <span>{t("ctaPrimary")}</span>
        </a>
      </div>
    </section>
  );
}
