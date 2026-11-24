/**
 * Illustrated PHOTO PLACEHOLDERS (pure SVG, theme-aware).
 * Each scene stands in for a real photo until one is supplied via `src` on PhotoFrame.
 */
export type Scene = "portrait" | "team" | "event" | "lab" | "training" | "office" | "expo" | "award" | "install";

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
};

const WHITE = "rgba(255,255,255,0.92)";
const SOFT = "rgba(255,255,255,0.22)";

function Person({ x, y, s = 1, coat = false, tone = WHITE }: { x: number; y: number; s?: number; coat?: boolean; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-58" r="22" fill={tone} />
      <path d="M-46 30 C-46 -10 -26 -28 0 -28 C26 -28 46 -10 46 30 Z" fill={tone} />
      {coat && <path d="M-10 -26 L0 0 L10 -26 M0 0 V28" stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none" />}
    </g>
  );
}

export function SceneArt({ scene, accent = "var(--t-primary)", className = "" }: { scene: Scene; accent?: string; className?: string }) {
  const id = `sa-${scene}-${hash(accent)}`;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`} role="img" aria-label={`${scene} photo placeholder`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: `color-mix(in srgb, ${accent} 92%, white)` }} />
          <stop offset="1" style={{ stopColor: `color-mix(in srgb, ${accent} 55%, #0b1324)` }} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.75" cy="0.2" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <rect width="400" height="300" fill={`url(#${id}-grid)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />

      {scene === "portrait" && (
        <g>
          <circle cx="200" cy="140" r="120" fill={SOFT} />
          <circle cx="200" cy="140" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="4 8" />
          <circle cx="200" cy="120" r="48" fill={WHITE} />
          <path d="M92 320 C92 230 140 192 200 192 C260 192 308 230 308 320 Z" fill={WHITE} />
          <path d="M176 194 L200 246 L224 194" fill="none" stroke="rgba(0,0,0,0.16)" strokeWidth="4" />
          <path d="M200 246 V320" stroke="rgba(0,0,0,0.12)" strokeWidth="4" />
        </g>
      )}

      {scene === "team" && (
        <g>
          <rect x="0" y="250" width="400" height="50" fill="rgba(0,0,0,0.12)" />
          <Person x={70} y={250} s={0.9} tone="rgba(255,255,255,0.7)" />
          <Person x={140} y={245} s={1.05} coat />
          <Person x={210} y={248} s={1.12} />
          <Person x={282} y={246} s={1} coat tone="rgba(255,255,255,0.85)" />
          <Person x={345} y={252} s={0.88} tone="rgba(255,255,255,0.7)" />
        </g>
      )}

      {scene === "event" && (
        <g>
          <rect x="70" y="40" width="260" height="140" rx="8" fill="rgba(0,0,0,0.25)" />
          <polyline points="90,150 140,120 180,135 230,85 270,100 310,70" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
          <rect x="180" y="190" width="40" height="50" rx="4" fill="rgba(255,255,255,0.35)" />
          <Person x={200} y={200} s={0.55} />
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={30 + i * 43} cy={285} r="16" fill="rgba(0,0,0,0.3)" />
          ))}
          <path d="M120 0 L60 300 H180 Z" fill="rgba(255,255,255,0.06)" />
          <path d="M280 0 L220 300 H340 Z" fill="rgba(255,255,255,0.06)" />
        </g>
      )}

      {scene === "lab" && (
        <g>
          <rect x="20" y="190" width="300" height="14" rx="4" fill="rgba(255,255,255,0.55)" />
          <rect x="40" y="130" width="110" height="60" rx="8" fill="rgba(255,255,255,0.35)" />
          <polyline points="52,175 72,160 92,168 112,145 135,152" fill="none" stroke={WHITE} strokeWidth="3" />
          <path d="M180 190 L196 150 V130 H210 V150 L226 190 Z" fill="rgba(255,255,255,0.6)" />
          <path d="M240 190 V140 H262 V190 Z" fill="rgba(255,255,255,0.5)" />
          <Person x={330} y={230} s={1.25} coat />
        </g>
      )}

      {scene === "training" && (
        <g>
          <rect x="40" y="40" width="200" height="120" rx="6" fill="rgba(255,255,255,0.85)" />
          {[70, 95, 120].map((y, i) => (
            <rect key={y} x="60" y={y} width={[150, 120, 90][i]} height="8" rx="4" fill="rgba(0,0,0,0.15)" />
          ))}
          <Person x={290} y={210} s={1.1} coat />
          <Person x={90} y={300} s={0.8} tone="rgba(255,255,255,0.7)" />
          <Person x={180} y={300} s={0.8} tone="rgba(255,255,255,0.7)" />
          <Person x={360} y={300} s={0.8} tone="rgba(255,255,255,0.7)" />
        </g>
      )}

      {scene === "office" && (
        <g>
          <rect x="110" y="50" width="180" height="250" fill="rgba(255,255,255,0.3)" />
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => <rect key={`${r}-${c}`} x={125 + c * 42} y={66 + r * 36} width="30" height="22" rx="2" fill={(r + c) % 3 === 0 ? WHITE : "rgba(255,255,255,0.45)"} />),
          )}
          <circle cx="60" cy="230" r="40" fill="rgba(255,255,255,0.35)" />
          <rect x="56" y="230" width="8" height="70" fill="rgba(255,255,255,0.35)" />
          <circle cx="345" cy="240" r="32" fill="rgba(255,255,255,0.3)" />
        </g>
      )}

      {scene === "expo" && (
        <g>
          <rect x="60" y="50" width="280" height="70" rx="6" fill={WHITE} />
          <rect x="80" y="72" width="80" height="26" rx="4" style={{ fill: accent }} />
          <rect x="175" y="78" width="140" height="14" rx="7" fill="rgba(0,0,0,0.15)" />
          <rect x="60" y="120" width="12" height="130" fill="rgba(255,255,255,0.6)" />
          <rect x="328" y="120" width="12" height="130" fill="rgba(255,255,255,0.6)" />
          <rect x="140" y="190" width="120" height="60" rx="6" fill="rgba(255,255,255,0.5)" />
          <Person x={110} y={290} s={0.95} />
          <Person x={300} y={290} s={0.95} coat />
          <Person x={210} y={300} s={0.7} tone="rgba(255,255,255,0.7)" />
        </g>
      )}

      {scene === "award" && (
        <g>
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={(i * 47) % 400} y={(i * 83) % 200} width="8" height="14" rx="2" transform={`rotate(${i * 23} ${(i * 47) % 400} ${(i * 83) % 200})`} fill="rgba(255,255,255,0.5)" />
          ))}
          <path d="M160 70 H240 V110 C240 140 222 158 200 160 C178 158 160 140 160 110 Z" fill={WHITE} />
          <path d="M160 82 C130 82 130 122 162 124 M240 82 C270 82 270 122 238 124" fill="none" stroke={WHITE} strokeWidth="8" />
          <rect x="192" y="158" width="16" height="34" fill={WHITE} />
          <rect x="160" y="190" width="80" height="20" rx="4" fill={WHITE} />
          <rect x="120" y="210" width="160" height="90" fill="rgba(255,255,255,0.35)" />
        </g>
      )}

      {scene === "install" && (
        <g>
          <rect x="40" y="90" width="210" height="150" rx="14" fill="rgba(255,255,255,0.85)" />
          <rect x="62" y="112" width="90" height="60" rx="6" style={{ fill: accent }} opacity="0.5" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={180 + i * 22} cy={128} r="8" fill="none" style={{ stroke: accent }} strokeWidth="4" />
          ))}
          <rect x="62" y="190" width="166" height="20" rx="5" fill="rgba(0,0,0,0.08)" />
          <rect x="20" y="240" width="250" height="12" rx="4" fill="rgba(255,255,255,0.55)" />
          <Person x={320} y={262} s={1.2} coat />
          <path d="M296 200 L262 168" stroke={WHITE} strokeWidth="10" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
