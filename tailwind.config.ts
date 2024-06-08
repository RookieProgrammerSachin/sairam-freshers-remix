import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#efefef",
        secondary: "#333",
        card: "#f3f3f3",
      },
    },
  },
  plugins: [],
} satisfies Config;
