"use client";

import { motion } from "framer-motion";
import { team } from "@/data/content";

/** Leadership cards that flip in 3D on hover / focus to show a short bio. */
export function Team() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-16 md:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Leadership</p>
      <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">The people behind the precision</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => {
          const initials = m.name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");
          return (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group h-72 [perspective:1000px]"
              tabIndex={0}
            >
              <div className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 [backface-visibility:hidden]">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 flex h-48 items-center justify-center font-display text-5xl font-bold text-white"
                    style={{ background: `linear-gradient(135deg, var(--t-primary), ${i % 2 ? "var(--t-accent-2)" : "var(--t-accent)"})` }}
                  >
                    {initials}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                  <p className="text-sm text-mist">{m.role}</p>
                </div>
                <div className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-teal p-6 text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="font-display text-xl font-semibold">{m.name}</p>
                  <p className="mt-1 text-sm opacity-80">{m.role}</p>
                  <p className="mt-4">{m.bio}</p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
