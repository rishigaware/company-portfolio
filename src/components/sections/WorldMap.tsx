"use client";

import { motion } from "framer-motion";

export type MapPin = { city: string; x: number; y: number; hq: boolean; labelLeft: boolean };

type Props = {
  width: number;
  height: number;
  countries: { name: string; d: string; active: boolean }[];
  pins: MapPin[];
  arcs: { city: string; d: string }[];
};

/** Renders the projected world map; routes draw in from HQ and office pins pulse. Colours follow the active theme. */
export function WorldMap({ width, height, countries, pins, arcs }: Props) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="World map showing GAMP Lifetech office locations">
      <g>
        {countries.map((c, i) => (
          <path
            key={`${c.name}-${i}`}
            d={c.d}
            style={{
              fill: c.active ? "color-mix(in srgb, var(--t-primary) 28%, var(--t-surface-2))" : "var(--t-surface-2)",
              stroke: "var(--t-bg)",
            }}
            strokeWidth={0.6}
          >
            <title>{c.name}</title>
          </path>
        ))}
      </g>

      {arcs.map((a, i) => (
        <motion.path
          key={a.city}
          d={a.d}
          fill="none"
          style={{ stroke: "var(--t-primary)" }}
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.25, ease: "easeInOut" }}
        />
      ))}

      {pins.map((p, i) => (
        <g key={p.city}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            fill="none"
            style={{ stroke: p.hq ? "var(--t-primary)" : "var(--t-accent)" }}
            strokeWidth={1.5}
            initial={{ r: 4, opacity: 0.8 }}
            animate={{ r: [4, 18], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
          />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={p.hq ? 7 : 5}
            style={{ fill: p.hq ? "var(--t-primary)" : "var(--t-accent)", stroke: "var(--t-bg)" }}
            strokeWidth={2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.25, type: "spring" }}
          />
          <text
            x={p.labelLeft ? p.x - 11 : p.x + 11}
            y={p.y + 4}
            textAnchor={p.labelLeft ? "end" : "start"}
            fontSize={13}
            fontWeight={600}
            className="hidden sm:inline"
            style={{ fill: "var(--t-fg)", paintOrder: "stroke", stroke: "var(--t-surface)", strokeWidth: 4 }}
          >
            {p.city}
          </text>
        </g>
      ))}
    </svg>
  );
}
