import { useTranslations } from "next-intl";

import { skills } from "@/data/skills";
import { pick } from "@/lib/localize";
import { SectionHeading } from "@/components/ui";
import WindowFrame from "@/components/window-frame";

/** ASCII load bar: `[████████░░░░]` — block characters filled = round(level / 10). */
function loadBar(percent: number): string {
  const filled = Math.round(percent / 10);
  return `[${"█".repeat(filled)}${"░".repeat(10 - filled)}]`;
}

function getSkillColorClass(level: number): string {
  if (level >= 80) return "text-primary-container";
  if (level >= 50) return "text-secondary-fixed-dim";
  return "text-error";
}

/**
 * Skills — htop-style process table. Each category is a process group
 * (amber header); each skill is a running process whose CPU% and ASCII
 * block load bar come straight from its real `level` (0-100) in data/skills.ts.
 */
export default function Skills({ locale }: { locale: string }) {
  const t = useTranslations("skills");
  const total = skills.reduce((acc, category) => acc + category.items.length, 0);

  let pidCounter = 18420;

  return (
    <section id="skills" className="scroll-mt-20">
      <SectionHeading title={t("title")} description={t("description")} />

      <WindowFrame
        path={t("windowPath")}
        className="transition-colors hover:border-primary-container/40"
        bodyClassName="p-4 md:p-6"
      >
        {/* htop summary line */}
        <div className="mb-2 flex items-center justify-between gap-4 border-b border-outline-variant pb-2 text-code-sm text-on-surface-variant">
          <span>{t("tasks", { count: total })}</span>
          <span className="hidden sm:inline">{t("load")}</span>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-[1fr_3rem_6.5rem] gap-2 px-2 py-1 text-label-caps font-bold uppercase text-on-surface-variant sm:grid-cols-[4rem_1fr_3.5rem_7.5rem_4.5rem]">
          <span className="hidden sm:inline">{t("headers.pid")}</span>
          <span>{t("headers.process")}</span>
          <span className="text-right sm:text-left">{t("headers.cpu")}</span>
          <span>{t("headers.bar")}</span>
          <span className="hidden sm:inline">{t("headers.status")}</span>
        </div>

        {skills.map((category) => (
          <div key={category.category} className="mt-1">
            <p className="bg-surface-container px-2 py-1 text-code-sm font-bold text-secondary-fixed-dim">
              {"## "}
              {pick(locale, category.category, category.categoryEn)}
            </p>
            {category.items.map((item) => {
              const pid = pidCounter++;
              const level = item.level;
              const colorClass = getSkillColorClass(level);
              return (
                <div
                  key={item.name}
                  className="grid grid-cols-[1fr_3rem_6.5rem] items-baseline gap-2 border-b border-outline-variant/40 px-2 py-1 text-code-sm transition-colors hover:bg-surface-container sm:grid-cols-[4rem_1fr_3.5rem_7.5rem_4.5rem]"
                >
                  <span className="hidden text-on-surface-variant sm:inline">
                    {pid}
                  </span>
                  <span className="truncate text-on-surface">{item.name}</span>
                  <span className={`text-right sm:text-left ${colorClass}`}>
                    {level}%
                  </span>
                  <span aria-hidden="true" className={colorClass}>
                    {loadBar(level)}
                  </span>
                  <span className={`hidden sm:inline ${colorClass}`}>
                    {t("running")}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </WindowFrame>
    </section>
  );
}
