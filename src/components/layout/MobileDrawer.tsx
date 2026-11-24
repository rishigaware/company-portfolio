"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { services, solutions } from "@/data/offerings";
import { topNav, resourceLinks, isActive, type MegaId } from "./nav-config";

type Lenisish = { stop: () => void; start: () => void };

const sub: Record<MegaId, { href: string; label: string; hint?: string }[]> = {
  products: [...products.map((p) => ({ href: `/products/${p.slug}`, label: p.name, hint: p.category })), { href: "/products", label: "All products →" }],
  solutions: [...solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name })), { href: "/solutions", label: "All solutions →" }],
  services: [...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })), { href: "/services", label: "All services →" }],
  resources: resourceLinks.map((r) => ({ href: r.href, label: r.label })),
};

/** Slide-in drawer for phones & tablets (< lg). Rendered in a portal so the header's transform can't clip it. */
export function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<MegaId | null>(null);

  useEffect(() => setMounted(true), []);

  // Lock page scroll while open (Lenis + native), close on Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Open the section for the current page by default.
  useEffect(() => {
    if (open) setExpanded(topNav.find((t) => t.mega && isActive(t, pathname))?.mega ?? null);
  }, [open, pathname]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            aria-label="Mobile"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[min(88vw,400px)] flex-col bg-ink shadow-[-20px_0_60px_var(--t-shadow)]"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-2 font-display font-semibold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.svg" alt="" width={26} height={26} />
                {siteConfig.name}
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-teal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-3 py-3">
              {[{ label: "Home", href: "/" } as (typeof topNav)[number], ...topNav].map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : isActive(item, pathname);
                const isOpen = item.mega && expanded === item.mega;
                return (
                  <motion.li key={item.label} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.035 }}>
                    {item.mega ? (
                      <>
                        <button
                          onClick={() => setExpanded(isOpen ? null : item.mega!)}
                          aria-expanded={!!isOpen}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left font-display text-lg font-semibold transition-colors hover:bg-ink-2 ${active ? "text-teal" : ""}`}
                        >
                          {item.label}
                          <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} viewBox="0 0 24 24" className="h-4 w-4 text-mist" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                            <path d="M6 9l6 6 6-6" />
                          </motion.svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="ml-3 overflow-hidden border-l border-line pl-3"
                            >
                              {sub[item.mega].map((s) => (
                                <li key={s.href + s.label}>
                                  <Link
                                    href={s.href}
                                    onClick={onClose}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-ink-2 ${pathname === s.href ? "font-medium text-teal" : "text-mist hover:text-snow"}`}
                                  >
                                    {s.label}
                                    {s.hint && <span className="text-[11px] uppercase tracking-wider text-mist/70">{s.hint}</span>}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-lg font-semibold transition-colors hover:bg-ink-2 ${active ? "text-teal" : ""}`}
                      >
                        {item.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-teal" />}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-line p-5">
              <Link href="/contact" onClick={onClose} className="block rounded-full bg-teal py-3.5 text-center font-medium text-ink">
                Request a quote
              </Link>
              <div className="flex flex-wrap justify-between gap-2 text-sm text-mist">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-teal">{siteConfig.contact.phone}</a>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal">{siteConfig.contact.email}</a>
              </div>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
