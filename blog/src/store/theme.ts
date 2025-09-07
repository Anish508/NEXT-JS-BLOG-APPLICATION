import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

function applyTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    set({ theme: newTheme });
    applyTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
    }
  },
  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  },
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      let theme = window.localStorage.getItem("theme") as Theme | null;
      if (!theme) {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      set({ theme });
      applyTheme(theme);
    }
  },
}));
