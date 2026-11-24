"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { clientLogos, type ClientLogo } from "@/data/content";
import { ClientLockup } from "@/components/ui/ClientMark";
import { Counter } from "@/components/motion/Counter";

const SLOTS = 8; // 4×2 on desktop, 2×4 on phones

/**
 * Animated clients section:
 *  1. Logo wall — every ~2.2 s one random tile flips (3D) to reveal a client not currently shown.
 *     Runs only while the section is on screen and never under prefers-reduced-motion.
 *  2. Two infinite logo rows scrolling in opposite directions (pause on hover).
 */
export function ClientsShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [shown, setShown] = useState<ClientLogo[]>(() => clientLogos.slice(0, SLOTS));
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const slot = Math.floor(Math.random() * SLOTS);
      const pick = Math.random();
      setShown((cur) => {
        const hidden = clientLogos.filter((c) => !cur.some((s) => s.name === c.name));
        if (!hidden.length) return cur;
        const next = [...cur];
        next[slot] = hidden[Math.floor(pick * hidden.length)];
        return next;
      });
      setFlipped(slot);
    }, 2200);
    return () => window.clearInterval(id);
  }, [inView]);

  const rowA = clientLogos.slice(0, 8);
  const rowB = clientLogos.slice(8);

  return (
    <section ref={ref} aria-labelledby="clients-heading" className="overflow-hidden py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1760px] px-5 md:px-10">
        <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Our clients</p>
            <h2 id="clients-heading" className="font-display text-h2 font-semibold tracking-tight">
              Trusted by labs that can&apos;t afford to get it wrong
            </h2>
            <p className="mt-4 max-w-xl text-mist">
              From global generics manufacturers to fast-growing biotech start-ups, our clients rely on us for accurate results and audit-ready data.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { v: 500, s: "+", l: "Labs served" },
              { v: 22, s: "", l: "Countries" },
              { v: 96, s: "%", l: "Renew their AMC" },
            ].map((st, i) => (
              <motion.div
                key={st.l}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-line bg-ink-2 p-4 sm:p-5"
              >
                <dd className="font-display text-3xl font-semibold text-teal">
                  <Counter value={st.v} suffix={st.s} />
                </dd>
                <dt className="mt-1 text-xs text-mist sm:text-sm">{st.l}</dt>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* 1. Flipping logo wall */}
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4" aria-label="Featured clients">
          {shown.map((c, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative h-24 bg-ink [perspective:800px] sm:h-28 md:h-32"
              data-cursor="hover"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={c.name}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors duration-300 group-hover:bg-ink-2"
                >
                  <ClientLockup client={c} />
                  <span className="text-[11px] uppercase tracking-widest text-mist/70">{c.sector}</span>
                </motion.div>
              </AnimatePresence>
              {flipped === i && (
                <motion.span
                  key={`${c.name}-flash`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-teal/10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                />
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* 2. Two marquee rows, opposite directions */}
      <div className="mt-10 space-y-4 md:mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeRow items={rowA} duration={38} />
        <MarqueeRow items={rowB} duration={44} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ items, duration, reverse }: { items: ClientLogo[]; duration: number; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="group/row overflow-hidden">
      <ul
        className="flex w-max animate-marquee gap-3 group-hover/row:[animation-play-state:paused] sm:gap-4"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= items.length}
            className="group flex items-center rounded-full border border-line bg-ink-2/60 px-5 py-3 transition-colors hover:border-[color:var(--brand)]"
            style={{ ["--brand" as string]: c.color }}
          >
            <ClientLockup client={c} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}
