"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { downloads, type Download } from "@/data/offerings";
import { products } from "@/data/products";

const kinds: ("All" | Download["kind"])[] = ["All", "Brochure", "Datasheet", "Manual", "Whitepaper", "Certificate"];
const productName = (slug?: string) => (slug ? products.find((p) => p.slug === slug)?.name : undefined);

/** Document library with type filter + search. Files are requested via the contact form (lead capture). */
export function DownloadsLibrary() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      downloads.filter(
        (d) => (kind === "All" || d.kind === kind) && (q === "" || `${d.title} ${productName(d.product) ?? ""}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [kind, q],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by document type" className="no-scrollbar flex w-fit max-w-full flex-nowrap overflow-x-auto rounded-full border border-line p-1 sm:flex-wrap">
          {kinds.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={`relative shrink-0 whitespace-nowrap px-4 py-2 text-sm transition-colors ${kind === k ? "text-ink" : "text-mist hover:text-snow"}`}
            >
              {kind === k && <motion.span layoutId="dl-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{k === "All" ? "All documents" : `${k}s`}</span>
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="dl-search">Search documents</label>
        <input
          id="dl-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documents"
          className="rounded-full border border-line bg-ink px-5 py-2.5 text-sm outline-none focus:border-teal lg:w-80"
        />
      </div>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((d) => (
            <motion.li
              key={d.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex gap-4 rounded-2xl border border-line bg-ink-2 p-5 transition-colors hover:border-teal/40"
            >
              {/* File icon with folded corner */}
              <span className="relative flex h-16 w-12 shrink-0 items-end justify-center rounded-md bg-teal/10 pb-2 text-[10px] font-semibold text-teal transition-transform duration-300 group-hover:-rotate-6">
                <span aria-hidden className="absolute right-0 top-0 h-3 w-3 rounded-bl-md bg-teal/30" />
                PDF
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs uppercase tracking-widest text-mist">{d.kind} · {d.year}</span>
                <span className="mt-1 font-medium leading-snug">{d.title}</span>
                {productName(d.product) && <span className="mt-1 text-sm text-mist">{productName(d.product)}</span>}
                <span className="mt-auto flex items-center justify-between pt-3 text-sm">
                  <span className="text-mist">{d.size}</span>
                  <Link href={`/contact?type=quote&download=${d.slug}`} className="inline-flex items-center gap-1 font-medium text-teal">
                    Request
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
                    </svg>
                  </Link>
                </span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="py-12 text-center text-mist">No documents match your search.</p>}
    </div>
  );
}
