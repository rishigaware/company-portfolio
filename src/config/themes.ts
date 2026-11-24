/**
 * Theme registry. Colours live in globals.css under [data-theme="<id>"].
 * Each light theme is paired with a dark theme so the dark-mode toggle
 * flips between the two members of a pair.
 */
export type ThemeId =
  | "clinical"
  | "ivory"
  | "azure"
  | "sage"
  | "lavender"
  | "corporate"
  | "midnight"
  | "graphite"
  | "ocean"
  | "forest"
  | "plum"
  | "navygold";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  mode: "light" | "dark";
  pair: ThemeId;
  /** swatch colours shown in the picker: [background, primary, accent] */
  swatch: [string, string, string];
};

export const themes: ThemeMeta[] = [
  // Light themes (each paired with the dark theme on the same row in the picker)
  { id: "clinical", label: "Clinical White", mode: "light", pair: "midnight", swatch: ["#ffffff", "#0f766e", "#2563eb"] },
  { id: "ivory", label: "Warm Ivory", mode: "light", pair: "graphite", swatch: ["#fbf8f3", "#c2410c", "#be185d"] },
  { id: "azure", label: "Azure Pharma", mode: "light", pair: "ocean", swatch: ["#f7fafd", "#0369a1", "#0891b2"] },
  { id: "sage", label: "Sage Green", mode: "light", pair: "forest", swatch: ["#f7faf7", "#15803d", "#0f766e"] },
  { id: "lavender", label: "Lavender Bio", mode: "light", pair: "plum", swatch: ["#fbfaff", "#6d28d9", "#db2777"] },
  { id: "corporate", label: "Corporate Navy", mode: "light", pair: "navygold", swatch: ["#ffffff", "#1e3a8a", "#b45309"] },
  // Dark themes
  { id: "midnight", label: "Midnight Lab", mode: "dark", pair: "clinical", swatch: ["#050b14", "#2dd4bf", "#60a5fa"] },
  { id: "graphite", label: "Graphite Amber", mode: "dark", pair: "ivory", swatch: ["#0c0a09", "#fb923c", "#f472b6"] },
  { id: "ocean", label: "Deep Ocean", mode: "dark", pair: "azure", swatch: ["#04111d", "#38bdf8", "#22d3ee"] },
  { id: "forest", label: "Forest Night", mode: "dark", pair: "sage", swatch: ["#07130d", "#4ade80", "#2dd4bf"] },
  { id: "plum", label: "Royal Plum", mode: "dark", pair: "lavender", swatch: ["#0f0a1a", "#c084fc", "#f472b6"] },
  { id: "navygold", label: "Navy & Gold", mode: "dark", pair: "corporate", swatch: ["#0a1020", "#fbbf24", "#60a5fa"] },
];

export const DEFAULT_THEME: ThemeId = "clinical";
export const THEME_STORAGE_KEY = "gamp-theme";

export const getTheme = (id: string | null | undefined) => themes.find((t) => t.id === id);

/** Inline script run before paint so there's no flash of the wrong theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var ok=${JSON.stringify(
  themes.map((t) => t.id),
)};if(ok.indexOf(t)<0)t='${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;
