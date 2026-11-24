"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { DEFAULT_THEME, THEME_STORAGE_KEY, getTheme, type ThemeId, type ThemeMeta } from "@/config/themes";

type Ctx = {
  theme: ThemeMeta;
  setTheme: (id: ThemeId, origin?: { x: number; y: number }) => void;
  toggleMode: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<ThemeId>(DEFAULT_THEME);

  // Sync with the value the inline head script already applied.
  useEffect(() => {
    const current = getTheme(document.documentElement.getAttribute("data-theme"));
    if (current) setId(current.id);
  }, []);

  const apply = useCallback((next: ThemeId) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    setId(next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }, []);

  const setTheme = useCallback<Ctx["setTheme"]>(
    (next, origin) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
      if (!doc.startViewTransition || reduced) return apply(next);

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const vt = doc.startViewTransition(() => flushSync(() => apply(next)));
      vt.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [apply],
  );

  const theme = getTheme(id)!;
  const toggleMode = useCallback<Ctx["toggleMode"]>((origin) => setTheme(theme.pair, origin), [setTheme, theme.pair]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
