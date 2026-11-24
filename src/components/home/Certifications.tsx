"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/content";

/** Badges flip in on scroll. */
export function Certifications() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-16">
      <h2 className="mb-10 text-center text-xs uppercase tracking-[0.3em] text-mist">Certified &amp; compliant</h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {certifications.map((c, i) => (
          <motion.li
            key={c}
            initial={{ rotateX: 90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 600 }}
            className="flex h-24 items-center justify-center rounded-2xl border border-line bg-snow/[0.02] text-center text-sm font-medium"
          >
            {c}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
