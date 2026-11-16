import { useTranslations } from "next-intl";

import { experiences } from "@/data/experience";
import { pick } from "@/lib/localize";

export default function ExperienceEditorial({ locale }: { locale: string }) {
  const t = useTranslations("experience");

  return (
    <section
      id="experience"
      className="mx-auto max-w-container-max px-4 py-20 md:px-8 md:py-28"
    >
      <div className="grid gap-6 border-b border-rule-strong pb-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
            {t("heading")}
          </h2>
        </div>
        <p className="font-serif text-xl italic text-ink-muted md:col-span-5 md:text-right">
          {t("subheading")}
        </p>
      </div>

      <div className="mt-10 divide-y divide-rule-strong border-b border-rule-strong">
        {experiences.map((exp, idx) => (
          <article
            key={`${exp.company}-${idx}`}
            className="grid gap-6 py-10 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <span className="inline-block bg-mustard px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-ink">
                {pick(locale, exp.period, exp.periodEn)}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-ink">
                {pick(locale, exp.company, exp.companyEn)}
              </h3>
            </div>

            <div className="md:col-span-8">
              <h4 className="font-serif text-2xl italic text-ink">
                {pick(locale, exp.role, exp.roleEn)}
              </h4>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                {pick(locale, exp.summary, exp.summaryEn)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-rule-strong px-2.5 py-1 font-mono text-[11px] uppercase text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
