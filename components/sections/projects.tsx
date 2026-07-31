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
 * The frame is a flex column (header + flex-1 body) so equal-height grid
 * rows never clip the footer links; a gentle lift rewards hover.
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
      className="row-span-5 grid grid-rows-subgrid transition-[border-color,transform] duration-150 hover:border-primary-container focus-within:border-tertiary-fixed-dim motion-safe:hover:-translate-y-0.5"
      bodyClassName="row-span-5 grid grid-rows-subgrid gap-4 p-4 md:p-6"
    >
      <h3 className="text-body-lg font-bold leading-snug text-on-surface">
        <span className="text-primary-container"># </span>
        {title}
      </h3>

      <p className="text-code-sm text-on-surface-variant">{summary}</p>

      <div className="flex flex-wrap content-start gap-1.5">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-label-caps font-bold uppercase text-secondary-fixed-dim">
          {t("changelog")}
        </p>
        <ul className="mt-2 space-y-1 text-code-sm">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden="true" className="text-primary-container">
                +
              </span>
              <span className="text-on-surface-variant">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant pt-3">
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
          <span className="text-code-sm text-on-surface-variant">
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
