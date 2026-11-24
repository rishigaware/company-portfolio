"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/content";
import { Magnetic } from "@/components/motion/Magnetic";
import { ThemeControls } from "@/components/theme/ThemeControls";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 20);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-10 md:pt-4"
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1760px] items-center justify-between rounded-2xl border px-5 py-3 transition-colors duration-300 ${
          scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={28} height={28} />
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href} className="relative">
                <Link href={l.href} className={`relative z-10 block px-4 py-2 text-sm transition-colors ${active ? "text-ink" : "text-mist hover:text-snow"}`}>
                  {l.label}
                </Link>
                {active && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeControls />
          <div className="hidden xl:block">
            <Magnetic>
              <Link href="/contact" className="ml-1 inline-block rounded-full border border-teal/50 px-5 py-2 text-sm text-teal transition-colors hover:bg-teal hover:text-ink">
                Request a quote
              </Link>
            </Magnetic>
          </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-0.5 w-6 bg-snow" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="h-0.5 w-6 bg-snow" />
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 -z-10 flex flex-col justify-center gap-4 bg-ink-2 px-8 lg:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl font-semibold">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
