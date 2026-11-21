import type { Config } from "tailwindcss";

/**
 * Editorial Engineering — Tailwind theme tokens.
 * Warm archival paper + charcoal ink + editorial mustard accent.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F2ED",
        "paper-alt": "#EAE7DF",
        "paper-deep": "#DFDBD0",
        ink: "#0E0E0D",
        "ink-muted": "#52504A",
        "ink-subtle": "#78756E",
        mustard: "#E0A714",
        "mustard-deep": "#B37E06",
        "mustard-soft": "rgba(224, 167, 20, 0.14)",
        rule: "rgba(14, 14, 13, 0.14)",
        "rule-strong": "rgba(14, 14, 13, 0.85)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        "container-max": "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
