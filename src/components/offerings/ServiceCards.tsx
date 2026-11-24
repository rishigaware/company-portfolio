"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/offerings";
import { ServiceIcon } from "./ServiceIcon";

/** Service cards: staggered rise; on hover the icon tile fills and the card lifts. */
export function ServiceCards({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((s, i) => (
        <motion.li
          key={s.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_40px_var(--t-shadow)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-ink">
              <ServiceIcon icon={s.icon} />
            </span>
            <h3 className="mt-6 font-display text-xl font-semibold">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm text-mist">{s.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal">
              Learn more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
