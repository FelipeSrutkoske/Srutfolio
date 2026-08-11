"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function ProfileImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden border border-primary-container/40 bg-surface-container-high transition-colors hover:border-primary-container/70 ${className}`}
    >
      <Image
        src="/fotoPerfilOficial.png"
        alt="Felipe Srutkoske"
        fill
        sizes="(max-width: 768px) 120px, 144px"
        className="object-cover object-[center_0%] scale-[1.08] origin-top"
        priority
      />
    </div>
  );
}

export function WhoamiProfileOutput() {
  const t = useTranslations("shell.profile");
  const labels = t.raw("labels") as Record<string, string>;

  return (
    <div className="my-2 border border-primary-container/30 bg-surface-container-lowest/90 p-3 md:p-4 text-code-sm">
      <span className="sr-only">
        {t("name")} - {t("role")} ({t("location")})
      </span>

      {/* Desktop Layout: Side-by-side */}
      <div className="hidden md:flex items-start gap-6">
        <div className="flex-shrink-0 pt-0.5">
          <ProfileImage className="w-36 h-44" />
        </div>
        <div className="flex-1 space-y-2.5 pt-1">
          <div className="flex items-center gap-2 text-primary-container font-bold border-b border-outline-variant/40 pb-2">
            <span className="text-secondary-fixed-dim">[identity]</span>
            <span>whoami --summary</span>
          </div>

          <div className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-1.5 text-code-sm">
            <span className="text-on-surface-variant font-medium">{labels.name}:</span>
            <span className="text-on-surface font-semibold">{t("name")}</span>

            <span className="text-on-surface-variant font-medium">{labels.role}:</span>
            <span className="text-primary-container">{t("role")}</span>

            <span className="text-on-surface-variant font-medium">{labels.location}:</span>
            <span className="text-on-surface">{t("location")}</span>

            <span className="text-on-surface-variant font-medium">{labels.focus}:</span>
            <span className="text-tertiary-fixed-dim">{t("focus")}</span>

            <span className="text-on-surface-variant font-medium">{labels.stack}:</span>
            <span className="text-on-surface">{t("stack")}</span>

            <span className="text-on-surface-variant font-medium">{labels.status}:</span>
            <span className="text-primary-container font-medium">{t("status")}</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Stacked */}
      <div className="block md:hidden space-y-3">
        <div className="flex justify-center py-1">
          <ProfileImage className="w-28 h-36" />
        </div>
        <div className="space-y-2 border-t border-outline-variant/40 pt-2.5">
          <div className="flex items-center gap-2 text-primary-container font-bold text-code-sm">
            <span className="text-secondary-fixed-dim">[identity]</span>
            <span>whoami --summary</span>
          </div>

          <div className="space-y-1 text-code-sm">
            <div>
              <span className="text-on-surface-variant mr-2">{labels.name}:</span>
              <span className="text-on-surface font-semibold">{t("name")}</span>
            </div>
            <div>
              <span className="text-on-surface-variant mr-2">{labels.role}:</span>
              <span className="text-primary-container">{t("role")}</span>
            </div>
            <div>
              <span className="text-on-surface-variant mr-2">{labels.location}:</span>
              <span className="text-on-surface">{t("location")}</span>
            </div>
            <div>
              <span className="text-on-surface-variant mr-2">{labels.focus}:</span>
              <span className="text-tertiary-fixed-dim">{t("focus")}</span>
            </div>
            <div>
              <span className="text-on-surface-variant mr-2">{labels.stack}:</span>
              <span className="text-on-surface">{t("stack")}</span>
            </div>
            <div>
              <span className="text-on-surface-variant mr-2">{labels.status}:</span>
              <span className="text-primary-container font-medium">{t("status")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
