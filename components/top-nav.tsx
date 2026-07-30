"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";
import LanguageToggle from "./language-toggle";

const SECTIONS = [
  "whoami",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

/**
 * TopNav — fixed header with the brand and file-path tabs (desktop).
 * On mobile the tabs become a bottom-docked navigation bar (DESIGN.md).
 * Scroll-spy underlines the section currently in view.
 */
export default function TopNav() {
  const t = useTranslations();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-container-max items-center justify-between gap-4 px-4 md:px-6">
          <a
            href="#top"
            className="shrink-0 text-body-md font-bold tracking-tight text-on-surface"
          >
            root<span className="text-primary-container">@</span>portfolio
          </a>

          <nav
            aria-label={t("nav.aria")}
            className="hidden items-center gap-1 md:flex"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`border-b-2 px-2 py-1 text-code-sm transition-colors ${
                  active === id
                    ? "border-primary-container text-primary-container"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {t(`nav.paths.${id}`)}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/Curriculo_Felipe-Srutkoske.pdf"
              download="Curriculo_Felipe-Srutkoske.pdf"
              target="_blank"
              rel="noreferrer"
              className="border border-primary-container/40 bg-surface-container/80 px-2.5 py-1 text-code-sm font-medium text-primary-container transition-all hover:border-primary-container hover:bg-primary-container/10 active:scale-95"
            >
              [ {t("nav.downloadCv")} ]
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t("nav.github")}
              className="hidden text-code-sm text-on-surface-variant transition-colors hover:text-primary-container sm:inline"
            >
              {"</>"}
            </a>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Mobile: bottom-docked navigation bar. */}
      <nav
        aria-label={t("nav.aria")}
        className="fixed inset-x-0 bottom-0 z-50 flex border-t border-outline-variant bg-surface-container-lowest/95 md:hidden"
      >
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={`flex-1 px-1 py-2.5 text-center text-[11px] font-medium leading-4 transition-colors ${
              active === id ? "text-primary-container" : "text-on-surface-variant"
            }`}
          >
            {t(`nav.${id}`)}
          </a>
        ))}
      </nav>
    </>
  );
}
