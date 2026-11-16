"use client";

import { useEffect, useState } from "react";

export default function IntroCurtain() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    try {
      if (sessionStorage.getItem("srutfolio_intro_seen") === "1") {
        return;
      }
    } catch {
      return;
    }

    setVisible(true);

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 950);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("srutfolio_intro_seen", "1");
      } catch {
        // ignore storage restrictions
      }
    }, 1500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const handleSkip = () => {
    setExiting(true);
    window.setTimeout(() => setVisible(false), 300);
    try {
      sessionStorage.setItem("srutfolio_intro_seen", "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      aria-hidden={exiting}
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:p-10 ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-paper/70">
        <span>SRUTKOSKE // 2026</span>
        <button
          type="button"
          onClick={handleSkip}
          className="border border-paper/30 px-3 py-1 text-paper transition-colors hover:border-mustard hover:text-mustard"
        >
          SKIP
        </button>
      </div>

      <div className="my-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mustard">
          GO • FULLSTACK • LINUX INFRA
        </p>
        <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl md:text-7xl">
          FELIPE SRUTKOSKE
        </h2>
      </div>

      <div className="h-[2px] w-full overflow-hidden bg-paper/15">
        <div
          className="h-full bg-mustard transition-all duration-[900ms] ease-out"
          style={{ width: exiting ? "100%" : "92%" }}
        />
      </div>
    </div>
  );
}
