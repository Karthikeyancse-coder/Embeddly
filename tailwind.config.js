/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        embeddly: {
          blue: "#2E5AFF",
          "blue-hover": "#1E46E6",
          "blue-light": "#EBF1FF",
          "blue-subtle": "#F2F6FF",
          navy: "#0B1740",
          navySecondary: "#15275C",
          amber: "#FFB020",
          "amber-hover": "#F09E0D",
          "amber-dark": "#D98205",
          "amber-light": "#FFF7EB",
          bg: "#F7F9FC",
          "bg-alt": "#F1F5F9",
          soft: "#EAF1FF",
          muted: "#61708F",
          circuit: "#B9CEFF",
          "circuit-trace": "#C6D8FF",
          "border-light": "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        handwriting: ["var(--font-kalam)", "Kalam", "cursive"],
      },
      boxShadow: {
        "amber-glow": "0 4px 20px rgba(255, 176, 32, 0.35)",
        "blue-glow": "0 8px 30px rgba(46, 90, 255, 0.2)",
        "card-sm": "0 2px 8px rgba(15, 23, 42, 0.04)",
        "card-md": "0 10px 25px -4px rgba(46, 90, 255, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.03)",
        "card-lg": "0 20px 35px -8px rgba(46, 90, 255, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        "xl2": "28px",
      }
    },
  },
  plugins: [],
};
