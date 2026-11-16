import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { routing } from "@/i18n";
import { projects, getProjectBySlug } from "@/data/projects";
import { pick } from "@/lib/localize";
import { Link } from "@/navigation";
import EditorialNav from "@/components/editorial-nav";
import ProjectMockup from "@/components/project-mockup";
import ArchitectureDiagram from "@/components/architecture-diagram";
import AboutContact from "@/components/sections/about-contact";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

type CaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "caseStudy" });
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const highlights = pick(locale, project.highlights, project.highlightsEn);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <EditorialNav isSubpage />

      <main className="mx-auto max-w-container-max px-4 py-12 md:px-8 md:py-20">
        <Link
          href="/#works"
          className="editorial-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("back")}
        </Link>

        {/* Case Header */}
        <header className="mt-8 border-b border-rule-strong pb-10">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="inline-block bg-mustard px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-ink">
                {pick(locale, project.category, project.categoryEn)}
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-6xl">
                {pick(locale, project.title, project.titleEn)}
              </h1>
              <p className="mt-2 font-serif text-2xl italic text-ink-muted">
                {pick(locale, project.subtitle, project.subtitleEn)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-rule pt-4 font-mono text-xs md:col-span-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <div className="text-ink-muted">{t("year")}</div>
                <div className="mt-1 font-bold">{project.year}</div>
              </div>
              <div>
                <div className="text-ink-muted">{t("status")}</div>
                <div className="mt-1 font-bold">
                  {project.statusNote
                    ? pick(locale, project.statusNote, project.statusNoteEn)
                    : "Open Source"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Visual Mockup + Problem Context */}
        <section className="mt-12 grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <ProjectMockup projectId={project.id} interactiveMap />
          </div>

          <div className="space-y-6 md:col-span-6">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                {t("problemTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink md:text-lg">
                {pick(locale, project.problem, project.problemEn)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-rule-strong px-3 py-1 font-mono text-xs uppercase text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.links.repo && (
              <div className="pt-2">
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-mustard hover:text-ink"
                >
                  {t("repoCta")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Architecture Diagram */}
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {t("architectureTitle")}
          </h2>
          <div className="mt-4">
            <ArchitectureDiagram
              nodes={project.architectureNodes}
              locale={locale}
              hint={t("architectureHint")}
            />
          </div>
        </section>

        {/* Engineering Highlights */}
        <section className="mt-16 border-t border-rule-strong pt-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {t("highlightsTitle")}
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border border-rule bg-paper-alt p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mustard-deep" />
                <span className="text-sm leading-relaxed text-ink md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Next Case Study */}
        <section className="mt-20 border-t border-rule-strong pt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            {t("nextProject")}
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            data-cursor="NEXT"
            className="group mt-3 flex items-center justify-between border border-rule-strong bg-paper-alt p-6 transition-colors hover:bg-mustard"
          >
            <div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-ink sm:text-4xl">
                {pick(locale, nextProject.title, nextProject.titleEn)}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-ink-muted group-hover:text-ink">
                {pick(locale, nextProject.subtitle, nextProject.subtitleEn)}
              </p>
            </div>
            <ArrowUpRight className="h-7 w-7 shrink-0 text-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </section>
      </main>

      <AboutContact />
    </div>
  );
}
