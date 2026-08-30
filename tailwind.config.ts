import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#150b12",
        plum: "#2a1420",
        sakura: {
          50: "#fff2f6",
          100: "#ffe1ea",
          200: "#ffc2d6",
          300: "#ff9cbd",
          400: "#f971a3",
          500: "#e8548c",
          600: "#c23a6f",
        },
        gold: "#d9b26a",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        erica: ["var(--font-erica)"],
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(-10%) translateX(0)" },
          "100%": { transform: "translateY(110vh) translateX(40px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;