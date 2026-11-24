"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { solutions } from "@/data/offerings";
import { products } from "@/data/products";

/**
 * Expanding panels (desktop): the hovered solution widens to reveal its details,
 * the others shrink to slim columns. Stacks as normal cards on mobile.
 */
export function SolutionPanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4 lg:h-[520px] lg:flex-row">
      {solutions.map((s, i) => {
        const open = active === i;
        const names = products.filter((p) => s.products.includes(p.slug)).map((p) => p.name);
        return (
          <motion.div
            key={s.slug}
            layout
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            initial={{ opacity: 0, y: 60, clipPath: "inset(15% 0% 0% 0% round 16px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              layout: { type: "spring", stiffness: 200, damping: 30 },
              default: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
            }}
            className={`relative overflow-hidden rounded-2xl text-white ${open ? "lg:flex-[3.2]" : "lg:flex-1"}`}
            style={{ background: `linear-gradient(160deg, ${s.color}, color-mix(in srgb, ${s.color} 55%, #0b1324))` }}
          >
            <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
            <Link href={`/solutions/${s.slug}`} className="relative flex h-full min-h-[240px] flex-col justify-between p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-semibold opacity-80">0{i + 1}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition-transform duration-300 hover:rotate-45">↗</span>
              </div>
              <div>
                <h3 className={`font-display font-semibold leading-tight transition-all ${open ? "text-3xl" : "text-2xl lg:text-xl"}`}>{s.name}</h3>
                <motion.div
                  initial={false}
                  animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden max-lg:!h-auto max-lg:!opacity-100"
                >
                  <p className="mt-3 max-w-lg text-white/85">{s.tagline}</p>
                  <div className="mt-5 grid max-w-lg grid-cols-3 gap-3">
                    {s.outcomes.map((o) => (
                      <div key={o.label}>
                        <p className="font-display text-2xl font-semibold">{o.value}</p>
                        <p className="text-xs text-white/75">{o.label}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {names.map((n) => (
                      <li key={n} className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{n}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
