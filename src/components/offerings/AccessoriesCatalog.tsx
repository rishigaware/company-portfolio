"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { accessories, type Accessory } from "@/data/offerings";
import { products } from "@/data/products";

const types: ("All" | Accessory["type"])[] = ["All", "Accessory", "Spare part", "Upgrade kit", "Consumable"];
const typeLabel: Record<(typeof types)[number], string> = { All: "All items", Accessory: "Accessories", "Spare part": "Spare parts", "Upgrade kit": "Upgrade kits", Consumable: "Consumables" };
const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;

/** Filterable, searchable parts catalogue. Every item is in the HTML for SEO; filtering only hides rows. */
export function AccessoriesCatalog() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [product, setProduct] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      accessories.filter(
        (a) =>
          (type === "All" || a.type === type) &&
          (product === "all" || a.forProduct === product) &&
          (q === "" || `${a.name} ${a.sku} ${a.description}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [type, product, q],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by type" className="no-scrollbar flex w-fit max-w-full flex-nowrap overflow-x-auto rounded-full border border-line p-1 sm:flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={type === t}
              onClick={() => setType(t)}
              className={`relative shrink-0 whitespace-nowrap px-4 py-2 text-sm transition-colors ${type === t ? "text-ink" : "text-mist hover:text-snow"}`}
            >
              {type === t && <motion.span layoutId="acc-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{typeLabel[t]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="acc-product">Product</label>
          <select id="acc-product" value={product} onChange={(e) => setProduct(e.target.value)} className="rounded-full border border-line bg-ink px-5 py-2.5 text-sm outline-none focus:border-teal">
            <option value="all">All products</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="acc-search">Search parts</label>
          <input
            id="acc-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or part no."
            className="rounded-full border border-line bg-ink px-5 py-2.5 text-sm outline-none focus:border-teal sm:w-72"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="hidden grid-cols-[120px_1.4fr_1fr_1fr_auto] gap-4 border-b border-line bg-ink-2 px-6 py-3 text-xs uppercase tracking-widest text-mist md:grid">
          <span>Part no.</span>
          <span>Item</span>
          <span>Type</span>
          <span>For product</span>
          <span className="w-28" />
        </div>
        <motion.ul layout>
          <AnimatePresence initial={false}>
            {list.map((a) => (
              <motion.li
                key={a.sku}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-2 border-b border-line px-6 py-5 transition-colors last:border-b-0 hover:bg-ink-2 md:grid-cols-[120px_1.4fr_1fr_1fr_auto] md:items-center md:gap-4"
              >
                <span className="font-mono text-sm text-teal">{a.sku}</span>
                <span>
                  <span className="block font-medium">{a.name}</span>
                  <span className="text-sm text-mist">{a.description}</span>
                </span>
                <span className="text-sm">
                  <span className="inline-block rounded-full border border-line px-3 py-1">{a.type}</span>
                </span>
                <Link href={`/products/${a.forProduct}`} className="text-sm text-mist hover:text-teal">{productName(a.forProduct)}</Link>
                <Link
                  href={`/contact?type=quote&product=${a.forProduct}&part=${a.sku}`}
                  className="w-28 rounded-full border border-teal/50 px-4 py-2 text-center text-sm text-teal transition-colors hover:bg-teal hover:text-ink"
                >
                  Get quote
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="px-6 py-12 text-center text-mist">No parts match your filters.</p>}
      </div>
    </div>
  );
}
