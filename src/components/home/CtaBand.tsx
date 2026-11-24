"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";

/** Two rows of oversized text moving in opposite directions with scroll, plus CTA. */
export function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);

  return (
    <section ref={ref} className="overflow-hidden py-14 md:py-20 lg:py-24">
      <div aria-hidden className="font-display text-[9vw] font-bold leading-none tracking-tighter whitespace-nowrap">
        <motion.p style={{ x: x1 }} className="text-snow/10">Measure · Comply · Deliver · Measure ·</motion.p>
        <motion.p style={{ x: x2 }} className="text-gradient">Let&apos;s build your lab ·  Let&apos;s build your lab ·</motion.p>
      </div>
      <div className="mt-16 flex flex-col items-center gap-6 px-6 text-center">
        <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight">Ready to upgrade your lab?</h2>
        <p className="max-w-lg text-mist">Talk to an application specialist — get a tailored quote or a live product demo within 48 hours.</p>
        <Magnetic>
          <Link href="/contact" className="inline-flex h-36 w-36 items-center justify-center rounded-full bg-teal text-center font-medium text-ink transition-transform hover:scale-110">
            Contact us
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
