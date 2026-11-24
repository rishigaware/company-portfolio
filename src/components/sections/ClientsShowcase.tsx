"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { clientLogos, clientQuotes, type ClientLogo } from "@/data/content";
import { ClientMark } from "@/components/ui/ClientMark";
import { Counter } from "@/components/motion/Counter";

const QUOTE_MS = 6000;

/**
 * Clients showcase
 *  - Gradient panel with a cursor-following spotlight and lab-grid texture
 *  - Left: heading, rotating client-quote card (auto-advances, progress bar, clickable dots), stat rings
 *  - Right: tilted 3D "logo wall" — three vertical columns scrolling endlessly, middle one reversed
 *  - Below: one horizontal strip of all clients
 */
export function ClientsShowcase() {
  const panel = useRef<HTMLDivElement>(null);
  const inView = useInView(panel, { amount: 0.25 });

  // Spotlight follows the pointer (CSS variables → no re-render)
  const onMove = (e: React.PointerEvent) => {
    const el = panel.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const cols = [clientLogos.slice(0, 6), clientLogos.slice(6, 11), clientLogos.slice(11)];

  return (
    <section aria-labelledby="clients-heading" className="py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1760px] px-5 md:px-10">
        <motion.div
          ref={panel}
          onPointerMove={onMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group/panel relative overflow-hidden rounded-[1.75rem] border border-line"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--t-primary) 10%, var(--t-surface)) 0%, var(--t-surface) 45%, color-mix(in srgb, var(--t-accent-2) 10%, var(--t-surface)) 100%)",
          }}
        >
          {/* texture + spotlight */}
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
            style={{ background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--t-primary) 16%, transparent), transparent 65%)" }}
          />
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:p-14">
            {/* LEFT */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-teal backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                Our clients
              </p>
              <h2 id="clients-heading" className="font-display text-h2 font-semibold tracking-tight">
                Trusted by labs that <span className="text-gradient">can&apos;t afford</span> to get it wrong
              </h2>
              <p className="mt-4 max-w-lg text-mist">
                Global generics leaders, fast-growing biotechs and independent testing labs rely on us for accurate results and audit-ready data.
              </p>

              <QuoteCard active={inView} />

              <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
                <StatRing value={500} suffix="+" label="Labs served" pct={0.82} />
                <StatRing value={22} label="Countries" pct={0.6} />
                <StatRing value={96} suffix="%" label="AMC renewals" pct={0.96} />
              </dl>
            </div>

            {/* RIGHT — tilted 3D logo wall */}
            <div
              aria-label="Client logos"
              className="relative h-[380px] overflow-hidden sm:h-[460px] lg:h-[560px] [perspective:1400px]"
              style={{
                maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 55%, transparent 100%)",
              }}
            >
              <div
                className="absolute inset-[-12%] grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
                style={{ transform: "rotateX(18deg) rotateZ(-10deg) rotateY(-8deg)", transformStyle: "preserve-3d" }}
              >
                {cols.map((col, ci) => (
                  <LogoColumn key={ci} items={col} reverse={ci === 1} duration={[34, 40, 30][ci]} hideOnMobile={ci === 2} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col items-center gap-4 md:mt-10 md:flex-row md:gap-8">
          <p className="shrink-0 text-sm text-mist">
            <span className="font-semibold text-snow">+480 more</span> labs worldwide
          </p>
          <div className="group/row relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex w-max animate-marquee items-center gap-10 group-hover/row:[animation-play-state:paused]" style={{ animationDuration: "45s" }}>
              {[...clientLogos, ...clientLogos].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= clientLogos.length}
                  className="flex items-center gap-2 text-mist/70 transition-colors duration-300 hover:text-[color:var(--brand)]"
                  style={{ ["--brand" as string]: c.color }}
                >
                  <ClientMark mark={c.mark} className="h-6 w-6" />
                  <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A vertical, endlessly scrolling column of client cards. */
function LogoColumn({ items, reverse, duration, hideOnMobile }: { items: ClientLogo[]; reverse?: boolean; duration: number; hideOnMobile?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`group/col relative ${hideOnMobile ? "hidden sm:block" : ""}`}>
      <ul
        className="flex animate-marquee-y flex-col gap-3 group-hover/col:[animation-play-state:paused] sm:gap-4"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {list.map((c, i) => (
          <li key={`${c.name}-${i}`} aria-hidden={i >= items.length}>
            <LogoCard client={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LogoCard({ client }: { client: ClientLogo }) {
  return (
    <div
      className="group/card relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-ink/80 p-4 shadow-[0_10px_30px_var(--t-shadow)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand)] sm:p-5"
      style={{ ["--brand" as string]: client.color }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/card:scale-x-100"
        style={{ background: client.color }}
      />
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
        style={{ background: `color-mix(in srgb, ${client.color} 14%, transparent)`, color: client.color }}
      >
        <ClientMark mark={client.mark} className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-display text-base font-semibold leading-tight sm:text-lg">{client.name}</span>
        <span className="text-xs text-mist">{client.sector}</span>
      </span>
    </div>
  );
}

/** Rotating client quote: auto-advances while on screen, with a progress bar and clickable dots. */
function QuoteCard({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = clientQuotes[i];
  const brand = clientLogos.find((c) => c.name === q.client);

  useEffect(() => {
    if (!active || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % clientQuotes.length), QUOTE_MS);
    return () => window.clearTimeout(id);
  }, [i, active, paused]);

  return (
    <div
      className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-ink/70 p-5 shadow-[0_20px_50px_var(--t-shadow)] backdrop-blur sm:p-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <svg aria-hidden viewBox="0 0 32 32" className="absolute right-5 top-4 h-10 w-10 text-teal/15">
        <path fill="currentColor" d="M10 8C5.6 8 3 11 3 15.5V24h9v-9H7.5c0-2.6 1.2-4 3.5-4V8zm16 0c-4.4 0-7 3-7 7.5V24h9v-9h-4.5c0-2.6 1.2-4 3.5-4V8z" />
      </svg>
      <AnimatePresence mode="wait">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.45 }}
        >
          <blockquote className="pr-8 text-base leading-relaxed sm:text-lg">“{q.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            {brand && (
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `color-mix(in srgb, ${brand.color} 15%, transparent)`, color: brand.color }}>
                <ClientMark mark={brand.mark} className="h-5 w-5" />
              </span>
            )}
            <span className="text-sm">
              <span className="block font-medium">{q.person}</span>
              <span className="text-mist">
                {q.role}, {q.client}
              </span>
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex gap-1.5">
          {clientQuotes.map((_, n) => (
            <button
              key={n}
              aria-label={`Show quote ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-6 bg-teal" : "w-1.5 bg-snow/20 hover:bg-snow/40"}`}
            />
          ))}
        </div>
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-snow/10">
          <motion.div
            key={`${i}-${paused}-${active}`}
            className="h-full origin-left bg-teal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: active && !paused ? 1 : 0 }}
            transition={{ duration: active && !paused ? QUOTE_MS / 1000 : 0, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

/** Count-up number inside a ring that draws to `pct` when scrolled into view. */
function StatRing({ value, suffix = "", label, pct }: { value: number; suffix?: string; label: string; pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
      <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" style={{ stroke: "var(--t-line)" }} />
          <motion.circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ stroke: "var(--t-primary)" }}
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>
      <div>
        <dd className="font-display text-xl font-semibold sm:text-2xl">
          <Counter value={value} suffix={suffix} />
        </dd>
        <dt className="text-xs text-mist">{label}</dt>
      </div>
    </div>
  );
}
