import type { ReactNode } from "react";

/**
 * Chip — technology tag in the `[ React ]` bracket style (DESIGN.md).
 * Brackets stay dim; the tag itself is cyan (tertiary = links/tags).
 * Hover warms the outline toward phosphor green.
 */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap border border-outline-variant px-1.5 py-0.5 text-[12px] leading-4 transition-colors hover:border-primary-container/60">
      <span className="text-on-surface-variant">{"[ "}</span>
      <span className="text-tertiary-fixed-dim">{children}</span>
      <span className="text-on-surface-variant">{" ]"}</span>
    </span>
  );
}

/**
 * FlagLink — button styled as a CLI flag (e.g. `--view-demo`).
 * Hover inverts: primary background, neutral text (DESIGN.md).
 */
type FlagLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export function FlagLink({ href, children, external = false }: FlagLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-block border border-outline-variant px-3 py-1.5 text-code-sm font-medium text-on-surface transition-colors hover:border-primary-container hover:bg-primary-container hover:text-on-primary-container"
    >
      {children}
    </a>
  );
}

/**
 * SectionHeading — section titles use comment styling (`## title`),
 * hierarchy through weight and rhythm, not font variety.
 * `reveal-on-scroll` is a pure-CSS, progressively enhanced fade/slide
 * (see globals.css); unsupported browsers render it statically.
 */
export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="reveal-on-scroll mb-6 md:mb-8">
      <h2 className="text-headline-md font-bold text-on-surface md:text-headline-lg">
        <span className="text-primary-container">## </span>
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Shell prompt fragment reused across sections: `visitor@portfolio:~$` */
export function Prompt() {
  return (
    <span aria-hidden="true">
      <span className="font-bold text-primary-container">
        felipesrutkoske@portfolio
      </span>
      <span className="text-on-surface-variant">:</span>
      <span className="text-tertiary-fixed-dim">~</span>
      <span className="text-on-surface-variant">$ </span>
    </span>
  );
}
