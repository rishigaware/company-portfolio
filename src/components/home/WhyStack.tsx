"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const reasons = [
  { n: "01", title: "Compliance built in", text: "Every instrument and application ships ready for 21 CFR Part 11, EU Annex 11 and GAMP 5 — with validation documents included.", color: "var(--t-primary)" },
  { n: "02", title: "One connected ecosystem", text: "Our instruments talk natively to our software. No middleware, no manual transcription, no data gaps.", color: "var(--t-accent)" },
  { n: "03", title: "Engineers on call", text: "Application scientists and service engineers across 22 countries, with 24/7 remote support.", color: "var(--t-accent-2)" },
  { n: "04", title: "Lower cost of ownership", text: "Modular hardware and subscription software that scale with your lab — not ahead of it.", color: "var(--t-primary)" },
];

/**
 * Two-column layout: sticky intro on the left, compact cards on the right that
 * stack on top of each other while scrolling (earlier cards scale back slightly).
 */
export function WhyStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="mx-auto grid max-w-[1760px] gap-10 px-5 py-14 md:px-10 md:py-20 lg:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Why choose us</p>
        <h2 className="font-display text-h2 font-semibold tracking-tight">Four reasons labs switch to us</h2>
        <p className="mt-5 max-w-md text-base text-mist">
          From the first installation to every audit that follows, we stay accountable for the results your lab reports.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {reasons.map((r) => (
            <li key={r.n} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/15 text-xs text-teal">✓</span>
              {r.title}
            </li>
          ))}
        </ul>
        <Link href="/about" className="mt-8 inline-block rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-teal hover:text-teal">
          More about us →
        </Link>
      </div>

      <div ref={ref} className="relative">
        {reasons.map((r, i) => (
          <Card key={r.n} i={i} total={reasons.length} progress={scrollYProgress} {...r} />
        ))}
      </div>
    </section>
  );
}

function Card({ i, total, progress, n, title, text, color }: { i: number; total: number; progress: MotionValue<number>; n: string; title: string; text: string; color: string }) {
  const targetScale = 1 - (total - i - 1) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  return (
    <div className="sticky top-28 flex h-[300px] items-start">
      <motion.article
        style={{
          scale,
          top: i * 18,
          background: `linear-gradient(135deg, color-mix(in srgb, ${color} 12%, var(--t-surface)), var(--t-surface) 70%)`,
        }}
        className="relative flex h-[240px] w-full origin-top flex-col justify-between overflow-hidden rounded-2xl border border-line p-6 shadow-[0_10px_30px_var(--t-shadow)] md:p-8"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold tracking-widest" style={{ color }}>
            {n} / 0{total}
          </span>
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: color }} />
        </div>
        <div className="max-w-xl">
          <h3 className="font-display text-2xl font-semibold">{title}</h3>
          <p className="mt-2 text-base text-mist">{text}</p>
        </div>
      </motion.article>
    </div>
  );
}
