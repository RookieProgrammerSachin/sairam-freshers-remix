import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8f8f8",
        accent: "#0a66c3",
        secondary: "#333",
        card: "#fbfbfb",
      },
      animation: {
        "fade-in": "fade-in 0.5s linear",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "100",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
