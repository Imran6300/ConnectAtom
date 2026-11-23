import type { Config } from "tailwindcss";
import brand from "./src/theme/tailwind.brand";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: { extend: brand },
  plugins: [],
};
export default config;
