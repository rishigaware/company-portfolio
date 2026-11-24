"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/content";

/** Accordion UI (client). Wrapped by <Faq/> which adds the FAQPage structured data on the server. */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto grid max-w-[1760px] gap-12 px-5 md:px-10 py-20 md:py-24 md:grid-cols-[1fr_1.6fr]">
      <div className="md:sticky md:top-32 md:self-start">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">FAQ</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Questions labs ask us</h2>
        <p className="mt-4 text-mist">Can&apos;t find your answer? Our specialists reply within one business day.</p>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-teal"
                >
                  {f.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-xl leading-none">
                    +
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-mist">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
