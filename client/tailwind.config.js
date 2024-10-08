/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        dance: ["Dancing Script", "cursive"],
      },
      colors: {
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
