"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { founder } from "@/data/content";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import { SplitReveal } from "@/components/motion/SplitReveal";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Founder & CEO spotlight
 *  - Portrait reveals with a clip-path wipe and drifts with scroll (parallax)
 *  - Rotating circular badge ("Founder & CEO · Since 2010")
 *  - Floating credential chips that bob gently
 *  - Quote, bio, mini journey timeline, a signature that draws itself, contact links
 */
export function FounderSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const decoY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} aria-labelledby="founder-heading" className="overflow-x-clip py-14 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1760px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        {/* The unclipped wrapper triggers the reveal (a fully clipped element never counts as "in view"). */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="relative mx-auto w-full max-w-[520px] pb-6 pr-6 sm:pb-10 sm:pr-10">
          {/* offset frame */}
          <motion.div aria-hidden style={{ y: decoY }} className="absolute inset-0 left-6 top-6 rounded-[2rem] border-2 border-dashed border-teal/40 sm:left-10 sm:top-10" />
          <motion.div
            style={{ y: photoY }}
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 32px)" },
              show: { clipPath: "inset(0% 0% 0% 0% round 32px)", transition: { duration: 1.2, ease } },
            }}
            className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_var(--t-shadow)]"
          >
            <motion.div variants={{ hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.6, ease } } }}>
              <PhotoFrame src={founder.src} alt={`${founder.name}, ${founder.role}`} scene="portrait" accent="var(--t-primary)" className="aspect-[4/5]" priority />
            </motion.div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-5 left-6 font-display text-lg font-semibold text-white">{founder.name}</p>
          </motion.div>

          {/* rotating badge */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 14 }}
            className="absolute bottom-0 right-0 z-10 h-28 w-28 sm:h-32 sm:w-32"
          >
            <div className="relative h-full w-full rounded-full bg-teal text-ink shadow-[0_15px_40px_var(--t-shadow)]">
              <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                <defs>
                  <path id="founder-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="9.5" fontWeight="700" letterSpacing="2.2" fill="currentColor">
                  <textPath href="#founder-circle">FOUNDER & CEO • SINCE 2010 •</textPath>
                </text>
              </motion.svg>
              <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
              </svg>
            </div>
          </motion.div>

          {/* floating chips */}
          {founder.chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease }}
              className={`absolute z-10 hidden sm:block ${["-left-6 top-[14%]", "-right-2 top-[42%]", "-left-4 top-[68%]"][i]}`}
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut", delay: i * 0.6 }}
                className="flex items-center gap-2 rounded-full border border-line bg-ink/90 px-4 py-2 text-sm font-medium shadow-[0_10px_30px_var(--t-shadow)] backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-teal" />
                {chip}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>

        {/* Text */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">
            Meet our founder
          </motion.p>
          <SplitReveal as="h2" text={founder.name} className="font-display text-h1 font-semibold tracking-tight" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-2 text-lg text-mist">
            <span id="founder-heading">{founder.role}</span>
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease }}
            className="relative mt-8 border-l-4 border-teal pl-6 font-display text-lead font-medium"
          >
            <span aria-hidden className="absolute -left-1 -top-6 font-display text-7xl leading-none text-teal/20">“</span>
            {founder.quote}
          </motion.blockquote>

          <div className="mt-6 space-y-3 text-mist">
            {founder.bio.map((b, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
                {b}
              </motion.p>
            ))}
          </div>

          {/* journey */}
          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {founder.journey.map((j, i) => (
              <motion.li
                key={j.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease }}
                className="rounded-2xl border border-line bg-ink-2 p-4"
              >
                <p className="font-display text-2xl font-semibold text-teal">{j.year}</p>
                <p className="mt-1 text-sm text-mist">{j.text}</p>
              </motion.li>
            ))}
          </ol>

          {/* signature + contact */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <svg viewBox="0 0 240 70" className="h-14 w-48 text-snow" aria-label={`Signature of ${founder.name}`}>
                <motion.path
                  d="M8 48 C 20 20, 34 14, 40 30 S 34 60, 52 44 S 70 18, 78 34 S 88 54, 100 40 C 108 30, 116 26, 120 38 C 124 50, 134 50, 142 36 S 160 20, 170 36 C 178 48, 190 46, 204 30 M 150 56 C 175 52, 205 50, 232 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </svg>
              <p className="text-sm text-mist">{founder.name}</p>
            </div>
            <div className="flex gap-2">
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-teal hover:bg-teal hover:text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
                </svg>
              </a>
              <a href={`mailto:${founder.email}`} aria-label="Email the CEO" className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-teal hover:bg-teal hover:text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
