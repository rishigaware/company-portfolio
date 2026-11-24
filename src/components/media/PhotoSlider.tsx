"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue } from "framer-motion";
import type { Photo } from "@/data/content";
import { PhotoFrame } from "./PhotoFrame";

/**
 * Reusable photo slider
 *  - drag / swipe, arrow buttons, keyboard ← →, clickable progress dots
 *  - autoplay while on screen (pauses on hover, drag, or prefers-reduced-motion)
 *  - active slide is full-size; neighbours are scaled down and dimmed; caption animates in
 */
export function PhotoSlider({ items, interval = 5000, label }: { items: Photo[]; interval?: number; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // slide width + gap
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const n = items.length;

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  // Measure slide width (responsive)
  useEffect(() => {
    const measure = () => {
      const first = track.current?.querySelector<HTMLElement>("[data-slide]");
      if (!first || !track.current) return;
      const gap = parseFloat(getComputedStyle(track.current).columnGap || "0");
      setStep(first.offsetWidth + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, []);

  // Move the track to the active slide
  useEffect(() => {
    const c = animate(x, -index * step, { type: "spring", stiffness: 260, damping: 32 });
    return () => c.stop();
  }, [index, step, x]);

  // Autoplay
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const playing = inView && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [playing, index, interval, go]);

  const active = items[index];

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="outline-none"
    >
      <motion.div
        ref={track}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -(n - 1) * step, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => setPaused(true)}
        onDragEnd={(_, info) => {
          setPaused(false);
          const threshold = step / 5;
          if (info.offset.x < -threshold || info.velocity.x < -500) go(Math.min(index + 1, n - 1));
          else if (info.offset.x > threshold || info.velocity.x > 500) go(Math.max(index - 1, 0));
          else animate(x, -index * step, { type: "spring", stiffness: 260, damping: 32 });
        }}
        className="flex cursor-grab gap-4 active:cursor-grabbing md:gap-6"
      >
        {items.map((p, i) => {
          const isActive = i === index;
          return (
            <motion.figure
              key={p.title}
              data-slide
              onClick={() => !isActive && go(i)}
              animate={{ scale: isActive ? 1 : 0.92, opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[86%] shrink-0 select-none sm:w-[70%] md:w-[56%] lg:w-[44%] xl:w-[38%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${p.title}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-line shadow-[0_20px_50px_var(--t-shadow)]">
                <PhotoFrame src={p.src} alt={p.title} scene={p.scene} accent={p.accent} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.04]" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/75">
                          {[p.date, p.place].filter(Boolean).join(" · ")}
                        </p>
                        <p className="mt-1 font-display text-xl font-semibold sm:text-2xl">{p.title}</p>
                        {p.caption && <p className="mt-1 max-w-md text-sm text-white/85">{p.caption}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </figcaption>
                <span className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
            </motion.figure>
          );
        })}
      </motion.div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          {items.map((p, i) => (
            <button
              key={p.title}
              aria-label={`Go to slide ${i + 1}: ${p.title}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-snow/15 sm:max-w-16"
            >
              {i < index && <span className="absolute inset-0 bg-teal/60" />}
              {i === index && (
                <motion.span
                  key={`${index}-${playing}`}
                  className="absolute inset-0 origin-left bg-teal"
                  initial={{ scaleX: playing ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: playing ? interval / 1000 : 0, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-teal hover:bg-teal hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-teal hover:bg-teal hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {n}: {active.title}
      </p>
    </div>
  );
}

/** Section wrapper with heading for a PhotoSlider. */
export function PhotoSliderSection({ eyebrow, title, text, items, label }: { eyebrow: string; title: string; text?: string; items: Photo[]; label: string }) {
  return (
    <section className="overflow-x-clip py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1760px] px-5 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
          <h2 className="font-display text-h2 font-semibold tracking-tight">{title}</h2>
          {text && <p className="mt-4 text-mist">{text}</p>}
        </div>
        <PhotoSlider items={items} label={label} />
      </div>
    </section>
  );
}
