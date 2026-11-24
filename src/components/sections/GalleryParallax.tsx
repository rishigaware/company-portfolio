"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
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
    <section ref={ref} className="overflow-hidden py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1760px] px-5 md:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Installations</p>
        <h2 className="mb-12 max-w-2xl font-display text-h2 font-semibold tracking-tight">Labs we&apos;ve built and equipped</h2>
        {/* Phones: compact 2-column grid without parallax */}
        <ul className="grid grid-cols-2 gap-3 sm:hidden">
          {gallery.map((g, i) => (
            <li key={g.title} className={`relative overflow-hidden rounded-xl border border-line bg-ink-2 ${i % 3 === 0 ? "col-span-2 h-44" : "h-36"}`}>
              {g.src ? (
                <Image unoptimized={g.src.startsWith("http")} src={g.src} alt={`${g.title}, ${g.place}`} fill sizes="50vw" className="object-cover" />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${tints[i % 3]} 45%, transparent), transparent 65%), linear-gradient(160deg, var(--t-surface-2), var(--t-surface))` }}
                />
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-display text-sm font-semibold leading-tight text-white">{g.title}</p>
                <p className="text-[11px] text-white/80">{g.place}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* sm and up: three columns drifting at different speeds */}
        <div aria-hidden="false" className="hidden gap-4 sm:grid sm:grid-cols-3">
          {cols.map((col, ci) => (
            <Column key={ci} items={col} y={ys[ci]} tint={tints[ci]} />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-mist">Stock photos (Unsplash) — replace with your own installation photos.</p>
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
          {g.src ? (
            <Image unoptimized={g.src.startsWith("http")} src={g.src} alt={`${g.title}, ${g.place}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${tint} 45%, transparent), transparent 65%), linear-gradient(160deg, var(--t-surface-2), var(--t-surface))` }}
            />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
            <p className="font-display text-xl font-semibold text-white">{g.title}</p>
            <p className="text-sm text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{g.place}</p>
          </figcaption>
        </figure>
      ))}
    </motion.div>
  );
}
