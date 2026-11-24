import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, absoluteUrl } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/offerings/PageIntro";
import { SolutionPanels } from "@/components/offerings/SolutionPanels";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudiesHover } from "@/components/sections/CaseStudiesHover";
import { CtaBand } from "@/components/home/CtaBand";
import { solutions } from "@/data/offerings";

export const metadata: Metadata = {
  title: "Solutions — QC, Stability, R&D and Data Integrity",
  description: `Complete lab solutions from ${siteConfig.name}: pharma QC labs, ICH stability testing, formulation R&D and data-integrity compliance — instruments, software and services combined.`,
  alternates: { canonical: "/solutions" },
  openGraph: { url: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: solutions.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/solutions/${s.slug}`), name: s.name })),
          },
        ]}
      />
      <PageIntro
        eyebrow="Solutions"
        title="Complete solutions for every kind of lab."
        highlight={["every", "kind"]}
        lead="We combine the right instruments, software and services for your workflow — so you buy one outcome, not a pile of parts."
      />
      <section className="mx-auto max-w-[1760px] px-5 pb-16 md:px-10">
        <SolutionPanels />
      </section>

      <section className="mx-auto max-w-[1760px] px-5 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <Link href={`/solutions/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-teal/40">
                <span className="h-1.5 w-12 rounded-full" style={{ background: s.color }} />
                <h2 className="mt-5 font-display text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm text-mist">{s.summary}</p>
                <span className="mt-5 text-sm font-medium text-teal">Explore solution →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CaseStudiesHover />
      <CtaBand />
    </>
  );
}
