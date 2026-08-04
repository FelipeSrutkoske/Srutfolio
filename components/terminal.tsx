"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { KeyboardEvent } from "react";

import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useTypeOnView } from "@/hooks/use-type-on-view";
import { Prompt } from "./ui";

type Tone = "default" | "dim" | "green" | "amber" | "cyan" | "red";

type Seg = { text: string; tone?: Tone; href?: string };
type OutLine = { segments: Seg[] };
type Entry =
  | { id: number; kind: "cmd"; text: string }
  | { id: number; kind: "out"; lines: OutLine[] };

export const COMMANDS = [
  "whoami",
  "projects",
  "skills",
  "experience",
  "contact",
  "cv",
  "help",
  "clear",
  "sudo",
] as const;

type Command = (typeof COMMANDS)[number];

const SECTION_COMMANDS: readonly string[] = [
  "whoami",
  "projects",
  "skills",
  "experience",
  "contact",
];

const TONE_CLASS: Record<Tone, string> = {
  default: "text-on-surface",
  dim: "text-on-surface-variant",
  green: "text-primary-container",
  amber: "text-secondary-fixed-dim",
  cyan: "text-tertiary-fixed-dim",
  red: "text-error",
};

const seg = (text: string, tone: Tone = "default", href?: string): Seg => ({
  text,
  tone,
  href,
});
const line = (...segments: Seg[]): OutLine => ({ segments });
const textLine = (text: string, tone: Tone = "default"): OutLine =>
  line(seg(text, tone));

/**
 * Terminal — the interactive shell.
 * Desktop: fully typeable (history with arrows, Tab autocomplete, Ctrl+L/C).
 * Mobile: the same commands are rendered as clickable chips.
 * Section commands print a short log and scroll to the matching section.
 */
export default function Terminal() {
  const t = useTranslations();

  const stackLine = useMemo(
    () =>
      skills
        .flatMap((category) => category.items.map((skill) => skill.name))
        .slice(0, 6)
        .join(", "),
    [],
  );

  const buildSeed = useCallback((): Entry[] => {
    const quotes = t.raw("whoami.quotes") as string[];
    return [
      { id: 1, kind: "cmd", text: t("hero.seed.whoamiCmd") },
      {
        id: 2,
        kind: "out",
        lines: quotes.map((quote) => textLine(`> ${quote}`, "green")),
      },
      { id: 3, kind: "cmd", text: t("hero.seed.introCmd") },
      {
        id: 4,
        kind: "out",
        lines: [
          textLine(t("hero.seed.introText")),
          line(
            seg("[ ", "dim"),
            seg(`${t("hero.seed.stackLabel")}: ${stackLine}`, "cyan"),
            seg(" ]", "dim"),
          ),
        ],
      },
    ];
  }, [t, stackLine]);

  const [entries, setEntries] = useState<Entry[]>(buildSeed);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  // Once the user runs anything, the seed reveal must not fire/re-fire.
  const [interacted, setInteracted] = useState(false);

  // Seed output "prints" line-by-line once the shell is ~100% in view.
  const { ref: shellRef, phase: seedPhase } = useTypeOnView<HTMLDivElement>({
    step: 45,
    maxDelay: 360,
    active: !interacted,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(100);

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const navigate = useCallback(
    (sectionId: string) => {
      const run = () =>
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      if (reducedMotion) run();
      else window.setTimeout(run, 500);
    },
    [reducedMotion],
  );

  const buildOutput = useCallback(
    (command: Command): OutLine[] => {
      const navigating = textLine(
        t("shell.navigating", { section: command }),
        "dim",
      );

      switch (command) {
        case "whoami": {
          const quotes = t.raw("whoami.quotes") as string[];
          return [
            textLine(t("shell.output.whoamiOpen"), "dim"),
            ...quotes.map((quote) => textLine(`> ${quote}`, "green")),
            navigating,
          ];
        }
        case "projects":
          return [
            textLine(
              t("shell.output.projectsFound", { count: projects.length }),
              "green",
            ),
            ...projects.map((project) =>
              textLine(`  ${project.id}`, "dim"),
            ),
            navigating,
          ];
        case "skills":
          return [
            textLine(
              t("shell.output.skillsFound", {
                count: skills.reduce((acc, c) => acc + c.items.length, 0),
              }),
              "green",
            ),
            navigating,
          ];
        case "experience":
          return [
            textLine(
              t("shell.output.experienceFound", {
                count: experiences.length,
              }),
              "green",
            ),
            navigating,
          ];
        case "contact":
          return [
            textLine(t("shell.output.contactOpen"), "dim"),
            line(
              seg(`${t("contact.ok")} `, "green"),
              seg(`${t("contact.emailLabel").padEnd(9)} → `, "dim"),
              seg(profile.email, "cyan", `mailto:${profile.email}`),
            ),
            line(
              seg(`${t("contact.ok")} `, "green"),
              seg(`${t("contact.githubLabel").padEnd(9)} → `, "dim"),
              seg(
                profile.githubUrl.replace(/^https?:\/\//, ""),
                "cyan",
                profile.githubUrl,
              ),
            ),
            line(
              seg(`${t("contact.ok")} `, "green"),
              seg(`${t("contact.linkedinLabel").padEnd(9)} → `, "dim"),
              seg(
                profile.linkedinUrl.replace(/^https?:\/\//, ""),
                "cyan",
                profile.linkedinUrl,
              ),
            ),
            navigating,
          ];
        case "cv": {
          if (typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = "/Curriculo-Felipe_Srutkoske.pdf";
            link.download = "Curriculo-Felipe_Srutkoske.pdf";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          return [
            textLine("[ok] baixando Curriculo-Felipe_Srutkoske.pdf...", "green"),
            textLine("→ arquivo salvo ou aberto no seu navegador.", "cyan"),
          ];
        }
        case "help":
          return [
            textLine(t("shell.helpText")),
            ...COMMANDS.map((cmd) =>
              line(
                seg(`  ${cmd.padEnd(12)}`, "green"),
                seg(t(`shell.commandHelp.${cmd}`), "dim"),
              ),
            ),
          ];
        case "sudo":
          return [textLine(t("shell.sudo"), "amber")];
        case "clear":
          return [];
      }
    },
    [t],
  );

  const runCommand = useCallback(
    (rawInput: string) => {
      setInteracted(true);
      const raw = rawInput.trim();
      if (!raw) {
        setEntries((prev) => [
          ...prev,
          { id: ++idRef.current, kind: "cmd", text: "" },
        ]);
        return;
      }

      setHistory((prev) => [...prev, raw]);
      setHistoryIdx(null);

      const command = raw.split(/\s+/)[0].toLowerCase();
      const echo: Entry = { id: ++idRef.current, kind: "cmd", text: raw };

      if (command === "clear") {
        setEntries([]);
        return;
      }

      let lines: OutLine[];
      if ((COMMANDS as readonly string[]).includes(command)) {
        lines = buildOutput(command as Command);
      } else {
        lines = [
          textLine(`bash: ${command}: ${t("shell.notFound")}`, "red"),
          textLine(t("shell.unknown"), "dim"),
        ];
      }

      setEntries((prev) => [
        ...prev,
        echo,
        { id: ++idRef.current, kind: "out", lines },
      ]);

      if (SECTION_COMMANDS.includes(command)) navigate(command);
    },
    [buildOutput, navigate, t],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      runCommand(value);
      setValue("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const idx =
        historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setValue(history[idx]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIdx === null) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(idx);
        setValue(history[idx]);
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const fragment = value.trim().toLowerCase();
      if (!fragment) return;
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(fragment));
      if (matches.length === 1) {
        setValue(matches[0]);
      } else if (matches.length > 1) {
        setEntries((prev) => [
          ...prev,
          { id: ++idRef.current, kind: "cmd", text: value },
          {
            id: ++idRef.current,
            kind: "out",
            lines: [
              line(
                seg(`${t("shell.candidates")} `, "dim"),
                seg(matches.join("  "), "cyan"),
              ),
            ],
          },
        ]);
      }
      return;
    }

    if (event.key === "Escape") {
      // Returns Tab navigation to the rest of the page (a11y).
      event.currentTarget.blur();
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setInteracted(true);
      setEntries([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      setInteracted(true);
      setEntries((prev) => [
        ...prev,
        { id: ++idRef.current, kind: "cmd", text: `${value}^C` },
      ]);
      setValue("");
    }
  };

  const cursor = (
    <span
      className={`ml-0.5 inline-block h-[1.1em] w-[0.62em] translate-y-[0.18em] ${
        focused
          ? "cursor-blink bg-primary-container"
          : "border border-primary-container/60"
      }`}
    />
  );

  return (
    <div ref={shellRef} data-type-phase={seedPhase}>
      {/* Log + active prompt. Clicking anywhere focuses the input. */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        onClick={() => inputRef.current?.focus()}
        className="max-h-[58vh] min-h-[320px] cursor-text space-y-1 overflow-y-auto text-code-sm md:max-h-[480px] md:min-h-[420px] md:text-body-md"
      >
        {entries.map((entry) =>
          entry.kind === "cmd" ? (
            // Seed entries (ids < 100) print via the scroll-triggered reveal;
            // anything the user typed keeps the instant term-line animation.
            <div
              key={entry.id}
              {...(entry.id < 100 ? { "data-tline": "" } : {})}
              className={entry.id < 100 ? "pt-2" : "term-line pt-2"}
            >
              <Prompt />
              <span className="text-on-surface">{entry.text}</span>
            </div>
          ) : (
            <div key={entry.id} className="pb-1">
              {entry.lines.map((outLine, lineIdx) => (
                <div
                  key={lineIdx}
                  {...(entry.id < 100 ? { "data-tline": "" } : {})}
                  className={
                    entry.id < 100
                      ? "whitespace-pre-wrap break-words py-0.5"
                      : "term-line whitespace-pre-wrap break-words py-0.5"
                  }
                  style={
                    entry.id < 100
                      ? undefined
                      : {
                          animationDelay: reducedMotion
                            ? "0ms"
                            : `${Math.min(lineIdx * 45, 360)}ms`,
                        }
                  }
                >
                  {outLine.segments.map((segment, segIdx) =>
                    segment.href ? (
                      <a
                        key={segIdx}
                        href={segment.href}
                        className={`${TONE_CLASS[segment.tone ?? "default"]} underline decoration-outline-variant underline-offset-4 hover:decoration-primary-container`}
                      >
                        {segment.text}
                      </a>
                    ) : (
                      <span
                        key={segIdx}
                        className={TONE_CLASS[segment.tone ?? "default"]}
                      >
                        {segment.text}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          ),
        )}

        {/* Active prompt — desktop only (mobile uses the chips below). */}
        <div className="hidden items-baseline pt-2 md:flex">
          <label htmlFor="terminal-input" className="sr-only">
            {t("shell.ariaInput")}
          </label>
          <Prompt />
          <span className="relative min-w-0 flex-1">
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={256}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full bg-transparent text-transparent caret-transparent outline-none"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre text-on-surface"
            >
              {value === "" ? (
                <>
                  {cursor}
                  <span className="text-on-surface-variant/60">
                    {t("shell.placeholder")}
                  </span>
                </>
              ) : (
                <>
                  {value}
                  {cursor}
                </>
              )}
            </span>
          </span>
        </div>
      </div>

      {/* Mobile: the same commands as clickable chips. */}
      <div className="mt-4 md:hidden">
        <p className="mb-2 text-label-caps font-bold uppercase text-on-surface-variant">
          {t("shell.tapLabel")}
        </p>
        <div className="flex flex-wrap gap-2">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => runCommand(cmd)}
              className="border border-outline-variant px-2 py-1 text-code-sm text-tertiary-fixed-dim transition-colors hover:border-primary-container hover:text-primary-container active:bg-surface-container"
            >
              {"[ "}
              {cmd}
              {" ]"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
