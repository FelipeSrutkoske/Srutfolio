import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { routing } from "@/i18n";
import { projects, getProjectBySlug } from "@/data/projects";
import { pick } from "@/lib/localize";
import { Link } from "@/navigation";
import EditorialNav from "@/components/editorial-nav";
import ProjectBlueprint from "@/components/project-blueprint";
import ArchitectureDiagram from "@/components/architecture-diagram";
import CopyCommand from "@/components/copy-command";
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

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  const title = `${pick(locale, project.title, project.titleEn)} — ${pick(
    locale,
    project.category,
    project.categoryEn
  )}`;
  const description = pick(locale, project.summary, project.summaryEn);
  const path = `/${locale}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        pt: `/pt/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (slug === "skypass-enterprise") {
    redirect(`/${locale}#production`);
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "caseStudy" });
  const tw = await getTranslations({ locale, namespace: "works" });
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const highlights = pick(locale, project.highlights, project.highlightsEn);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <EditorialNav isSubpage />

      <main className="mx-auto max-w-container-max px-4 py-12 md:px-8 md:py-16">
        <Link
          href="/#works"
          className="editorial-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-ink"
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
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
                {pick(locale, project.title, project.titleEn)}
              </h1>
              <p className="mt-2 text-lg text-ink-muted sm:text-xl">
                {pick(locale, project.subtitle, project.subtitleEn)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-rule pt-4 font-mono text-xs md:col-span-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <div className="text-ink-muted">{t("year")}</div>
                <div className="mt-1 font-bold text-ink">{project.year}</div>
              </div>
              <div>
                <div className="text-ink-muted">{t("source")}</div>
                <div className="mt-1 font-bold text-ink">Open Source</div>
              </div>
              <div className="col-span-2 border-t border-rule pt-3">
                <div className="text-ink-muted">{t("role")}</div>
                <div className="mt-1 font-sans text-xs font-medium text-ink">
                  {pick(locale, project.role, project.roleEn)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Blueprint + Problem Context */}
        <section className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProjectBlueprint projectId={project.id} />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard-deep">
                {t("problemTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink">
                {pick(locale, project.problem, project.problemEn)}
              </p>
            </div>

            {project.installCommand && (
              <CopyCommand
                command={project.installCommand}
                copyLabel={tw("copyCmd")}
                copiedLabel={tw("copiedCmd")}
              />
            )}

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-rule-strong bg-paper-alt/60 px-2.5 py-1 font-mono text-xs text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-1">
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-mustard hover:text-ink"
              >
                {t("repoCta")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Layered Architecture */}
        <section className="mt-16">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard-deep">
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

        {/* Technical Decisions & Trade-offs */}
        <section className="mt-16 border-t border-rule-strong pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard-deep">
            {t("decisionsTitle")}
          </h2>

          <div className="mt-6 space-y-4">
            {project.decisions.map((item, idx) => (
              <article
                key={item.decision}
                className="grid gap-5 border border-rule-strong bg-paper-alt p-5 md:grid-cols-12 md:p-6"
              >
                <div className="md:col-span-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    {t("decisionLabel")} 0{idx + 1}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink">
                    {pick(locale, item.decision, item.decisionEn)}
                  </h3>
                </div>

                <div className="border-t border-rule pt-3 md:col-span-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-mustard-deep">
                    {t("rationaleLabel")}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">
                    {pick(locale, item.rationale, item.rationaleEn)}
                  </p>
                </div>

                <div className="border-t border-rule pt-3 md:col-span-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    {t("tradeoffLabel")}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {pick(locale, item.tradeoff, item.tradeoffEn)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Delivery Scope */}
        <section className="mt-16 border-t border-rule-strong pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard-deep">
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
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            {t("nextProject")}
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-3 flex items-center justify-between border border-rule-strong bg-paper-alt p-6 transition-colors hover:bg-mustard"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {pick(locale, nextProject.title, nextProject.titleEn)}
              </h3>
              <p className="mt-1 text-base text-ink-muted group-hover:text-ink">
                {pick(locale, nextProject.subtitle, nextProject.subtitleEn)}
              </p>
            </div>
            <ArrowUpRight className="h-7 w-7 shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>
      </main>

      <AboutContact />
    </div>
  );
}
