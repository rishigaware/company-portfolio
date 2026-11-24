import { clients } from "@/data/content";

/** Infinite logo strip (pure CSS, pauses on hover). */
export function Marquee() {
  const row = [...clients, ...clients];
  return (
    <section aria-label="Trusted by" className="border-y border-line py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-mist">Trusted by leading labs</p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <ul className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <li key={i} aria-hidden={i >= clients.length} className="font-display text-2xl font-semibold whitespace-nowrap text-snow/30 transition-colors hover:text-teal">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
