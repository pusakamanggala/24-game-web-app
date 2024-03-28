import { useEffect, useState, Dispatch, SetStateAction } from "react";

// Define a type for the theme
type Theme = "light" | "dark";

// Custom hook to manage theme and apply it to the root of the React app
const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    return (storedTheme || "light") as Theme; // Default theme is 'light'
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;

    // Apply Tailwind CSS classes based on theme
    root.classList.remove("dark");
    root.classList.remove("light");
    root.classList.add(theme);

    // Optionally, you can add more CSS variables or classes based on theme
    // For example:
    // root.style.setProperty('--primary-color', theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
