"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { skillPillars } from "@/data/skills";
import { projects } from "@/data/projects";
import { pick } from "@/lib/localize";
import { Link } from "@/navigation";

export default function EngineeringProof({ locale }: { locale: string }) {
  const t = useTranslations("skills");
  const [activeTech, setActiveTech] = useState<string | null>("Go (Golang)");

  const allItems = skillPillars.flatMap((p) => p.items);
  const selectedItem = allItems.find((i) => i.name === activeTech) ?? null;
  const linkedProjects = selectedItem
    ? projects.filter((p) => selectedItem.usedIn.includes(p.id))
    : [];

  return (
    <section
      id="skills"
      className="border-y border-rule-strong bg-paper-alt px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-container-max">
        <div className="grid gap-6 border-b border-rule-strong pb-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
              {t("heading")}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-muted md:col-span-5">
            {t("subheading")}
          </p>
        </div>

        {/* Interactive Proof Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-rule-strong bg-paper p-4 md:p-5">
          <div className="space-y-1">
            <p className="font-mono text-xs text-ink-muted">{t("filterHint")}</p>
            {selectedItem && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="bg-mustard px-2 py-0.5 font-mono text-xs font-bold text-ink">
                  {selectedItem.name}
                </span>
                <span className="text-sm text-ink">
                  {pick(locale, selectedItem.note, selectedItem.noteEn)}
                </span>
              </div>
            )}
          </div>

          {linkedProjects.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {linkedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.slug}`}
                  data-cursor="OPEN"
                  className="border border-ink bg-ink px-3 py-1 font-mono text-xs font-bold uppercase text-paper transition-colors hover:bg-mustard hover:text-ink"
                >
                  {pick(locale, proj.title, proj.titleEn)} ↗
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 3 Capability Pillars */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {skillPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col justify-between border border-rule-strong bg-paper p-6"
            >
              <div>
                <h3 className="font-display text-xl font-extrabold uppercase text-ink">
                  {pick(locale, pillar.title, pillar.titleEn)}
                </h3>
                <p className="mt-1 font-serif text-base italic text-ink-muted">
                  {pick(locale, pillar.subtitle, pillar.subtitleEn)}
                </p>

                <div className="mt-6 space-y-3">
                  {pillar.items.map((item) => {
                    const isSelected = activeTech === item.name;
                    const isPrimary = item.priority === "primary";
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() =>
                          setActiveTech(isSelected ? null : item.name)
                        }
                        className={`w-full border p-3 text-left transition-all ${
                          isSelected
                            ? "border-ink bg-mustard text-ink shadow-[3px_3px_0px_#0E0E0D]"
                            : isPrimary
                              ? "border-ink bg-ink text-paper hover:bg-mustard hover:text-ink"
                              : "border-rule bg-paper-alt/60 text-ink hover:border-ink"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold uppercase">
                            {item.name}
                          </span>
                          {isPrimary && (
                            <span
                              className={`px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                                isSelected
                                  ? "bg-ink text-mustard"
                                  : "bg-mustard text-ink"
                              }`}
                            >
                              {t("priorityBadge")}
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-1.5 text-xs leading-relaxed ${
                            isSelected
                              ? "text-ink/85"
                              : isPrimary
                                ? "text-paper/80"
                                : "text-ink-muted"
                          }`}
                        >
                          {pick(locale, item.note, item.noteEn)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
