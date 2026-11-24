"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { news } from "@/data/content";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

/** News & events cards: staggered rise, hover lift with gradient sweep. */
export function NewsEvents() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-14 md:py-20 lg:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">News &amp; events</p>
      <h2 className="mb-12 font-display text-h2 font-semibold tracking-tight">Latest from the lab</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((n, i) => (
          <motion.article
            key={n.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2"
            data-cursor="hover"
          >
            <div className="relative h-48 overflow-hidden">
              {n.src ? (
                <Image unoptimized={n.src.startsWith("http")} src={n.src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, var(--t-primary), var(--t-accent-2))`, opacity: 0.85 - i * 0.15 }}
                />
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs backdrop-blur">{n.tag}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <time dateTime={n.date} className="text-xs text-mist">{fmt(n.date)}</time>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{n.title}</h3>
              <p className="mt-3 flex-1 text-sm text-mist">{n.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-teal">
                Read more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
