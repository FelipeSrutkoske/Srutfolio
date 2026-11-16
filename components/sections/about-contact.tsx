"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { profile } from "@/data/profile";

export default function AboutContact() {
  const t = useTranslations("about");
  const tf = useTranslations("footer");
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
          {/* Portrait with editorial treatment */}
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-paper/25 bg-paper-alt">
              <Image
                src="/fotoPerfilOficial.png"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 320px, 360px"
                className="object-cover grayscale contrast-125 transition-all duration-500 hover:grayscale-0"
              />
              <div className="absolute bottom-3 left-3 bg-mustard px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-ink">
                {profile.location}
              </div>
            </div>
          </div>

          {/* Bio & Direct Contact */}
          <div className="md:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mustard">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
              {t("heading")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/80 md:text-lg">
              {t("bio")}
            </p>

            <div className="mt-4 inline-block border border-mustard/50 bg-mustard/10 px-3 py-1 font-mono text-xs text-mustard">
              ● {t("availability")}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="EMAIL"
                className="inline-flex items-center gap-2 bg-mustard px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-paper"
              >
                {profile.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY"
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

        {/* Bottom Legal Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-8 font-mono text-xs uppercase tracking-widest text-paper/55">
          <span>
            © {new Date().getFullYear()} {profile.name} — {tf("rights")}
          </span>
          <span>{tf("builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
