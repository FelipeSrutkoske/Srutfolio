"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { skillPillars } from "@/data/skills";
import { pick } from "@/lib/localize";
import { Link } from "@/navigation";

export default function EngineeringProof({ locale }: { locale: string }) {
  const t = useTranslations("skills");
  const [activeTech, setActiveTech] = useState<string>(
    skillPillars[0].items[0].name
  );

  const allItems = skillPillars.flatMap((p) => p.items);
  const selectedItem =
    allItems.find((i) => i.name === activeTech) ?? allItems[0];

  return (
    <section
      id="skills"
      className="mx-auto max-w-container-max scroll-mt-16 px-4 py-20 md:px-8 md:py-24"
    >
      <div className="grid gap-5 border-b border-rule-strong pb-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard-deep">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {t("heading")}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted md:col-span-5 md:text-base">
          {t("subheading")}
        </p>
      </div>

      {/* Interactive Proof Bar */}
      <div
        aria-live="polite"
        className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-rule-strong bg-paper-alt p-4 md:p-5"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-mustard px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
              {selectedItem.name}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              {pick(locale, selectedItem.context, selectedItem.contextEn)}
            </span>
          </div>
          <p className="text-sm text-ink">
            {pick(locale, selectedItem.note, selectedItem.noteEn)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase text-ink-muted">
            {t("appliedIn")}
          </span>
          {selectedItem.links.map((target) => (
            <Link
              key={`${selectedItem.name}-${target.href}`}
              href={target.href}
              className="border border-ink bg-ink px-3 py-1 font-mono text-xs font-bold uppercase text-paper transition-colors hover:bg-mustard hover:text-ink"
            >
              {pick(locale, target.label, target.labelEn)} ↗
            </Link>
          ))}
        </div>
      </div>

      {/* 3 Capability Pillars */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skillPillars.map((pillar) => (
          <div
            key={pillar.id}
            className="flex flex-col border border-rule-strong bg-paper p-6"
          >
            <h3 className="font-display text-xl font-bold text-ink">
              {pick(locale, pillar.title, pillar.titleEn)}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {pick(locale, pillar.subtitle, pillar.subtitleEn)}
            </p>

            <div className="mt-6 space-y-2.5">
              {pillar.items.map((item) => {
                const isSelected = activeTech === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveTech(item.name)}
                    className={`w-full border p-3 text-left transition-all ${
                      isSelected
                        ? "border-ink bg-mustard text-ink shadow-[3px_3px_0px_#0E0E0D]"
                        : "border-rule bg-paper-alt/50 text-ink hover:border-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold">
                        {item.name}
                      </span>
                      <span
                        className={`shrink-0 px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                          isSelected
                            ? "bg-ink text-mustard"
                            : "border border-rule-strong text-ink-muted"
                        }`}
                      >
                        {pick(locale, item.context, item.contextEn)}
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 text-xs leading-relaxed ${
                        isSelected ? "text-ink/90" : "text-ink-muted"
                      }`}
                    >
                      {pick(locale, item.note, item.noteEn)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
