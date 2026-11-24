"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig } from "@/config/site";

// 3D scene is client-only and code-split so it never blocks first paint / LCP.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-teal/5 blur-3xl" />,
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-teal/20 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" />

      <div className="absolute inset-0 opacity-35 md:left-[40%] md:opacity-100">
        <HeroScene />
      </div>

      <motion.div style={{ y: textY, opacity }} className="relative mx-auto w-full max-w-[1760px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-snow/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-teal backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> Instruments · Software · Compliance
        </motion.p>
        <SplitReveal
          as="h1"
          delay={0.5}
          text="Precision for every lab, compliance in every result."
          highlight={["Precision", "compliance"]}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-[3.6rem]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 max-w-xl text-lg text-mist"
        >
          {siteConfig.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <Link href="/products" className="inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-ink transition-transform hover:scale-105">
              Explore products
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="inline-block rounded-full border border-line px-7 py-3.5 font-medium backdrop-blur hover:border-snow">
              Book a demo
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-mist">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-teal" animate={{ y: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}
