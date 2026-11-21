"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { profile } from "@/data/profile";
import { pick } from "@/lib/localize";

export default function AboutContact() {
  const t = useTranslations("about");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer
      id="about"
      className="border-t border-rule-strong bg-ink text-paper"
    >
      <div className="mx-auto max-w-container-max px-4 py-20 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-12">
          {/* Portrait */}
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-paper/25 bg-paper-alt">
              <Image
                src="/fotoPerfilOficial.png"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 320px, 340px"
                className="object-cover grayscale contrast-115 transition-all duration-500 hover:grayscale-0"
              />
              <div className="absolute bottom-3 left-3 bg-mustard px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-ink">
                {pick(locale, profile.location, profile.locationEn)}
              </div>
            </div>
          </div>

          {/* Bio & Direct Contact */}
          <div className="md:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mustard">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {t("heading")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/80 md:text-lg">
              {t("bio")}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 border border-mustard/50 bg-mustard/10 px-3 py-1.5 font-mono text-xs text-mustard">
              <span className="h-1.5 w-1.5 rounded-full bg-mustard" />
              {t("availability")}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-mustard px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-paper"
              >
                {profile.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 border border-paper/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-mustard hover:text-mustard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-mustard" />
                    {t("copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {t("copyEmail")}
                  </>
                )}
              </button>

              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-mustard hover:text-mustard"
              >
                {t("resume")} ↗
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-mustard hover:text-mustard"
              >
                GitHub ↗
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-mustard hover:text-mustard"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Transparent Bottom Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-8 font-mono text-xs text-paper/60">
          <span>
            © {new Date().getFullYear()} {profile.name} · {tf("rights")}
          </span>
          <a
            href={profile.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link text-paper/80 hover:text-mustard"
          >
            {tf("sourceCode")} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
