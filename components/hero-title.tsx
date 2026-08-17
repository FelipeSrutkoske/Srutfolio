"use client";

import { useCallback, useEffect, useState } from "react";

import FuzzyText from "@/components/fuzzy-text";
import { profile } from "@/data/profile";

const TITLE = `${profile.name} — Fullstack Developer`;
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()-_+=/[]{};:<>.,0123456789";
const FONT_SIZE = "clamp(2.5rem, 6vw, 3rem)";

type Phase = "locked" | "decrypting" | "open";

function scramble(original: string, revealedCount: number) {
  return original
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < revealedCount) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? char;
    })
    .join("");
}

export default function HeroTitle() {
  const [phase, setPhase] = useState<Phase>("locked");
  const [revealed, setRevealed] = useState(0);
  const [display, setDisplay] = useState(() => scramble(TITLE, 0));

  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (phase !== "locked" || reducedMotion) return;
    const id = setInterval(() => setDisplay(scramble(TITLE, 0)), 110);
    return () => clearInterval(id);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "decrypting" || reducedMotion) return;
    const id = setInterval(() => {
      setRevealed((prev) => {
        const next = Math.min(prev + 1, TITLE.length);
        setDisplay(scramble(TITLE, next));
        if (next >= TITLE.length) setPhase("open");
        return next;
      });
    }, 45);
    return () => clearInterval(id);
  }, [phase, reducedMotion]);

  const handleClick = useCallback(() => {
    if (phase !== "locked") return;
    if (reducedMotion) {
      setDisplay(TITLE);
      setPhase("open");
      return;
    }
    setPhase("decrypting");
  }, [phase, reducedMotion]);

  if (phase === "decrypting") {
    return (
      <p
        onClick={handleClick}
        className="mb-6 flex min-h-20 cursor-pointer select-none items-center justify-center text-4xl font-bold tracking-tight md:min-h-24 md:text-5xl"
      >
        {display.split("").map((char, i) => (
          <span key={i} className={i < revealed ? "text-primary-container" : "text-on-surface"}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
    );
  }

  const locked = phase === "locked";

  return (
    <div
      onClick={handleClick}
      className="mb-6 flex min-h-20 cursor-pointer select-none items-center justify-center md:min-h-24"
      title={locked ? "click to decrypt" : undefined}
    >
      <FuzzyText
        fontSize={FONT_SIZE}
        fontWeight={700}
        fontFamily="inherit"
        color={locked ? "#e0e4dc" : "#39ff14"}
        baseIntensity={reducedMotion ? 0 : locked ? 0.27 : 0.25}
        hoverIntensity={reducedMotion ? 0 : locked ? 0.1 : 0.05}
        fuzzRange={locked ? 34 : 22}
        clickEffect={!reducedMotion}
        transitionDuration={6}
      >
        {display}
      </FuzzyText>
    </div>
  );
}
