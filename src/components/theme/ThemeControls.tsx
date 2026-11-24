"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { themes } from "@/config/themes";
import { useTheme } from "./ThemeProvider";

const originOf = (e: React.MouseEvent) => ({ x: e.clientX, y: e.clientY });

/** Dark-mode toggle (sun/moon) + palette picker with the 4 themes. */
export function ThemeControls() {
  const { theme, setTheme, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dark = theme.mode === "dark";

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center gap-1">
      {/* Dark mode toggle */}
      <button
        type="button"
        onClick={(e) => toggleMode(originOf(e))}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line text-snow transition-colors hover:border-teal hover:text-teal"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={dark ? "moon" : "sun"}
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ y: 20, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dark ? (
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </button>

      {/* Theme picker */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose colour theme"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Themes"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-teal"
      >
        <span className="relative h-5 w-5">
          <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-teal" />
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-sky" />
          <span className="absolute bottom-0 left-1 h-3 w-3 rounded-full bg-violet" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 w-64 origin-top-right rounded-2xl border border-line bg-ink p-2 shadow-[0_20px_60px_var(--t-shadow)]"
          >
            {(["light", "dark"] as const).map((mode) => (
              <div key={mode} className="py-1">
                <p className="px-3 pb-1 pt-2 text-[11px] uppercase tracking-widest text-mist">{mode} themes</p>
                {themes
                  .filter((t) => t.mode === mode)
                  .map((t) => (
                    <button
                      key={t.id}
                      role="menuitemradio"
                      aria-checked={theme.id === t.id}
                      onClick={(e) => {
                        setTheme(t.id, originOf(e));
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-ink-2 ${theme.id === t.id ? "bg-ink-2" : ""}`}
                    >
                      <span className="flex overflow-hidden rounded-full border border-line">
                        {t.swatch.map((c) => (
                          <span key={c} className="h-5 w-3" style={{ background: c }} />
                        ))}
                      </span>
                      <span className="flex-1">{t.label}</span>
                      {theme.id === t.id && <span className="text-teal">✓</span>}
                    </button>
                  ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
