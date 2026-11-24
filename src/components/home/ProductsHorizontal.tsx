"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { accentText, products } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { TiltCard } from "@/components/ui/TiltCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Section pins while product cards slide horizontally with vertical scroll (desktop). Stacks normally on mobile. */
export function ProductsHorizontal() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 48;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".hp-card").forEach((card) => {
          gsap.from(card.querySelector(".hp-visual"), { scale: 1.15, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="products" className="relative overflow-hidden py-24 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="mx-auto mb-12 flex w-full max-w-[1760px] items-end justify-between px-5 md:px-10">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Our products</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-tight">Built for the modern lab</h2>
        </div>
        <Link href="/products" className="hidden text-sm text-mist underline-offset-4 hover:text-teal hover:underline md:block">
          View all →
        </Link>
      </div>
      <div ref={track} className="flex flex-col gap-6 px-6 md:w-max md:flex-row md:pl-[max(2.5rem,calc((100vw-1760px)/2+2.5rem))]">
        {products.map((p, i) => (
          <TiltCard key={p.slug} glow={p.accent} className="hp-card rounded-2xl md:w-[420px]">
            <Link href={`/products/${p.slug}`} className="block rounded-2xl border border-line bg-ink-2 p-4">
              <div className="overflow-hidden rounded-2xl">
                <ProductVisual product={p} className="hp-visual aspect-[4/3]" />
              </div>
              <div className="p-3 pt-5">
                <p className="text-xs text-mist">0{i + 1} / {p.category}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-mist">{p.summary}</p>
                <span className="mt-4 inline-block text-sm" style={{ color: accentText(p.accent) }}>Learn more →</span>
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
