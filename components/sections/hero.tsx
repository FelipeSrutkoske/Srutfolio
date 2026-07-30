import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";
import Terminal from "@/components/terminal";
import HelpPanel from "@/components/help-panel";
import WindowFrame from "@/components/window-frame";

/**
 * Hero — the interactive shell. Occupies the first fold:
 * a large terminal window with seeded output and a live prompt.
 * The `[ ? ]` control floats on the window chrome and expands into
 * the command cheatsheet (overlaid, not part of the window flow).
 */
export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section id="top" className="pb-16 pt-20 md:pb-24 md:pt-24">
      <h1 className="sr-only">
        {locale === "en" ? (profile.roleEn ?? profile.role) : profile.role} —{" "}
        {profile.name}
      </h1>

      <div className="relative">
        <WindowFrame
          path={t("windowPath")}
          className="transition-colors hover:border-primary-container/40"
          bodyClassName="scanlines p-4 md:p-6"
        >
          <Terminal />
        </WindowFrame>
        <HelpPanel className="absolute right-3 top-1.5 z-20" />
      </div>

      <p className="mt-4 text-center text-code-sm text-on-surface-variant">
        <span className="text-primary-container">$</span> {t("hint")}
      </p>
    </section>
  );
}
