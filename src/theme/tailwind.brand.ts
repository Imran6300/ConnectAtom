// ConnectAtom theme extension for Tailwind CSS v3.
// Usage in tailwind.config.ts:
//   import brand from "./tailwind.brand";
//   export default { content: [...], theme: { extend: brand }, darkMode: ["selector", '[data-theme="dark"]'] };
//
// Tailwind v4: map the same values in CSS with @theme, for example:
//   @theme { --color-atom-teal: #14D1BC; --color-atom-ink: #0A1622; --font-display: "Space Grotesk", sans-serif; }

const brand = {
  colors: {
    atom: {
      ink: "#0A1622",
      surface: "#112536",
      surface2: "#18324A",
      teal: "#14D1BC",
      "teal-600": "#0A8F80",
      "teal-700": "#087A6E",
      "teal-800": "#066A5F",
      amber: "#FFB224",
      red: "#F0524F",
      green: "#2BC77A",
      mist: "#F4F8FA",
      cloud: "#E3EBF0",
      slate: "#566879",
      graphite: "#2B3B4A",
    },
  },
  fontFamily: {
    display: ["var(--font-display)", "Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
    sans: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
  },
  borderRadius: { sm: "6px", md: "10px", lg: "16px", xl: "24px" },
  boxShadow: {
    card: "0 1px 2px rgba(10,22,34,0.06), 0 8px 24px rgba(10,22,34,0.06)",
    "card-dark": "0 0 0 1px rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.35)",
    focus: "0 0 0 3px rgba(20,209,188,0.45)",
  },
  transitionTimingFunction: { atom: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
};

export default brand;
