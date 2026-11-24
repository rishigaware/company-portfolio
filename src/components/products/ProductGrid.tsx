"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { accentText, products, type ProductCategory } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { TiltCard } from "@/components/ui/TiltCard";

const filters: ("All" | ProductCategory)[] = ["All", "Instrument", "Software", "Consumables"];
const filterLabel = (f: (typeof filters)[number]) => ({ All: "All products", Instrument: "Instruments", Software: "Software", Consumables: "Consumables" })[f];

/** Filterable grid with animated pill + layout (FLIP) transitions. All products are in the HTML for SEO. */
export function ProductGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = products.filter((p) => active === "All" || p.category === active);

  return (
    <>
      <div role="tablist" aria-label="Filter products" className="mb-12 no-scrollbar flex w-fit max-w-full flex-nowrap overflow-x-auto rounded-full border border-line p-1 sm:flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`relative shrink-0 whitespace-nowrap px-4 py-2 text-sm transition-colors sm:px-5 ${active === f ? "text-ink" : "text-mist hover:text-snow"}`}
          >
            {active === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative">{filterLabel(f)}</span>
          </button>
        ))}
      </div>
      <motion.ul layout className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard glow={p.accent} className="h-full rounded-2xl">
                <Link href={`/products/${p.slug}`} className="block h-full rounded-2xl border border-line bg-ink-2 p-4">
                  <ProductVisual product={p} className="aspect-[4/3]" />
                  <div className="p-3 pt-5">
                    <h2 className="font-display text-2xl font-semibold">{p.name}</h2>
                    <p className="mt-1 text-sm" style={{ color: accentText(p.accent) }}>{p.tagline}</p>
                    <p className="mt-3 text-sm text-mist">{p.summary}</p>
                  </div>
                </Link>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
