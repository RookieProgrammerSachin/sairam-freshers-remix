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
    },
  },
  plugins: [],
} satisfies Config;
