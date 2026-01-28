import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Monochrome base colors using CSS variables for easy theming
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        // Accent color - single color for CTAs, links, highlights
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--foreground)",
            "--tw-prose-headings": "var(--foreground)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-code": "var(--foreground)",
            "--tw-prose-pre-bg": "var(--muted)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
