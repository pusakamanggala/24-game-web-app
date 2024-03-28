/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["grid-cols-2", "grid-cols-3"],
  // dark mode
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1124px",
      },
    },
    extend: {
      colors: {
        primary: "#09090b",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
