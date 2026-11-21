import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/navigation";
import { projects } from "@/data/projects";
import { pick } from "@/lib/localize";
import ProjectBlueprint from "@/components/project-blueprint";
import CopyCommand from "@/components/copy-command";

export default function SelectedWorks({ locale }: { locale: string }) {
  const t = useTranslations("works");
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section
      id="works"
      className="mx-auto max-w-container-max scroll-mt-16 px-4 py-20 md:px-8 md:py-24 lg:snap-start"
    >
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

      {/* Featured Public Projects */}
      <div className="mt-12 space-y-16 md:space-y-20">
        {featured.map((project, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={project.id}
              className="grid items-center gap-8 border-b border-rule pb-14 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-10"
            >
              <div className={`md:col-span-6 ${isEven ? "md:order-2" : ""}`}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ProjectBlueprint projectId={project.id} />
                </Link>
              </div>

              <div className={`md:col-span-6 ${isEven ? "md:order-1" : ""}`}>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted">
                  <span>{pick(locale, project.category, project.categoryEn)}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {pick(locale, project.title, project.titleEn)}
                </h3>
                <p className="mt-1.5 text-base font-medium text-ink-muted">
                  {pick(locale, project.subtitle, project.subtitleEn)}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">
                  {pick(locale, project.summary, project.summaryEn)}
                </p>

                {project.installCommand && (
                  <div className="mt-4">
                    <CopyCommand
                      command={project.installCommand}
                      copyLabel={t("copyCmd")}
                      copiedLabel={t("copiedCmd")}
                    />
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-rule-strong bg-paper-alt/60 px-2.5 py-1 font-mono text-[11px] text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-mustard px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    {t("viewCase")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link font-mono text-xs uppercase tracking-wider text-ink"
                  >
                    {t("repo")} ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Compact Row for Systems / Linux Desktop Project */}
      {secondary.length > 0 && (
        <div className="mt-16 border-t border-rule-strong pt-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {t("moreLabel")}
          </p>

          <div className="mt-5 divide-y divide-rule-strong border-y border-rule-strong">
            {secondary.map((project) => (
              <div
                key={project.id}
                className="grid items-center gap-5 py-6 md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    {pick(locale, project.category, project.categoryEn)} ·{" "}
                    {project.year}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-1 inline-block font-display text-2xl font-bold text-ink hover:underline"
                  >
                    {pick(locale, project.title, project.titleEn)}
                  </Link>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {pick(locale, project.summary, project.summaryEn)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-rule px-2 py-0.5 font-mono text-[10px] text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:col-span-3 md:justify-end">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 border border-ink bg-paper px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-mustard"
                  >
                    {t("viewCase")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link font-mono text-xs uppercase tracking-wider text-ink"
                  >
                    {t("repo")} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
