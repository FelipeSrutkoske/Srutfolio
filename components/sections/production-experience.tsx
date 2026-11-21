import { useTranslations } from "next-intl";

import {
  education,
  languages,
  productionExperience,
} from "@/data/experience";
import { pick } from "@/lib/localize";

export default function ProductionExperience({ locale }: { locale: string }) {
  const t = useTranslations("production");

  return (
    <section
      id="production"
      className="scroll-mt-16 border-y border-rule-strong bg-paper-alt px-4 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-container-max">
        {/* Section Header */}
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

        {/* Company & Role Overview */}
        <div className="mt-10 grid gap-6 border border-rule-strong bg-paper p-6 md:grid-cols-12 md:p-8">
          <div className="md:col-span-4">
            <span className="inline-block bg-mustard px-2.5 py-1 font-mono text-xs font-bold uppercase text-ink">
              {pick(locale, productionExperience.period, productionExperience.periodEn)}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              {productionExperience.company}
            </h3>
            <p className="mt-1 text-sm font-medium text-ink-muted">
              {pick(locale, productionExperience.role, productionExperience.roleEn)}
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              {pick(locale, productionExperience.summary, productionExperience.summaryEn)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {productionExperience.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-rule-strong bg-paper-alt px-2.5 py-1 font-mono text-[11px] text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Structured Production Stories */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {productionExperience.stories.map((story) => (
            <article
              key={story.id}
              className="flex flex-col justify-between border border-rule-strong bg-paper p-6"
            >
              <div>
                <span className="inline-block border border-rule-strong bg-paper-alt px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  {pick(locale, story.tag, story.tagEn)}
                </span>

                <h4 className="mt-3 font-display text-xl font-bold leading-snug text-ink">
                  {pick(locale, story.title, story.titleEn)}
                </h4>

                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      {t("contextLabel")}
                    </dt>
                    <dd className="mt-0.5 text-ink-muted">
                      {pick(locale, story.context, story.contextEn)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      {t("executionLabel")}
                    </dt>
                    <dd className="mt-0.5 text-ink">
                      {pick(locale, story.execution, story.executionEn)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-mustard-deep">
                      {t("outcomeLabel")}
                    </dt>
                    <dd className="mt-0.5 font-medium text-ink">
                      {pick(locale, story.outcome, story.outcomeEn)}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-rule pt-4">
                {story.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-paper-alt px-2 py-0.5 font-mono text-[10px] text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Education & Languages Compact Strip */}
        <div className="mt-8 grid gap-6 border-t border-rule-strong pt-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              {t("educationLabel")}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              {pick(locale, education.degree, education.degreeEn)}
            </p>
            <p className="mt-0.5 text-sm text-ink-muted">
              {education.institution} ·{" "}
              {pick(locale, education.status, education.statusEn)}
            </p>
          </div>

          <div className="md:col-span-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              {t("languagesLabel")}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <span className="font-semibold">
                    {pick(locale, lang.name, lang.nameEn)}:
                  </span>{" "}
                  <span className="text-ink-muted">
                    {pick(locale, lang.level, lang.levelEn)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
