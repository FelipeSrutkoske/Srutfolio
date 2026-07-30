"use client";

import type { ReactNode } from "react";

import { useTypeOnView } from "@/hooks/use-type-on-view";

type TypeOnViewProps = {
  children: ReactNode;
  className?: string;
  /** Milliseconds between printed lines. */
  step?: number;
  /** Cap on the last line's delay (keeps long dumps under ~1.5s). */
  maxDelay?: number;
};

/**
 * TypeOnView — client wrapper that "types" a terminal window's lines
 * (tagged `data-tline`) once the window scrolls ~100% into view.
 * Children are still server-rendered; this only orchestrates the reveal,
 * so the full content stays in the HTML for SEO and no-JS browsers.
 */
export default function TypeOnView({
  children,
  className = "",
  step,
  maxDelay,
}: TypeOnViewProps) {
  const { ref, phase } = useTypeOnView<HTMLDivElement>({ step, maxDelay });

  return (
    <div ref={ref} data-type-phase={phase} className={className}>
      {children}
    </div>
  );
}
