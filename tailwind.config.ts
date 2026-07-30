import type { Config } from "tailwindcss";

/**
 * Kernel Aesthetic — Tailwind theme tokens.
 * Source of truth: DESIGN.md
 * Only tokens here; components are intentionally left empty for the designer.
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
        background: "#101410",
        "on-background": "#e0e4dc",
        surface: "#101410",
        "surface-dim": "#101410",
        "surface-bright": "#363a35",
        "surface-container-lowest": "#0b0f0b",
        "surface-container-low": "#191d18",
        "surface-container": "#1d211c",
        "surface-container-high": "#272b26",
        "surface-container-highest": "#323631",
        "on-surface": "#e0e4dc",
        "on-surface-variant": "#baccb0",
        "inverse-surface": "#e0e4dc",
        "inverse-on-surface": "#2d312d",
        outline: "#85967c",
        "outline-variant": "#3c4b35",
        "surface-tint": "#2ae500",
        primary: "#efffe3",
        "on-primary": "#053900",
        "primary-container": "#39ff14",
        "on-primary-container": "#107100",
        "inverse-primary": "#106e00",
        secondary: "#ffd393",
        "on-secondary": "#432c00",
        "secondary-container": "#fdaf00",
        "on-secondary-container": "#694600",
        tertiary: "#f9faff",
        "on-tertiary": "#00315c",
        "tertiary-container": "#cbdfff",
        "on-tertiary-container": "#0063af",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        "primary-fixed": "#79ff5b",
        "primary-fixed-dim": "#2ae500",
        "on-primary-fixed": "#022100",
        "on-primary-fixed-variant": "#095300",
        "secondary-fixed": "#ffddaf",
        "secondary-fixed-dim": "#ffba43",
        "on-secondary-fixed": "#281800",
        "on-secondary-fixed-variant": "#614000",
        "tertiary-fixed": "#d3e4ff",
        "tertiary-fixed-dim": "#a2c9ff",
        "on-tertiary-fixed": "#001c38",
        "on-tertiary-fixed-variant": "#004882",
        "surface-variant": "#323631",
      },
      fontFamily: {
        sans: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.02em" },
        ],
        "headline-lg-mobile": ["24px", { lineHeight: "32px" }],
        "headline-md": ["24px", { lineHeight: "32px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "code-sm": ["14px", { lineHeight: "20px" }],
        "label-caps": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.1em" },
        ],
      },
      spacing: {
        unit: "4px",
        gutter: "16px",
        margin: "24px",
      },
      maxWidth: {
        "container-max": "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
