"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { COMMANDS } from "./terminal";

/**
 * HelpPanel — the floating `[ ? ]` chrome control on the shell window.
 * Expands into a bracketed command cheatsheet that overlays the terminal.
 * Informational only (the desktop prompt and the mobile chips execute
 * the commands). Collapses on Escape, outside click, or re-toggling.
 */
export default function HelpPanel({ className = "" }: { className?: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t("shell.helpAria")}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-6 w-6 items-center justify-center border bg-surface-container-low text-code-sm font-bold transition-colors ${
          open
            ? "border-primary-container text-primary-container"
            : "border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary-container"
        }`}
      >
        ?
      </button>

      {/* The panel has no focusable children, so toggling visibility is
          safe for keyboard/AT users — nothing can tab into it while closed. */}
      <div
        id={panelId}
        aria-hidden={!open}
        className={`absolute right-0 top-[calc(100%+8px)] z-30 w-72 max-w-[calc(100vw-3rem)] border border-outline-variant bg-surface-container-lowest text-code-sm transition-all duration-150 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 pointer-events-none opacity-0"
        }`}
      >
        <p className="border-b border-outline-variant bg-surface-container-low px-3 py-2">
          <span className="font-bold text-primary-container">$ </span>
          <span className="text-on-surface">help</span>
        </p>

        <ul className="max-h-[55vh] overflow-y-auto px-3 py-2">
          {COMMANDS.map((cmd) => (
            <li key={cmd} className="grid grid-cols-[5.5rem_1fr] gap-2 py-0.5">
              <span className="text-primary-container">{cmd}</span>
              <span className="text-on-surface-variant">
                {t(`shell.commandHelp.${cmd}`)}
              </span>
            </li>
          ))}
        </ul>

        <p className="border-t border-outline-variant px-3 py-1.5 text-label-caps uppercase text-on-surface-variant">
          [ esc ]
        </p>
      </div>
    </div>
  );
}
