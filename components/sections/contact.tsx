import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";
import { FlagLink, Prompt, SectionHeading } from "@/components/ui";
import TypeOnView from "@/components/type-on-view";
import WindowFrame from "@/components/window-frame";

function ContactLine({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const t = useTranslations("contact");

  return (
    <p
      data-tline=""
      className="flex flex-wrap items-baseline gap-x-2 text-code-sm"
    >
      <span className="text-primary-container">{t("ok")}</span>
      <span className="inline-block w-20 text-on-surface-variant">{label}</span>
      <span aria-hidden="true" className="text-on-surface-variant">
        →
      </span>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="break-all text-tertiary-fixed-dim underline decoration-outline-variant underline-offset-4 transition-colors hover:text-tertiary-fixed hover:decoration-primary-container"
      >
        {value}
      </a>
    </p>
  );
}

/**
 * Contact — terminal output: open channels as `[OK]` log lines with
 * cyan links, plus CLI-flag buttons for each channel.
 */
export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-20">
      <SectionHeading title={t("title")} description={t("description")} />

      {/* Types out line-by-line once the window is ~100% in view. */}
      <TypeOnView step={40} maxDelay={400}>
        <WindowFrame
          path={t("windowPath")}
          className="transition-colors hover:border-primary-container/40"
          bodyClassName="p-4 md:p-6"
        >
          <p data-tline="" className="text-code-sm text-on-surface-variant">
            <Prompt />
            <span className="text-on-surface">{t("cmd")}</span>
          </p>

          <div className="mt-4 space-y-1">
            <ContactLine
              label={t("emailLabel")}
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactLine
              label={t("githubLabel")}
              value={profile.githubUrl.replace(/^https?:\/\//, "")}
              href={profile.githubUrl}
              external
            />
            <ContactLine
              label={t("linkedinLabel")}
              value={profile.linkedinUrl.replace(/^https?:\/\//, "")}
              href={profile.linkedinUrl}
              external
            />
          </div>

          <p
            data-tline=""
            className="mt-6 text-body-md text-on-surface-variant"
          >
            <span className="text-primary-container"># </span>
            {t("cta")}
          </p>

          <div data-tline="" className="mt-4 flex flex-wrap gap-2">
            <FlagLink href={`mailto:${profile.email}`}>
              {t("flags.email")}
            </FlagLink>
            <FlagLink href={profile.githubUrl} external>
              {t("flags.github")}
            </FlagLink>
            <FlagLink href={profile.linkedinUrl} external>
              {t("flags.linkedin")}
            </FlagLink>
          </div>
        </WindowFrame>
      </TypeOnView>
    </section>
  );
}
