import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem("junkrustn-theme");
    if (saved) return saved === "dark";
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("junkrustn-theme", darkMode ? "dark" : "light");
    
    // Apply class to html element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("--bg-primary", "#0F0F0F");
      document.documentElement.style.setProperty("--bg-secondary", "#1A1A1A");
      document.documentElement.style.setProperty("--bg-card", "#252525");
      document.documentElement.style.setProperty("--text-primary", "#FFFFFF");
      document.documentElement.style.setProperty("--text-secondary", "#AAAAAA");
      document.documentElement.style.setProperty("--border-color", "#333333");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("--bg-primary", "#FAFAF8");
      document.documentElement.style.setProperty("--bg-secondary", "#FFFFFF");
      document.documentElement.style.setProperty("--bg-card", "#FFFFFF");
      document.documentElement.style.setProperty("--text-primary", "#1A1A1A");
      document.documentElement.style.setProperty("--text-secondary", "#555555");
      document.documentElement.style.setProperty("--border-color", "#E8E5DF");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};