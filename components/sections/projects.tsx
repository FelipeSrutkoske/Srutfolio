import { useTranslations } from "next-intl";

import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { pick } from "@/lib/localize";
import { Chip, FlagLink, SectionHeading } from "@/components/ui";
import WindowFrame from "@/components/window-frame";

const EXT_BY_ID: Record<string, string> = {
  tcc: ".ts",
  memedio: ".tsx",
  "vt-shield": ".js",
  vehigo: ".ts",
  "skypass-features": ".php",
};

/**
 * Projects — each card is a file window in the IDE:
 * title as heading, stack as `[ tag ]` chips, highlights as changelog
 * additions, links as CLI-flag buttons. Hover shifts the outline to
 * primary; keyboard focus shifts it to tertiary (DESIGN.md).
 * Cards use CSS subgrid (row-span-6: header, title, summary, stack,
 * changelog, footer) so every section shares the parent's row tracks —
 * titles align with titles, changelogs with changelogs, footers with
 * footers across every card in the same grid row, regardless of how
 * much content each card has. A gentle lift rewards hover.
 */
function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const t = useTranslations("projects");

  const title = pick(locale, project.title, project.titleEn);
  const summary = pick(locale, project.summary, project.summaryEn);
  const highlights = pick(locale, project.highlights, project.highlightsEn);
  const statusNote = pick(locale, project.statusNote, project.statusNoteEn);

  const hasLinks = Boolean(
    project.links.repo || project.links.demo || project.links.paper,
  );

  return (
    <WindowFrame
      path={`~/portfolio/projects/${project.id}${EXT_BY_ID[project.id] ?? ".ts"}`}
      className="row-span-6 grid grid-cols-1 grid-rows-subgrid gap-y-0 transition-[border-color,transform] duration-150 hover:border-primary-container focus-within:border-tertiary-fixed-dim motion-safe:hover:-translate-y-0.5"
      bodyClassName="row-span-5 grid grid-cols-1 grid-rows-subgrid gap-y-0 p-4 md:p-6"
    >
      {/* Row: Title (aligned across cards) */}
      <h3 className="text-body-lg font-bold leading-snug text-on-surface">
        <span className="text-primary-container"># </span>
        {title}
      </h3>

      {/* Row: Summary (aligned across cards) */}
      <p className="mt-2 text-code-sm text-on-surface-variant leading-relaxed">
        {summary}
      </p>

      {/* Row: Stack Tags (aligned across cards) */}
      <div className="mt-3 flex flex-wrap content-start gap-1.5 pt-1">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      {/* Row: Changelog (aligned across cards) */}
      <div className="mt-4 flex flex-col gap-2 border-t border-outline-variant/60 pt-4">
        <p className="text-label-caps font-bold uppercase tracking-wider text-secondary-fixed-dim">
          {t("changelog")}
        </p>
        <ul className="space-y-2 text-code-sm">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span aria-hidden="true" className="shrink-0 text-primary-container">
                +
              </span>
              <span className="break-words text-on-surface-variant leading-relaxed">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Row: Repository / Status Footer (aligned across cards) */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-outline-variant/60 pt-3">
        {project.links.repo ? (
          <FlagLink href={project.links.repo} external>
            {t("flags.repo")}
          </FlagLink>
        ) : null}
        {project.links.demo ? (
          <FlagLink href={project.links.demo} external>
            {t("flags.demo")}
          </FlagLink>
        ) : null}
        {project.links.paper ? (
          <FlagLink href={project.links.paper} external>
            {t("flags.paper")}
          </FlagLink>
        ) : null}
        {!hasLinks ? (
          <span className="inline-block border border-outline-variant/60 bg-surface-container-low px-3 py-1.5 text-code-sm font-medium text-on-surface-variant">
            [ {statusNote ?? t("privateNote")} ]
          </span>
        ) : null}
      </div>
    </WindowFrame>
  );
}

export default function Projects({ locale }: { locale: string }) {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="scroll-mt-20">
      <SectionHeading title={t("title")} description={t("description")} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
