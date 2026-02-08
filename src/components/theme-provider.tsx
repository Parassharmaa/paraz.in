"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let resolved: Theme = "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      resolved = stored;
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      resolved = "light";
    }
    document.documentElement.classList.toggle("light", resolved === "light");
    setTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext value={{ theme, toggle }}>
      {children}
    </ThemeContext>
  );
}
