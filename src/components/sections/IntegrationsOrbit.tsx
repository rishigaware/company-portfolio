"use client";

import { motion } from "framer-motion";
import { integrations } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";

/** Integrations orbit around the platform; chips counter-rotate so labels stay upright. */
export function IntegrationsOrbit() {
  const inner = integrations.slice(0, 4);
  const outer = integrations.slice(4);
  return (
    <section className="mx-auto grid max-w-[1760px] items-center gap-12 overflow-x-clip px-5 md:gap-16 md:px-10 py-14 md:py-20 lg:py-24 md:grid-cols-2">
      <Reveal>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Integrations</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight">Fits into the systems you already run</h2>
        <p className="mt-5 text-base text-mist">
          Native connectors for ERP, chromatography data systems, cloud platforms and identity providers — plus an open REST API.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {integrations.map((n) => (
            <li key={n} className="rounded-full border border-line px-4 py-1.5 text-sm text-mist">{n}</li>
          ))}
        </ul>
      </Reveal>

      <div aria-hidden className="relative mx-auto aspect-square w-[calc(100%-3.5rem)] max-w-[460px] sm:w-full">
        <div className="absolute inset-[14%] rounded-full border border-dashed border-line" />
        <div className="absolute inset-0 rounded-full border border-line" />
        <div className="absolute inset-[36%] flex items-center justify-center rounded-full bg-teal text-center font-display text-sm font-semibold text-ink shadow-[0_0_80px_color-mix(in_srgb,var(--t-primary)_50%,transparent)]">
          GAMP
          <br />
          Platform
        </div>
        <Ring items={inner} inset="14%" duration={30} />
        <Ring items={outer} inset="0%" duration={45} reverse />
      </div>
    </section>
  );
}

function Ring({ items, inset, duration, reverse }: { items: string[]; inset: string; duration: number; reverse?: boolean }) {
  const dir = reverse ? -360 : 360;
  return (
    <motion.div className="absolute" style={{ inset }} animate={{ rotate: dir }} transition={{ repeat: Infinity, ease: "linear", duration }}>
      {items.map((n, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <motion.span
            key={n}
            className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-ink text-[9px] font-semibold shadow-[0_10px_30px_var(--t-shadow)] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xs"
            style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
            animate={{ rotate: -dir }}
            transition={{ repeat: Infinity, ease: "linear", duration }}
          >
            {n}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
