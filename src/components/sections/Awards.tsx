"use client";

import { motion } from "framer-motion";
import { awards } from "@/data/content";

/** Award rows slide in from alternating sides; underline grows on hover. */
export function Awards() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-16 md:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Recognition</p>
      <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">Awards &amp; recognition</h2>
      <ul>
        {awards.map((a, i) => (
          <motion.li
            key={a.title}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative grid grid-cols-[auto_1fr] items-center gap-6 border-b border-line py-7 md:grid-cols-[120px_1fr_1fr]"
          >
            <span className="font-display text-3xl font-semibold text-teal">{a.year}</span>
            <span className="font-display text-xl font-semibold">{a.title}</span>
            <span className="col-span-2 text-mist md:col-span-1 md:text-right">{a.org}</span>
            <span aria-hidden className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
