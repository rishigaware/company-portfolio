import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/offerings/PageIntro";
import { AccessoriesCatalog } from "@/components/offerings/AccessoriesCatalog";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Accessories & Spare Parts",
  description: `Genuine accessories, spare parts, upgrade kits and consumables for ${siteConfig.name} spectrophotometers, dissolution testers, stability chambers and software.`,
  alternates: { canonical: "/accessories" },
  openGraph: { url: "/accessories" },
};

const perks = [
  { t: "Genuine parts", d: "Original parts keep your validation status intact." },
  { t: "Fast dispatch", d: "Common spares ship within 48 hours." },
  { t: "Fitted by engineers", d: "Optional installation and re-qualification." },
];

export default function AccessoriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accessories & Spares", path: "/accessories" }])} />
      <PageIntro
        eyebrow="Accessories & spares"
        title="Keep every instrument running at its best."
        highlight={["running"]}
        lead="Genuine accessories, spare parts, upgrade kits and consumables — searchable by product or part number."
      />
      <section className="mx-auto max-w-[1760px] px-5 pb-10 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="rounded-2xl border border-line p-5">
              <p className="font-display font-semibold">{p.t}</p>
              <p className="mt-1 text-sm text-mist">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-10">
        <AccessoriesCatalog />
      </section>
    </>
  );
}
