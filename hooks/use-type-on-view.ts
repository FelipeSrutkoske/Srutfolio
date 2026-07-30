import { useEffect, useRef, useState } from "react";

/**
 * "armed"  — SSR default: lines are hidden by CSS only when scripting is
 *            enabled and motion is allowed (see globals.css), so the HTML
 *            still carries the full content for SEO / no-JS.
 * "play"   — the window scrolled ~100% into view: lines print with their
 *            pre-assigned stagger delays.
 * "static" — reduced motion, no IntersectionObserver, or cancelled (the
 *            user already interacted): everything renders instantly.
 */
export type TypePhase = "armed" | "play" | "static";

type UseTypeOnViewOptions = {
  /** Milliseconds between printed lines. */
  step?: number;
  /** Cap on the last line's delay, so long dumps stay under ~1.5s total. */
  maxDelay?: number;
  /** Set false to cancel the reveal (e.g. the user already ran a command). */
  active?: boolean;
};

/**
 * useTypeOnView — scroll-triggered "typing" reveal for terminal windows.
 *
 * Tags lines with `data-tline`; when the observed window is ~100% visible
 * the phase flips to "play" exactly once and CSS prints each line with the
 * inline delay assigned here (document order). Reduced motion and no-JS
 * render everything instantly — the hiding itself is gated in CSS on
 * `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`.
 */
export function useTypeOnView<T extends HTMLElement = HTMLDivElement>({
  step = 26,
  maxDelay = 1100,
  active = true,
}: UseTypeOnViewOptions = {}) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<TypePhase>("armed");

  useEffect(() => {
    const root = ref.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!active || !root || reduce || !("IntersectionObserver" in window)) {
      setPhase("static");
      return;
    }

    // Assign the stagger up front (document order) so "play" is a single flip.
    root.querySelectorAll<HTMLElement>("[data-tline]").forEach((el, i) => {
      el.style.animationDelay = `${Math.min(i * step, maxDelay)}ms`;
    });

    // A window taller than the viewport can never reach ratio 1.0 —
    // fire at the best visibility it can realistically achieve instead.
    const { height } = root.getBoundingClientRect();
    const target =
      height <= window.innerHeight
        ? 0.99
        : Math.max(0.4, (window.innerHeight - 24) / height);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= target) {
            setPhase("play");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: [target] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [active, step, maxDelay]);

  return { ref, phase };
}
