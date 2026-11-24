"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { gallery } from "@/data/content";

const tints = ["var(--t-primary)", "var(--t-accent)", "var(--t-accent-2)"];

/** Installation gallery: three columns drift at different speeds while scrolling. */
export function GalleryParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const cols = [gallery.slice(0, 3), gallery.slice(3, 6), gallery.slice(6, 9)];
  const ys = [y1, y2, y3];

  return (
    <section ref={ref} className="overflow-hidden py-20 md:py-24">
      <div className="mx-auto max-w-[1760px] px-5 md:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Installations</p>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-tight">Labs we&apos;ve built and equipped</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cols.map((col, ci) => (
            <Column key={ci} items={col} y={ys[ci]} tint={tints[ci]} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-mist">Placeholder tiles — replace with real installation photos.</p>
      </div>
    </section>
  );
}

function Column({ items, y, tint }: { items: typeof gallery; y: MotionValue<number>; tint: string }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-4">
      {items.map((g) => (
        <figure
          key={g.title}
          data-cursor="hover"
          className={`group relative overflow-hidden rounded-2xl border border-line bg-ink-2 ${g.tall ? "h-[420px]" : "h-[260px]"}`}
        >
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${tint} 45%, transparent), transparent 65%), linear-gradient(160deg, var(--t-surface-2), var(--t-surface))` }}
          />
          <div aria-hidden className="grid-bg absolute inset-0" />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
            <p className="font-display text-xl font-semibold">{g.title}</p>
            <p className="text-sm text-mist opacity-0 transition-opacity duration-500 group-hover:opacity-100">{g.place}</p>
          </figcaption>
        </figure>
      ))}
    </motion.div>
  );
}
