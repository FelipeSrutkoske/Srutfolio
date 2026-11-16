"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      {label ? (
        <span className="inline-block whitespace-nowrap rounded-full bg-mustard px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink shadow-md">
          {label}
        </span>
      ) : (
        <span className="block h-3 w-3 rounded-full border border-ink/70 bg-mustard/80 transition-transform duration-150" />
      )}
    </div>
  );
}
