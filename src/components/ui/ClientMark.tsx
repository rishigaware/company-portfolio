import type { ClientLogo } from "@/data/content";

/** Placeholder logo mark (SVG). Swap for <img src="/clients/xyz.svg"> when real logos are available. */
export function ClientMark({ mark, className = "h-8 w-8" }: { mark: ClientLogo["mark"]; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      {mark === "hexagon" && (
        <>
          <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" {...p} />
          <circle cx="16" cy="16" r="4" fill="currentColor" />
        </>
      )}
      {mark === "ring" && (
        <>
          <circle cx="16" cy="16" r="11" {...p} />
          <circle cx="16" cy="16" r="5" {...p} />
        </>
      )}
      {mark === "leaf" && (
        <>
          <path d="M6 26C6 13 14 5 27 5c0 13-8 21-21 21z" {...p} />
          <path d="M6 26L19 13" {...p} />
        </>
      )}
      {mark === "cross" && <path d="M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z" {...p} />}
      {mark === "drop" && (
        <>
          <path d="M16 3c6 8 9 12.5 9 16a9 9 0 0 1-18 0c0-3.5 3-8 9-16z" {...p} />
          <path d="M12 20a4 4 0 0 0 4 4" {...p} />
        </>
      )}
      {mark === "triangle" && (
        <>
          <path d="M16 4l13 23H3z" {...p} />
          <path d="M16 13l5 9H11z" fill="currentColor" />
        </>
      )}
      {mark === "helix" && (
        <>
          <path d="M9 3c0 7 14 7 14 13S9 22 9 29" {...p} />
          <path d="M23 3c0 7-14 7-14 13s14 6 14 13" {...p} />
          <path d="M11 8h10M11 24h10" {...p} />
        </>
      )}
      {mark === "square" && (
        <>
          <rect x="5" y="5" width="22" height="22" rx="6" {...p} />
          <path d="M11 16h10M16 11v10" {...p} />
        </>
      )}
    </svg>
  );
}

/** Logo lock-up: mark + wordmark. Greyscale by default, brand colour on hover (parent needs `group`). */
export function ClientLockup({ client, size = "md" }: { client: ClientLogo; size?: "sm" | "md" }) {
  return (
    <span className="flex items-center gap-2.5 text-mist transition-colors duration-300" style={{ ["--brand" as string]: client.color }}>
      <span className="transition-colors duration-300 group-hover:text-[var(--brand)]">
        <ClientMark mark={client.mark} className={size === "sm" ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8"} />
      </span>
      <span className={`whitespace-nowrap font-display font-semibold tracking-tight transition-colors duration-300 group-hover:text-snow ${size === "sm" ? "text-base" : "text-lg"}`}>
        {client.name}
      </span>
    </span>
  );
}
