"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Words to colour with the animated gradient */
  highlight?: string[];
};

/**
 * Word-by-word masked reveal. The full text is real DOM text (each word in a span),
 * so crawlers and screen readers read the heading normally.
 */
export function SplitReveal({ text, className, as = "h2", delay = 0, highlight = [] }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(w.replace(/[^\w-]/g, "")) ? "text-gradient" : ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
