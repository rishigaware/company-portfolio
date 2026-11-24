"use client";

import { motion } from "framer-motion";

/**
 * Page transition: a curtain wipes away on every route change.
 * (Only opacity is animated on the content wrapper — a transform here would break GSAP pinning.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-gradient-to-b from-teal to-sky"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
