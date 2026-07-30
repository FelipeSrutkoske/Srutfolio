import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { pick } from "@/lib/localize";
import { Chip, Prompt, SectionHeading } from "@/components/ui";
import TypeOnView from "@/components/type-on-view";
import WindowFrame from "@/components/window-frame";

/** Stable pseudo commit hash per position — git flavor, deterministic. */
function commitHash(index: number): string {
  return (0x9f3a2c1 - index * 0x1a2b3c).toString(16).slice(0, 7);
}

/** Graph glyph column (`*`, `|`, `|\`) — decorative, hidden from AT. */
function Glyph({
  children = "|",
  tone = "dim",
}: {
  children?: ReactNode;
  tone?: "dim" | "green" | "amber";
}) {
  const toneClass = {
    dim: "text-on-surface-variant",
    green: "text-primary-container",
    amber: "text-secondary-fixed-dim",
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={`inline-block w-6 shrink-0 select-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

/**
 * Experience — `git log --graph`. Each role is a commit: hash, author,
 * date, message (role @ company), body (summary + stack chips).
 * The transition into fullstack is marked as an amber merge (DESIGN.md).
 */
export default function Experience({ locale }: { locale: string }) {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="scroll-mt-20">
      <SectionHeading title={t("title")} description={t("description")} />

      {/* Types out line-by-line once the window is ~100% in view. */}
      <TypeOnView step={24} maxDelay={900}>
        <WindowFrame
          path={t("windowPath")}
          className="transition-colors hover:border-primary-container/40"
          bodyClassName="p-4 md:p-6"
        >
          <p data-tline="" className="text-code-sm text-on-surface-variant">
            <Prompt />
            <span className="text-on-surface">{t("cmd")}</span>
          </p>

          <ol className="mt-4 text-code-sm">
            {experiences.map((entry, index) => {
              const role = pick(locale, entry.role, entry.roleEn);
              const company = pick(locale, entry.company, entry.companyEn);
              const period = pick(locale, entry.period, entry.periodEn);
              const summary = pick(locale, entry.summary, entry.summaryEn);
              const isHead = index === 0;
              const isLast = index === experiences.length - 1;

              return (
                <li key={`${entry.company}-${entry.period}`}>
                  {/* commit line */}
                  <div data-tline="" className="flex gap-2">
                    <Glyph tone="green">*</Glyph>
                    <p>
                      <span className="text-on-surface">commit </span>
                      <span className="text-secondary-fixed-dim">
                        {commitHash(index)}
                      </span>
                      {isHead ? (
                        <span className="text-tertiary-fixed-dim">
                          {" "}
                          {t("head")}
                        </span>
                      ) : null}
                    </p>
                  </div>

                  {/* author / date */}
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                    <p className="text-on-surface-variant">
                      {t("author")} {profile.name} &lt;{profile.email}&gt;
                    </p>
                  </div>
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                    <p className="text-on-surface-variant">
                      {t("date")} {period}
                    </p>
                  </div>
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                  </div>

                  {/* message */}
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                    <p className="font-bold text-on-surface">
                      {role} <span className="text-tertiary-fixed-dim">@</span>{" "}
                      {company}
                    </p>
                  </div>
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                    <p className="max-w-2xl text-on-surface-variant">
                      {summary}
                    </p>
                  </div>
                  <div data-tline="" className="flex gap-2">
                    <Glyph />
                    <div className="flex flex-wrap gap-1.5 py-1">
                      {entry.stack.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                  </div>

                  {!isLast ? (
                    <>
                      <div data-tline="" className="flex gap-2">
                        <Glyph />
                      </div>
                      {/* Amber merge point: production ops merged into main. */}
                      <div data-tline="" className="flex gap-2">
                        <Glyph tone="amber">|\</Glyph>
                        <p className="text-secondary-fixed-dim">{t("merge")}</p>
                      </div>
                      <div data-tline="" className="flex gap-2">
                        <Glyph tone="amber">|/</Glyph>
                      </div>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </WindowFrame>
      </TypeOnView>
    </section>
  );
}
