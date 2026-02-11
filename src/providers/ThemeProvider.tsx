"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const getResolved = (): "light" | "dark" =>
      theme === "system" ? (media.matches ? "dark" : "light") : theme;
    const resolvedTheme = getResolved();
    setResolved(resolvedTheme);
    root.setAttribute("data-theme", resolvedTheme);
    const handler = () => {
      if (theme === "system") setResolved(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("tnn-theme", t);
      } catch {}
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tnn-theme") as Theme | null;
      if (stored && ["light", "dark", "system"].includes(stored))
        setThemeState(stored);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
