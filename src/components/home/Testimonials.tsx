"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/content";

/** Draggable carousel with momentum. */
export function Testimonials() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (wrap.current && track.current) setLimit(Math.max(0, track.current.scrollWidth - wrap.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto mb-12 flex max-w-[1760px] items-end justify-between px-5 md:px-10">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Testimonials</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-tight">What our customers say</h2>
        </div>
        <p className="hidden text-sm text-mist md:block">← Drag →</p>
      </div>
      <div ref={wrap} className="mx-auto max-w-[1760px] overflow-hidden px-5 md:px-10">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.1}
          className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
          data-cursor="hover"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, rotateY: -25, x: 80 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ transformPerspective: 1000 }}
              className="flex w-[85vw] max-w-[440px] shrink-0 select-none flex-col justify-between rounded-2xl border border-line bg-ink-2 p-8"
            >
              <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal to-violet font-semibold text-ink">
                  {t.name.split(" ").pop()?.[0]}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-sm text-mist">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
