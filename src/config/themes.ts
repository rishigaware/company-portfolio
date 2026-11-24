/**
 * Theme registry. Colours live in globals.css under [data-theme="<id>"].
 * Each light theme is paired with a dark theme so the dark-mode toggle
 * flips between the two members of a pair.
 */
export type ThemeId = "clinical" | "ivory" | "midnight" | "graphite";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  mode: "light" | "dark";
  pair: ThemeId;
  /** swatch colours shown in the picker: [background, primary, accent] */
  swatch: [string, string, string];
};

export const themes: ThemeMeta[] = [
  { id: "clinical", label: "Clinical White", mode: "light", pair: "midnight", swatch: ["#ffffff", "#0d9488", "#2563eb"] },
  { id: "ivory", label: "Warm Ivory", mode: "light", pair: "graphite", swatch: ["#fbf8f3", "#c2410c", "#be185d"] },
  { id: "midnight", label: "Midnight Lab", mode: "dark", pair: "clinical", swatch: ["#050b14", "#2dd4bf", "#60a5fa"] },
  { id: "graphite", label: "Graphite Amber", mode: "dark", pair: "ivory", swatch: ["#0c0a09", "#fb923c", "#f472b6"] },
];

export const DEFAULT_THEME: ThemeId = "clinical";
export const THEME_STORAGE_KEY = "gamp-theme";

export const getTheme = (id: string | null | undefined) => themes.find((t) => t.id === id);

/** Inline script run before paint so there's no flash of the wrong theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var ok=${JSON.stringify(
  themes.map((t) => t.id),
)};if(ok.indexOf(t)<0)t='${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;
