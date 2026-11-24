"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { accentText, type Product } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";

const hotspots = [
  { x: 30, y: 40 },
  { x: 70, y: 35 },
  { x: 65, y: 62 },
  { x: 40, y: 72 },
];

/** Product visual stays pinned while features scroll past; the active feature lights its hotspot. */
export function FeatureWalkthrough({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-16 md:py-24">
      <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">Key features</h2>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-28 md:h-[70vh]">
          <div className="relative">
            <motion.div key={active} initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <ProductVisual product={product} className="aspect-square" />
            </motion.div>
            {hotspots.map((h, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ left: `${h.x}%`, top: `${h.y}%`, background: product.accent }}
                animate={{ scale: active === i ? 1.3 : 0.6, opacity: active === i ? 1 : 0.4 }}
              >
                {active === i && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: product.accent }}
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                  />
                )}
              </motion.span>
            ))}
          </div>
        </div>
        <ol>
          {product.features.map((f, i) => (
            <motion.li
              key={f.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              animate={{ opacity: active === i ? 1 : 0.3 }}
              className="flex min-h-[50vh] flex-col justify-center border-l-2 pl-8 transition-colors"
              style={{ borderColor: active === i ? product.accent : "var(--t-line)" }}
            >
              <span className="text-sm" style={{ color: accentText(product.accent) }}>Feature 0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-base text-mist">{f.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
