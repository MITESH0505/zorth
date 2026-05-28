import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs:  "390px",   // added: true mobile-first baseline
      sm:  "640px",
      md:  "768px",
      lg:  "1024px",
      xl:  "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        zorth: {
          50:  "#f0f0ff",
          100: "#e0e0ff",
          200: "#c0c0ff",
          300: "#a0a0ff",
          400: "#8080ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        dark: {
          50:  "#f8fafc",
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#0f0f13",
          950: "#0a0a0f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float:        "float 6s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-16px)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
