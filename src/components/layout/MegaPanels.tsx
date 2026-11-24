"use client";

import Link from "next/link";
import { products, type ProductCategory } from "@/data/products";
import { services, solutions } from "@/data/offerings";
import { news } from "@/data/content";
import { ServiceIcon } from "@/components/offerings/ServiceIcon";
import { resourceLinks, type MegaId } from "./nav-config";

const categories: { key: ProductCategory; title: string }[] = [
  { key: "Instrument", title: "Instruments" },
  { key: "Software", title: "Software" },
  { key: "Consumables", title: "Consumables" },
];

function ResourceIcon({ icon }: { icon: (typeof resourceLinks)[number]["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {icon === "chart" && <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />}
      {icon === "box" && <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />}
      {icon === "file" && <path d="M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6" />}
    </svg>
  );
}

/** Highlighted call-to-action card shown at the right of each mega-menu. */
function FeatureCard({ eyebrow, title, text, href, cta }: { eyebrow: string; title: string; text: string; href: string; cta: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 text-white" style={{ background: "linear-gradient(150deg, var(--t-primary), color-mix(in srgb, var(--t-accent-2) 70%, var(--t-primary)))" }}>
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/75">{eyebrow}</p>
        <p className="mt-2 font-display text-lg font-semibold leading-snug">{title}</p>
        <p className="mt-2 text-sm text-white/80">{text}</p>
      </div>
      <Link href={href} className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b1324] transition-transform hover:scale-105">
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export function MegaPanel({ id, onNavigate }: { id: MegaId; onNavigate: () => void }) {
  if (id === "products") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_280px]">
        {categories.map((cat) => (
          <div key={cat.key}>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mist">{cat.title}</p>
            <ul className="space-y-1">
              {products
                .filter((p) => p.category === cat.key)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} onClick={onNavigate} className="group flex gap-3 rounded-lg p-2.5 transition-colors hover:bg-ink-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: p.accent }} />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium transition-colors group-hover:text-teal">{p.name}</span>
                        <span className="line-clamp-1 text-xs text-mist">{p.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <FeatureCard eyebrow="Need advice?" title="Not sure which system fits your lab?" text="Our application specialists recommend the right set-up in one call." href="/contact?type=demo" cta="Book a demo" />
        <div className="lg:col-span-3">
          <Link href="/products" onClick={onNavigate} className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline">
            View all products <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (id === "solutions") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <ul className="grid gap-2 sm:grid-cols-2">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href={`/solutions/${s.slug}`} onClick={onNavigate} className="group flex h-full gap-4 rounded-xl p-4 transition-colors hover:bg-ink-2">
                <span className="mt-1 h-10 w-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
                <span>
                  <span className="block font-display font-semibold transition-colors group-hover:text-teal">{s.name}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-mist">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <FeatureCard eyebrow="Complete solutions" title="Instruments, software and services — one partner." text="Explore how we combine them for each type of lab." href="/solutions" cta="All solutions" />
      </div>
    );
  }

  if (id === "services") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <ul className="grid gap-1 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} onClick={onNavigate} className="group flex gap-3 rounded-xl p-3.5 transition-colors hover:bg-ink-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-ink">
                  <ServiceIcon icon={s.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{s.name}</span>
                  <span className="line-clamp-2 text-xs text-mist">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <FeatureCard eyebrow="Annual maintenance" title="One AMC covers visits, parts and reports." text="Predictable cost, priority response, maximum uptime." href="/services/preventive-maintenance-amc" cta="Explore AMC" />
      </div>
    );
  }

  // resources
  const latest = news[0];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <ul className="grid gap-2 sm:grid-cols-3">
        {resourceLinks.map((r) => (
          <li key={r.href}>
            <Link href={r.href} onClick={onNavigate} className="group flex h-full flex-col gap-3 rounded-xl border border-line p-5 transition-colors hover:border-teal/40 hover:bg-ink-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-ink">
                <ResourceIcon icon={r.icon} />
              </span>
              <span>
                <span className="block font-medium">{r.label}</span>
                <span className="text-sm text-mist">{r.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-line bg-ink-2 p-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mist">Latest news · {latest.tag}</p>
        <p className="mt-2 font-display font-semibold leading-snug">{latest.title}</p>
        <p className="mt-2 text-sm text-mist">{latest.text}</p>
      </div>
    </div>
  );
}
