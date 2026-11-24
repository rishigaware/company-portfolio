"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { processSteps } from "@/data/content";

/** A vertical line draws itself with scroll; each step lights up when the line reaches it. */
export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="mx-auto max-w-5xl overflow-x-clip px-5 md:px-10 py-14 md:py-20 lg:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">How we work</p>
      <h2 className="mb-12 font-display text-h2 font-semibold tracking-tight">From consultation to lifetime support</h2>
      <div ref={ref} className="relative">
        <svg aria-hidden className="absolute left-5 top-0 h-full w-1 md:left-1/2 md:-translate-x-1/2" preserveAspectRatio="none" viewBox="0 0 2 100">
          <line x1="1" y1="0" x2="1" y2="100" style={{ stroke: "var(--t-line)" }} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <motion.line x1="1" y1="0" x2="1" y2="100" stroke="url(#pl)" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength }} />
          <defs>
            {/* userSpaceOnUse: a bounding-box gradient on a zero-width line would not render */}
            <linearGradient id="pl" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
              <stop offset="0" style={{ stopColor: "var(--t-primary)" }} />
              <stop offset="1" style={{ stopColor: "var(--t-accent-2)" }} />
            </linearGradient>
          </defs>
        </svg>
        <ol className="space-y-20">
          {processSteps.map((s, i) => (
            <Step key={s.title} i={i} total={processSteps.length} progress={scrollYProgress} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ i, total, progress, title, text }: { i: number; total: number; progress: MotionValue<number>; title: string; text: string }) {
  const at = i / (total - 1 || 1);
  const active = useTransform(progress, [at - 0.08, at], [0, 1]);
  const scale = useTransform(active, [0, 1], [0.6, 1]);
  const left = i % 2 === 0;
  return (
    <li className={`relative grid items-center pl-16 md:grid-cols-2 md:gap-16 md:pl-0`}>
      <motion.span
        style={{ scale, opacity: useTransform(active, [0, 1], [0.3, 1]) }}
        className="absolute left-5 top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-teal bg-ink font-display text-sm font-semibold text-teal md:left-1/2"
      >
        {i + 1}
      </motion.span>
      <motion.div
        style={{ opacity: useTransform(active, [0, 1], [0.2, 1]), x: useTransform(active, [0, 1], [left ? -30 : 30, 0]) }}
        className={left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}
      >
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-mist">{text}</p>
      </motion.div>
    </li>
  );
}
