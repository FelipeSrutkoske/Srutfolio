"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { profile } from "@/data/profile";
import { Link, usePathname } from "@/navigation";

export default function EditorialNav({ isSubpage = false }: { isSubpage?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "#works", label: t("works") },
    { href: "#production", label: t("production") },
    { href: "#skills", label: t("stack") },
    { href: "#about", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-base font-bold uppercase tracking-tight text-ink sm:text-lg"
        >
          SRUTKOSKE<span className="text-mustard-deep">.</span>
        </Link>

        {isSubpage ? (
          <Link
            href="/"
            className="editorial-link font-mono text-xs uppercase tracking-wider text-ink"
          >
            ← {t("backHome")}
          </Link>
        ) : (
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 font-mono text-xs uppercase tracking-wider text-ink-muted md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="editorial-link hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2.5 sm:gap-3">
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
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-mustard px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {t("cv")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {!isSubpage && (
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("close") : t("menu")}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center border border-rule p-1.5 text-ink md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {!isSubpage && mobileOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-rule bg-paper px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-ink">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule/60 pb-2.5 last:border-b-0 last:pb-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
