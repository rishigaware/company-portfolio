"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { siteConfig } from "@/config/site";
import { flatNavLinks, navLinks } from "@/data/content";
import { Magnetic } from "@/components/motion/Magnetic";
import { ThemeControls } from "@/components/theme/ThemeControls";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 20);
    if (Math.abs(y - prev) > 2) setMenu(null);
  });

  // Close any open dropdown after navigating.
  useEffect(() => setMenu(null), [pathname]);

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
            const paths = l.children ? l.children.map((c) => c.href) : [l.href];
            const active = paths.some((p) => pathname.startsWith(p));
            return (
              <li
                key={l.label}
                className="relative"
                onPointerEnter={() => l.children && setMenu(l.label)}
                onPointerLeave={() => l.children && setMenu(null)}
              >
                {l.children ? (
                  <button
                    type="button"
                    aria-expanded={menu === l.label}
                    aria-haspopup="true"
                    onClick={() => setMenu(menu === l.label ? null : l.label)}
                    className={`relative z-10 flex items-center gap-1 px-4 py-2 text-sm transition-colors ${active ? "text-ink" : "text-mist hover:text-snow"}`}
                  >
                    {l.label}
                    <motion.svg animate={{ rotate: menu === l.label ? 180 : 0 }} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </button>
                ) : (
                  <Link href={l.href} className={`relative z-10 block px-4 py-2 text-sm transition-colors ${active ? "text-ink" : "text-mist hover:text-snow"}`}>
                    {l.label}
                  </Link>
                )}
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}

                <AnimatePresence>
                  {l.children && menu === l.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                    >
                      <ul className="rounded-2xl border border-line bg-ink p-2 shadow-[0_20px_60px_var(--t-shadow)]">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={() => setMenu(null)} className="block rounded-xl px-4 py-3 transition-colors hover:bg-ink-2">
                              <span className="block text-sm font-medium">{c.label}</span>
                              {c.desc && <span className="block text-xs text-mist">{c.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink-2 px-6 pb-10 pt-24 sm:px-10 lg:hidden"
          >
            {/* Mobile menu includes Home (the desktop menu uses the logo instead) */}
            <ul className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...flatNavLinks].map((l, i) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-3.5 font-display text-xl font-semibold sm:text-2xl ${active ? "text-teal" : ""}`}
                    >
                      {l.label}
                      <span aria-hidden className="text-base text-mist">→</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
              <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-full bg-teal py-3.5 text-center font-medium text-ink">
                Request a quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
