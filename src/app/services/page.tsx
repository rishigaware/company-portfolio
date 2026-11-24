import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/offerings/PageIntro";
import { ServiceCards } from "@/components/offerings/ServiceCards";
import { ProcessLine } from "@/components/home/ProcessLine";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/data/offerings";
import { absoluteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Services — Installation, Calibration, Validation & AMC",
  description: `${siteConfig.name} services: installation, calibration, IQ/OQ/PQ validation, preventive maintenance (AMC), training and validated cloud hosting for lab instruments and software.`,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/services/${s.slug}`), name: s.name })),
          },
        ]}
      />
      <PageIntro
        eyebrow="Services"
        title="Support for every instrument, through its whole life."
        highlight={["whole", "life."]}
        lead="From installation and validation to calibration, maintenance and training — one accountable team keeps your lab running and audit-ready."
      />
      <section className="mx-auto max-w-[1760px] px-5 pb-16 md:px-10">
        <ServiceCards />
      </section>

      <section className="mx-auto max-w-[1760px] px-5 md:px-10">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal">Annual maintenance contracts</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">One contract. Every visit, part and report covered.</h2>
            <p className="mt-3 text-mist">Bundle preventive maintenance, calibration and priority breakdown support under a single AMC with predictable yearly cost.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact?type=quote" className="rounded-full bg-teal px-6 py-3 text-sm font-medium text-ink">Get an AMC quote</Link>
            <Link href="/services/preventive-maintenance-amc" className="rounded-full border border-line px-6 py-3 text-sm font-medium hover:border-teal">What&apos;s included</Link>
          </div>
        </div>
      </section>

      <ProcessLine />
      <CtaBand />
    </>
  );
}
