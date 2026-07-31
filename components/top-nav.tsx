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
 * TopNav — fixed header with brand and file-path tabs (desktop).
 * On mobile, provides a responsive hamburger drawer menu.
 * Scroll-spy underlines the section currently in view.
 */
export default function TopNav() {
  const t = useTranslations();
  const [active, setActive] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-container-max items-center justify-between gap-4 px-4 md:px-6">
          <a
            href="#top"
            onClick={() => setIsOpen(false)}
            className="shrink-0 text-body-md font-bold tracking-tight text-on-surface"
          >
            root<span className="text-primary-container">@</span>portfolio
          </a>

          {/* Desktop navigation */}
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

          {/* Desktop right items */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <a
              href="/Curriculo-Felipe_Srutkoske.pdf"
              download="Curriculo-Felipe_Srutkoske.pdf"
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
              className="text-code-sm text-on-surface-variant transition-colors hover:text-primary-container"
            >
              {"</>"}
            </a>
            <LanguageToggle />
          </div>

          {/* Mobile right items: Language Toggle + Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="flex items-center justify-center border border-outline-variant bg-surface-container/60 p-2 text-primary-container transition-colors hover:border-primary-container focus:outline-none active:scale-95"
            >
              {isOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-14 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="relative border-b border-outline-variant bg-surface-container-lowest/98 p-5 shadow-2xl backdrop-blur-md">
            <nav aria-label={t("nav.aria")} className="flex flex-col gap-2">
              <div className="mb-1 border-b border-outline-variant/40 pb-2 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                // navigation
              </div>
              {SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className={`flex items-center gap-2 px-3 py-2.5 text-code-sm font-medium transition-colors ${
                    active === id
                      ? "border-l-2 border-primary-container bg-primary-container/10 text-primary-container"
                      : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface"
                  }`}
                >
                  <span className="text-primary-container">›</span>
                  {t(`nav.paths.${id}`)}
                </a>
              ))}

              <div className="my-2 border-b border-outline-variant/40" />

              <div className="flex flex-col gap-3 pt-1">
                <a
                  href="/Curriculo-Felipe_Srutkoske.pdf"
                  download="Curriculo-Felipe_Srutkoske.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center border border-primary-container/60 bg-surface-container-high px-4 py-2.5 text-code-sm font-medium text-primary-container transition-all hover:border-primary-container hover:bg-primary-container/20 active:scale-95"
                >
                  [ {t("nav.downloadCv")} ]
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 border border-outline-variant bg-surface-container px-4 py-2.5 text-code-sm text-on-surface-variant transition-colors hover:border-primary-container hover:text-primary-container"
                >
                  <span>{"</>"}</span>
                  <span>GitHub</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
