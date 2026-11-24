import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Reveal } from "@/components/motion/Reveal";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProcessLine } from "@/components/home/ProcessLine";
import { Certifications } from "@/components/home/Certifications";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { Team } from "@/components/sections/Team";
import { Awards } from "@/components/sections/Awards";
import { GlobalPresence } from "@/components/sections/GlobalPresence";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}: our mission, values and the team building precision lab instruments and compliant software since ${siteConfig.foundedYear}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const values = [
  { title: "Precision", text: "We obsess over the decimal places so your results are never in doubt." },
  { title: "Integrity", text: "Data integrity is designed in, not bolted on." },
  { title: "Partnership", text: "We succeed when your audits pass and your batches release on time." },
];

// Placeholder milestones — replace with your company history.
const milestones = [
  { year: siteConfig.foundedYear, text: "Founded with our first UV-Vis spectrophotometer." },
  { year: siteConfig.foundedYear + 4, text: "Launched dissolution and stability product lines." },
  { year: siteConfig.foundedYear + 8, text: "Released LabSphere LIMS, our first software platform." },
  { year: siteConfig.foundedYear + 12, text: "Expanded service network to 22 countries." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-16 pt-28 md:pt-36 lg:pt-44">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">About {siteConfig.name}</p>
        <SplitReveal as="h1" text="We make lab work measurable, traceable and effortless." highlight={["measurable,", "traceable"]} className="max-w-4xl font-display text-h1 font-semibold tracking-tight" />
      </section>

      <AboutIntro />

      <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-16 md:py-24">
        <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">Our values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.15} className="rounded-2xl border border-line bg-ink-2 p-8">
              <h3 className="font-display text-2xl font-semibold text-gradient">{v.title}</h3>
              <p className="mt-3 text-mist">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-16 md:py-24">
        <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">Milestones</h2>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {milestones.map((m, i) => (
            <li key={m.year} className="bg-ink">
              <Reveal delay={i * 0.12} className="h-full p-8">
                <p className="font-display text-4xl font-semibold text-teal">{m.year}</p>
                <p className="mt-3 text-mist">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-5 md:px-10 py-16 md:py-24">
        <ScrollFillText className="font-display text-3xl font-medium leading-snug" text="Our mission is simple: give every scientist instruments they can trust and software that gets out of their way — so they can focus on the science." />
      </section>

      <Team />
      <Awards />
      <GlobalPresence />
      <ProcessLine />
      <Certifications />
      <CtaBand />
    </>
  );
}
