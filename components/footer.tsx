import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";

/**
 * Footer — the session closes: `$ exit` and a clean exit code.
 */
export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant">
      <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-2 px-4 py-6 text-code-sm text-on-surface-variant md:px-6">
        <p>
          <span className="text-primary-container">{t("exit")}</span>{" "}
          <span aria-hidden="true">{t("status")}</span>
        </p>
        <p>
          © {year} {profile.name} — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
