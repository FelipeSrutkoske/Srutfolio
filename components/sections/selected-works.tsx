import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/navigation";
import { projects } from "@/data/projects";
import { pick } from "@/lib/localize";
import ProjectMockup from "@/components/project-mockup";

export default function SelectedWorks({ locale }: { locale: string }) {
  const t = useTranslations("works");
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);

  return (
    <section
      id="works"
      className="mx-auto max-w-container-max px-4 py-20 md:px-8 md:py-28"
    >
      {/* Section Header */}
      <div className="grid gap-6 border-b border-rule-strong pb-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl md:text-6xl">
            {t("heading")}
          </h2>
        </div>
        <p className="font-serif text-xl italic text-ink-muted md:col-span-5 md:text-right">
          {t("subheading")}
        </p>
      </div>

      {/* Asymmetric Featured Flagships */}
      <div className="mt-12 space-y-16 md:space-y-20">
        {featured.map((project, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={project.id}
              className="grid items-center gap-8 border-b border-rule pb-14 md:grid-cols-12 md:gap-10"
            >
              <div className={`md:col-span-6 ${isEven ? "md:order-2" : ""}`}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="VIEW CASE"
                  className="group block transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProjectMockup projectId={project.id} />
                </Link>
              </div>

              <div className={`md:col-span-6 ${isEven ? "md:order-1" : ""}`}>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-muted">
                  <span>
                    0{index + 1} // {pick(locale, project.category, project.categoryEn)}
                  </span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
                  {pick(locale, project.title, project.titleEn)}
                </h3>
                <p className="mt-1 font-serif text-xl italic text-ink-muted">
                  {pick(locale, project.subtitle, project.subtitleEn)}
                </p>

                <p className="mt-4 text-base leading-relaxed text-ink">
                  {pick(locale, project.summary, project.summaryEn)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-rule-strong px-2.5 py-1 font-mono text-[11px] uppercase text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    data-cursor="OPEN"
                    className="inline-flex items-center gap-2 bg-mustard px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    {t("viewCase")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link font-mono text-xs uppercase tracking-wider text-ink"
                    >
                      {t("repo")} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial Archive List for Remaining Projects */}
      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          {t("archiveLabel")}
        </p>

        <div className="mt-6 divide-y divide-rule-strong border-y border-rule-strong">
          {archive.map((project, idx) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              data-cursor="VIEW CASE"
              className="group grid items-center gap-4 py-6 transition-colors hover:bg-mustard-soft md:grid-cols-12 md:px-4"
            >
              <div className="font-mono text-xs text-ink-muted md:col-span-2">
                0{featured.length + idx + 1} // {project.year}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-bold uppercase text-ink group-hover:underline">
                  {pick(locale, project.title, project.titleEn)}
                </h3>
                <span className="font-mono text-[11px] uppercase text-ink-muted">
                  {pick(locale, project.category, project.categoryEn)}
                </span>
              </div>
              <p className="text-sm text-ink-muted md:col-span-4">
                {pick(locale, project.summary, project.summaryEn)}
              </p>
              <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-3">
                {project.statusNote && (
                  <span className="bg-ink px-2 py-0.5 font-mono text-[10px] uppercase text-mustard">
                    {pick(locale, project.statusNote, project.statusNoteEn)}
                  </span>
                )}
                <ArrowUpRight className="h-5 w-5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
