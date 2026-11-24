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
    <section ref={ref} className="relative flex flex-col overflow-hidden pt-24 md:pt-28 lg:min-h-[100svh] lg:flex-row lg:items-center">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-teal/20 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" />

      {/* Phones & tablets: the 3D scene sits below the text in its own block. lg+: it fills the right side behind the text. */}
      <div className="relative order-last -mt-4 h-[360px] w-full sm:h-[460px] md:h-[520px] lg:absolute lg:inset-0 lg:left-[40%] lg:mt-0 lg:h-auto">
        <HeroScene />
      </div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto w-full max-w-[1760px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-snow/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-teal backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.2em] md:mb-6"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> Instruments · Software · Compliance
        </motion.p>
        <SplitReveal
          as="h1"
          delay={0.5}
          text="Precision for every lab, compliance in every result."
          highlight={["Precision", "compliance"]}
          className="max-w-3xl font-display text-h1 font-semibold tracking-tight"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-5 max-w-xl text-base text-mist md:mt-6 md:text-lg"
        >
          {siteConfig.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
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

      <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center lg:flex gap-2 text-xs uppercase tracking-widest text-mist">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-teal" animate={{ y: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}
