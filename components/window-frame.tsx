import type { ReactNode } from "react";

/**
 * WindowFrame — every content block lives inside a terminal window:
 * 1px outline, header with macOS-style dots + file path, sharp corners.
 * The dots are the only circular elements in the system (DESIGN.md).
 */
function Dots() {
  return (
    <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </span>
  );
}

type WindowFrameProps = {
  /** Anchor id (also used by the shell to scroll here). */
  id?: string;
  /** Path shown in the window header, e.g. ~/portfolio/projects/api.py */
  path: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function WindowFrame({
  id,
  path,
  children,
  className = "",
  bodyClassName = "",
}: WindowFrameProps) {
  return (
    <section
      id={id}
      className={`overflow-hidden border border-outline-variant bg-surface-container-lowest transition-all duration-200 hover:border-primary-container/40 hover:shadow-[0_0_20px_rgba(57,255,20,0.07)] ${className}`}
    >
      <header className="flex items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-low px-3 py-2">
        <Dots />
        <span className="truncate text-code-sm text-on-surface-variant">
          {path}
        </span>
      </header>
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </section>
  );
}
