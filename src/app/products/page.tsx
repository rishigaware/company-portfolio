import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { products } from "@/data/products";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Products — Lab Instruments & GxP Software",
  description: `Explore ${siteConfig.name} laboratory instruments and validated software: spectrophotometers, dissolution testers, stability chambers, LIMS and data integrity tools.`,
  alternates: { canonical: "/products" },
  openGraph: { url: "/products" },
};

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-20 md:pb-32 pt-32 md:pt-36">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/products/${p.slug}`), name: p.name })),
          },
        ]}
      />
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Catalogue</p>
      <SplitReveal as="h1" text="Instruments and software, engineered together." highlight={["together."]} className="mb-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl" />
      <p className="mb-10 max-w-2xl text-base text-mist">Every product works on its own — and works better together, sharing data across a single compliant ecosystem.</p>
      <ProductGrid />
    </section>
  );
}
