"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { ThemeControls } from "@/components/theme/ThemeControls";
import { MegaPanel } from "./MegaPanels";
import { MobileDrawer } from "./MobileDrawer";
import { topNav, isActive, type MegaId } from "./nav-config";

/**
 * Site header
 *  - lg+: utility top bar (folds away on scroll) + main bar with mega-menus,
 *         a hover highlight that glides between items and an underline on the active section.
 *  - < lg: compact bar + slide-in drawer (see MobileDrawer).
 *  - Transparent at the very top, frosted compact bar after scrolling; hides on scroll down, returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState<MegaId | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !drawer && !mega);
    setScrolled(y > 24);
  });

  // Close menus after navigating.
  useEffect(() => {
    setMega(null);
    setDrawer(false);
  }, [pathname]);

  // Hover intent: small delay before closing so moving the pointer into the panel doesn't flicker.
  const openMega = (id: MegaId | undefined) => {
    window.clearTimeout(closeTimer.current);
    setMega(id ?? null);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setMega(null);
      setHovered(null);
    }, 140);
  };

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const closeDrawer = useCallback(() => setDrawer(false), []);
  // Pages whose hero is a solid colour block need a solid header from the start for contrast.
  const colouredHero = /^\/solutions\/.+/.test(pathname);
  const solid = scrolled || !!mega || colouredHero;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={scheduleClose}
      >
        {/* Utility top bar (desktop only) */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="hidden overflow-hidden border-b border-line/60 lg:block"
        >
          <div className="mx-auto flex max-w-[1760px] items-center justify-between px-10 py-2 text-xs text-mist">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              ISO 9001:2015 · GAMP 5 · 21 CFR Part 11 ready
            </p>
            <div className="flex items-center gap-5">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-teal">{siteConfig.contact.phone}</a>
              <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-teal">{siteConfig.contact.email}</a>
              <span className="h-3 w-px bg-line" />
              <Link href="/downloads" className="transition-colors hover:text-teal">Downloads</Link>
              <Link href="/services" className="transition-colors hover:text-teal">Support</Link>
            </div>
          </div>
        </motion.div>

        {/* Main bar */}
        <div
          className={`relative transition-[background-color,box-shadow,border-color] duration-300 ${
            solid
              ? "border-b border-line bg-ink/85 shadow-[0_8px_30px_var(--t-shadow)] backdrop-blur-xl"
              : "border-b border-line bg-ink/85 backdrop-blur-xl lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"
          }`}
        >
          <nav aria-label="Main" className={`mx-auto flex max-w-[1760px] items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-10 ${scrolled ? "h-16" : "h-[72px] lg:h-20"}`}>
            {/* Logo */}
            <Link href="/" aria-label={`${siteConfig.name} home`} className="group flex shrink-0 items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-2 ring-1 ring-line transition-transform duration-300 group-hover:rotate-[-8deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.svg" alt="" width={26} height={26} />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base font-bold tracking-tight sm:text-lg">{siteConfig.name}</span>
                <span className="hidden text-[10px] uppercase tracking-[0.18em] text-mist sm:block">Life science instruments</span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
              {topNav.map((item) => {
                const active = isActive(item, pathname);
                const isOpen = mega === item.mega && !!item.mega;
                return (
                  <li key={item.label} className="relative" onMouseEnter={() => { setHovered(item.label); openMega(item.mega); }}>
                    {hovered === item.label && (
                      <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-ink-2 ring-1 ring-line" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                    )}
                    {item.mega ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => setMega(isOpen ? null : item.mega!)}
                        onFocus={() => openMega(item.mega)}
                        className={`relative z-10 flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${active || isOpen ? "text-snow" : "text-mist hover:text-snow"}`}
                      >
                        {item.label}
                        <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                          <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onFocus={() => setMega(null)}
                        className={`relative z-10 block px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${active ? "text-snow" : "text-mist hover:text-snow"}`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {active && (
                      <motion.span layoutId="nav-active" className="absolute -bottom-1 left-1/2 z-10 h-[3px] w-5 -translate-x-1/2 rounded-full bg-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ThemeControls />
              <span className="mx-1 hidden h-6 w-px bg-line xl:block" />
              <div className="hidden xl:block">
                <Magnetic strength={0.25}>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-ink shadow-[0_6px_20px_color-mix(in_srgb,var(--t-primary)_35%,transparent)] transition-transform hover:scale-[1.03]"
                  >
                    Request a quote
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </Link>
                </Magnetic>
              </div>
              <button
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-teal lg:hidden"
                aria-label="Open menu"
                aria-expanded={drawer}
                onClick={() => setDrawer(true)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M4 7h16M4 12h16M10 17h10" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mega-menu panel (desktop) */}
          <AnimatePresence>
            {mega && (
              <motion.div
                key="mega"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => window.clearTimeout(closeTimer.current)}
                className="absolute inset-x-0 top-full hidden border-b border-line bg-ink/95 shadow-[0_30px_60px_var(--t-shadow)] backdrop-blur-xl lg:block"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mega}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18 }}
                    className="mx-auto max-w-[1760px] px-10 py-8"
                  >
                    <MegaPanel id={mega} onNavigate={() => setMega(null)} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Dim the page behind an open mega-menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={scheduleClose}
            onClick={() => setMega(null)}
            className="fixed inset-0 z-40 hidden bg-black/20 backdrop-blur-[2px] lg:block"
          />
        )}
      </AnimatePresence>

      <MobileDrawer open={drawer} onClose={closeDrawer} pathname={pathname} />
    </>
  );
}
