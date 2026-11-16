"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link, usePathname } from "@/navigation";

export default function EditorialNav({ isSubpage = false }: { isSubpage?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-lg font-extrabold uppercase tracking-tight text-ink"
        >
          SRUTKOSKE<span className="text-mustard-deep">.</span>
        </Link>

        {isSubpage ? (
          <Link
            href="/"
            className="editorial-link font-mono text-xs uppercase tracking-widest text-ink"
          >
            ← {t("backHome")}
          </Link>
        ) : (
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 font-mono text-xs uppercase tracking-widest text-ink-muted md:flex"
          >
            <a href="#works" className="editorial-link hover:text-ink">
              {t("works")}
            </a>
            <a href="#skills" className="editorial-link hover:text-ink">
              {t("stack")}
            </a>
            <a href="#experience" className="editorial-link hover:text-ink">
              {t("experience")}
            </a>
            <a href="#about" className="editorial-link hover:text-ink">
              {t("about")}
            </a>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-rule font-mono text-[11px] uppercase">
            <Link
              href={pathname}
              locale="pt"
              className={`px-2 py-1 transition-colors ${
                locale === "pt"
                  ? "bg-ink font-bold text-paper"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              PT
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`px-2 py-1 transition-colors ${
                locale === "en"
                  ? "bg-ink font-bold text-paper"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              EN
            </Link>
          </div>

          <a
            href="/Curriculo-Felipe_Srutkoske.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="PDF"
            className="inline-flex items-center gap-1 bg-mustard px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-mustard-deep"
          >
            {t("cv")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
