import type { Product } from "@/data/products";

/**
 * Placeholder artwork drawn in SVG (no image files needed).
 * Replace with real product photos via next/image when you have them.
 */
export function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  const c = product.accent;
  const id = product.slug;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink-3 ${className}`}>
      <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 30% 20%, ${c}55, transparent 60%)` }} />
      <svg viewBox="0 0 400 300" className="relative h-full w-full" role="img" aria-label={`${product.name} illustration`}>
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c} />
            <stop offset="1" style={{ stopColor: "var(--t-fg)" }} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {product.category === "Consumables" ? (
          <g>
            {/* Rack of sample vials */}
            <rect x="80" y="200" width="240" height="26" rx="6" style={{ fill: "var(--t-surface)" }} stroke={`url(#g-${id})`} strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${104 + i * 46} 0)`}>
                <rect x="-14" y="92" width="28" height="12" rx="3" fill={c} fillOpacity={0.9} />
                <rect x="-12" y="104" width="24" height="100" rx="8" style={{ fill: "var(--t-surface)" }} stroke={c} strokeOpacity="0.6" strokeWidth="2" />
                <rect x="-10" y={150 - i * 8} width="20" height={52 + i * 8} rx="6" fill={c} fillOpacity={0.25 + i * 0.1} />
              </g>
            ))}
          </g>
        ) : product.category === "Instrument" ? (
          <g>
            <rect x="70" y="80" width="260" height="150" rx="18" style={{ fill: "var(--t-surface)" }} stroke={`url(#g-${id})`} strokeWidth="2" />
            <rect x="90" y="100" width="120" height="70" rx="8" fill={c} fillOpacity="0.15" stroke={c} strokeOpacity="0.6" />
            <polyline points="95,160 115,140 135,150 155,115 175,130 205,108" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={240 + i * 26} cy="120" r="9" fill="none" stroke={c} strokeOpacity={0.4 + i * 0.2} strokeWidth="3" />
            ))}
            <rect x="230" y="150" width="80" height="10" rx="5" fill={c} fillOpacity="0.4" />
            <rect x="230" y="168" width="56" height="10" rx="5" style={{ fill: "var(--t-fg)" }} fillOpacity="0.15" />
            <rect x="90" y="190" width="220" height="22" rx="6" style={{ fill: "var(--t-fg)" }} fillOpacity="0.05" />
            <rect x="110" y="230" width="40" height="12" rx="3" style={{ fill: "var(--t-surface)" }} />
            <rect x="250" y="230" width="40" height="12" rx="3" style={{ fill: "var(--t-surface)" }} />
          </g>
        ) : (
          <g>
            <rect x="50" y="50" width="300" height="200" rx="14" style={{ fill: "var(--t-surface)" }} stroke={`url(#g-${id})`} strokeWidth="2" />
            <circle cx="70" cy="68" r="4" fill="#f87171" /><circle cx="84" cy="68" r="4" fill="#fbbf24" /><circle cx="98" cy="68" r="4" fill="#34d399" />
            <rect x="62" y="86" width="60" height="150" rx="6" style={{ fill: "var(--t-fg)" }} fillOpacity="0.04" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="70" y={96 + i * 22} width={i === 1 ? 44 : 36} height="8" rx="4" style={{ fill: i === 1 ? c : "var(--t-fg)" }} fillOpacity={i === 1 ? 0.8 : 0.15} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={136 + i * 70} y="86" width="60" height="40" rx="6" fill={c} fillOpacity={0.12 + i * 0.08} />
            ))}
            {[50, 80, 60, 110, 90, 130, 100].map((h, i) => (
              <rect key={i} x={140 + i * 28} y={230 - h * 0.8} width="16" height={h * 0.8} rx="3" fill={c} fillOpacity={0.35 + i * 0.08} />
            ))}
          </g>
        )}
      </svg>
      <span className="absolute left-4 top-4 rounded-full border border-line bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-widest text-snow/80 backdrop-blur">
        {product.category}
      </span>
    </div>
  );
}
