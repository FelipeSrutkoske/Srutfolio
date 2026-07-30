"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/navigation";

/**
 * LanguageToggle — `[ EN | PT-BR ]` configuration-flag style switcher.
 * Active locale is bold green; inactive stays dim.
 */
export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("lang");

  const localeClass = (target: string) =>
    locale === target
      ? "font-bold text-primary-container"
      : "text-on-surface-variant transition-colors hover:text-on-surface";

  return (
    <div role="group" aria-label={t("aria")} className="text-code-sm">
      <span className="text-on-surface-variant">{"[ "}</span>
      <Link
        href={pathname}
        locale="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={localeClass("en")}
      >
        {t("en")}
      </Link>
      <span className="text-on-surface-variant">{" | "}</span>
      <Link
        href={pathname}
        locale="pt"
        aria-current={locale === "pt" ? "true" : undefined}
        className={localeClass("pt")}
      >
        {t("pt")}
      </Link>
      <span className="text-on-surface-variant">{" ]"}</span>
    </div>
  );
}
