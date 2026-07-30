import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";
import { pick } from "@/lib/localize";
import { Prompt, SectionHeading } from "@/components/ui";
import WindowFrame from "@/components/window-frame";

/**
 * whoami — the narrative, presented as the `cat` of a config file:
 * identity block, quote lines, and an ownership diff (red/green).
 */
export default function Whoami({ locale }: { locale: string }) {
  const t = useTranslations("whoami");
  const quotes = t.raw("quotes") as string[];

  const role = pick(locale, profile.role, profile.roleEn);
  const tagline = pick(locale, profile.tagline, profile.taglineEn);

  return (
    <section id="whoami" className="scroll-mt-20">
      <SectionHeading title={t("title")} />

      <WindowFrame
        path="~/portfolio/whoami.md"
        className="transition-colors hover:border-primary-container/40"
        bodyClassName="p-4 md:p-6"
      >
        <p className="text-code-sm text-on-surface-variant">
          <Prompt />
          <span className="text-on-surface">cat whoami.md</span>
        </p>

        <h3 className="mt-5 text-headline-lg-mobile font-bold text-on-surface md:text-headline-lg">
          {t("heading")}
        </h3>

        <p className="mt-4 max-w-3xl text-body-md text-on-surface-variant">
          {t("intro")}
        </p>

        {/* Identity quotes — left-bordered `>` lines. */}
        <div className="mt-6 space-y-1 border-l-2 border-primary-container/40 pl-4">
          {quotes.map((quote) => (
            <p key={quote} className="text-body-md text-on-surface">
              <span className="text-primary-container">{"> "}</span>
              {quote}
            </p>
          ))}
        </div>

        {/* Identity config — ini-file styling. */}
        <div className="mt-6 border border-outline-variant bg-surface-container p-4 text-code-sm transition-colors hover:border-primary-container/40">
          <p className="font-bold text-secondary-fixed-dim">
            {t("config.section")}
          </p>
          <p className="mt-1">
            <span className="text-tertiary-fixed-dim">{t("config.nameKey")}</span>
            <span className="text-on-surface-variant"> = </span>
            <span className="text-secondary-fixed-dim">
              &quot;{profile.name}&quot;
            </span>
          </p>
          <p>
            <span className="text-tertiary-fixed-dim">{t("config.roleKey")}</span>
            <span className="text-on-surface-variant"> = </span>
            <span className="text-secondary-fixed-dim">&quot;{role}&quot;</span>
          </p>
          <p>
            <span className="text-tertiary-fixed-dim">
              {t("config.focusKey")}
            </span>
            <span className="text-on-surface-variant"> = </span>
            <span className="text-secondary-fixed-dim">
              &quot;{t("config.focusValue")}&quot;
            </span>
          </p>
          <p>
            <span className="text-tertiary-fixed-dim">
              {t("config.taglineKey")}
            </span>
            <span className="text-on-surface-variant"> = </span>
            <span className="text-secondary-fixed-dim">
              &quot;{tagline}&quot;
            </span>
          </p>
        </div>

        {/* Ownership diff — red removal, green addition. */}
        <div className="mt-6 border border-outline-variant bg-surface-container p-4 text-code-sm transition-colors hover:border-primary-container/40">
          <p className="text-tertiary-fixed-dim">{t("diff.header")}</p>
          <p className="mt-1 bg-error-container/15 px-2 py-0.5 text-error">
            <span aria-hidden="true">- </span>
            {t("diff.minus")}
          </p>
          <p className="mt-0.5 bg-primary-container/10 px-2 py-0.5 text-primary-container">
            <span aria-hidden="true">+ </span>
            {t("diff.plus")}
          </p>
        </div>

        {/* System Status & Metrics — terminal stats dashboard */}
        <div className="mt-6 border border-primary-container/30 bg-surface-container/60 p-4 text-code-sm">
          <div className="flex items-center justify-between gap-4 border-b border-outline-variant/60 pb-2.5">
            <p className="flex items-center gap-2 font-bold text-primary-container">
              <span className="inline-block h-2 w-2 rounded-full bg-primary-container animate-pulse" />
              STATUS: SYSTEM_ONLINE & READY
            </p>
            <span className="text-code-xs font-mono text-on-surface-variant">env: production</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-outline-variant/50 bg-surface-container-lowest p-3 transition-colors hover:border-primary-container/40">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Atuação Principal
              </span>
              <p className="mt-1 font-bold text-secondary-fixed-dim">
                Backend & Sustentação
              </p>
            </div>

            <div className="border border-outline-variant/50 bg-surface-container-lowest p-3 transition-colors hover:border-primary-container/40">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Bancos de Dados
              </span>
              <p className="mt-1 font-bold text-tertiary-fixed-dim">
                MySQL • Oracle • Postgres
              </p>
            </div>

            <div className="border border-outline-variant/50 bg-surface-container-lowest p-3 transition-colors hover:border-primary-container/40">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Deploy & Ambientes
              </span>
              <p className="mt-1 font-bold text-primary-container">
                Linux / SSH • Docker
              </p>
            </div>

            <div className="border border-outline-variant/50 bg-surface-container-lowest p-3 transition-colors hover:border-primary-container/40">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                TCC Eng. Software
              </span>
              <p className="mt-1 font-bold text-secondary-fixed-dim">
                Nota 9.3 (Fullstack)
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-body-md text-on-surface-variant">
          {t("production")}
        </p>
      </WindowFrame>
    </section>
  );
}
