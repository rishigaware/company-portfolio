"use client";

import { motion } from "framer-motion";
import { industries } from "@/data/content";

const hues = ["#2dd4bf", "#60a5fa", "#a78bfa", "#f472b6", "#fbbf24", "#34d399"];

/** Bento grid: tiles wipe in with a clip-path mask, staggered. */
export function IndustriesBento() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-14 md:py-20 lg:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Industries</p>
      <h2 className="mb-12 max-w-2xl font-display text-h2 font-semibold tracking-tight">Trusted wherever precision matters</h2>
      {/* The (unclipped) grid triggers the reveal: a fully clipped tile has no visible area, so it would never count as "in view". */}
      <motion.div
        className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {industries.map((ind, i) => (
          <motion.article
            key={ind.name}
            data-cursor="hover"
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 16px)", opacity: 0.4 },
              show: { clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 },
            }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 ${ind.size === "lg" ? "md:col-span-2" : ind.size === "full" ? "md:col-span-3" : ""}`}
          >
            <div
              aria-hidden
              className="absolute inset-0 scale-110 opacity-50 transition-transform duration-700 group-hover:scale-100"
              style={{ background: `radial-gradient(circle at ${i % 2 ? "80% 20%" : "20% 30%"}, ${hues[i]}55, transparent 60%)` }}
            />
            <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
            <h3 className="relative font-display text-2xl font-semibold">{ind.name}</h3>
            <p className="relative mt-2 max-w-sm text-sm text-mist">{ind.text}</p>
            <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:bg-snow group-hover:text-ink">
              ↗
            </span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
