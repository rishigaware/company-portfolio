import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { caseStudies } from "@/data/content";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { GalleryParallax } from "@/components/sections/GalleryParallax";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Case Studies — Customer Success Stories",
  description: `See how pharma, biotech and CRO labs use ${siteConfig.name} instruments and software to release faster, pass audits and scale capacity.`,
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }])} />
      <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-12 pt-32 md:pt-36">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Portfolio</p>
        <SplitReveal as="h1" text="Results our customers can measure." highlight={["measure."]} className="max-w-4xl font-display text-h1 font-semibold tracking-tight" />
        <p className="mt-5 max-w-2xl text-base text-mist">Real outcomes from labs that moved to our instruments and software. (Dummy content.)</p>
      </section>

      <div className="mx-auto max-w-[1760px] space-y-10 px-5 md:px-10 pb-24">
        {caseStudies.map((c, i) => (
          <article key={c.slug} id={c.slug} className="scroll-mt-28 md:sticky md:top-24">
            <Reveal y={80}>
              <div className="grid overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_-20px_60px_var(--t-shadow)] md:grid-cols-[1fr_1.2fr]">
                <div className="relative min-h-[240px] p-8 text-white" style={{ background: `linear-gradient(150deg, ${c.color}, ${c.color}99)` }}>
                  <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
                  <div className="relative flex h-full flex-col justify-between">
                    <p className="text-sm uppercase tracking-widest opacity-80">0{i + 1} · {c.industry} · {c.year}</p>
                    <div>
                      <p className="font-display text-4xl font-bold">{c.client}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.products.map((p) => (
                          <li key={p} className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h2 className="font-display text-3xl font-semibold">{c.title}</h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-mist">Challenge</h3>
                      <p className="mt-2">{c.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-mist">Solution</h3>
                      <p className="mt-2">{c.solution}</p>
                    </div>
                  </div>
                  <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                    {c.results.map((r) => (
                      <div key={r.label}>
                        <dd className="font-display text-3xl font-semibold" style={{ color: c.color }}>{r.value}</dd>
                        <dt className="text-sm text-mist">{r.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      <GalleryParallax />

      <div className="text-center">
        <Link href="/contact" className="inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-ink">Discuss your project</Link>
      </div>
      <CtaBand />
    </>
  );
}
