"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { accentText, products, type ProductCategory } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { TiltCard } from "@/components/ui/TiltCard";

const filters: ("All" | ProductCategory)[] = ["All", "Instrument", "Software"];

/** Filterable grid with animated pill + layout (FLIP) transitions. All products are in the HTML for SEO. */
export function ProductGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = products.filter((p) => active === "All" || p.category === active);

  return (
    <>
      <div role="tablist" aria-label="Filter products" className="mb-12 inline-flex rounded-full border border-line p-1">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`relative px-5 py-2 text-sm transition-colors ${active === f ? "text-ink" : "text-mist hover:text-snow"}`}
          >
            {active === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative">{f === "All" ? "All products" : `${f}s`}</span>
          </button>
        ))}
      </div>
      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
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
