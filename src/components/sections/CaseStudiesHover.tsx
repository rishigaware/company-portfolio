"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { caseStudies } from "@/data/content";

/** Portfolio list: rows fill on hover and a preview card follows the cursor. */
export function CaseStudiesHover() {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const cs = active !== null ? caseStudies[active] : null;

  // Scrolling moves the list out from under a still pointer without firing pointerleave — hide the preview.
  useEffect(() => {
    if (active === null) return;
    const hide = () => setActive(null);
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => window.removeEventListener("scroll", hide);
  }, [active]);

  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-14 md:py-20 lg:py-24">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Portfolio</p>
          <h2 className="font-display text-h2 font-semibold tracking-tight">Success stories</h2>
        </div>
        <Link href="/case-studies" className="hidden text-sm text-mist underline-offset-4 hover:text-teal hover:underline md:block">
          All case studies →
        </Link>
      </div>

      <ul
        className="relative border-t border-line"
        onPointerMove={(e) => {
          x.set(e.clientX + 24);
          y.set(e.clientY - 120);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {caseStudies.map((c, i) => (
          <li key={c.slug} onPointerEnter={() => setActive(i)} className="group relative overflow-hidden border-b border-line">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <Link href={`/case-studies#${c.slug}`} className="relative grid grid-cols-12 items-center gap-4 py-8 md:py-10">
              <span className="col-span-2 text-sm text-mist md:col-span-1">0{i + 1}</span>
              <span className="col-span-10 md:col-span-7">
                <span className="block text-xs uppercase tracking-widest" style={{ color: c.color }}>{c.client}</span>
                <span className="mt-1 block font-display text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-3 md:text-3xl">{c.title}</span>
              </span>
              <span className="col-span-6 col-start-3 text-sm text-mist md:col-span-2 md:col-start-auto">{c.industry}</span>
              <span className="col-span-4 text-right text-sm text-mist md:col-span-2">
                {c.year} <span className="ml-2 inline-block transition-transform duration-300 group-hover:rotate-45">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview (desktop pointer only) */}
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <AnimatePresence>
          {cs && (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="w-72 overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_30px_60px_var(--t-shadow)]"
            >
              <div className="relative h-32" style={{ background: `linear-gradient(135deg, ${cs.color}, ${cs.color}55)` }}>
                <div className="grid-bg absolute inset-0 opacity-60" />
                <p className="absolute bottom-3 left-4 font-display text-xl font-semibold text-white">{cs.client}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <p className="font-display text-lg font-semibold" style={{ color: cs.color }}>{r.value}</p>
                    <p className="text-[10px] leading-tight text-mist">{r.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
