/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // dark mode
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#092230",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
