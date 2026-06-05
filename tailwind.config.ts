import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tealDeep: "#282c3f",
        tealInk: "#1f2937",
        leaf: "#2f8f3a",
        saffron: "#fc8019",
        cream: "#f8f8f8"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(40, 44, 63, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
