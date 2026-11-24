import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accentText, getProduct, products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema, productSchema } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { FeatureWalkthrough } from "@/components/products/FeatureWalkthrough";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name} — ${p.tagline}`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { type: "website", url: `/products/${p.slug}`, title: `${title} | ${siteConfig.name}`, description: p.summary },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug && x.industries.some((i) => p.industries.includes(i))).slice(0, 3);

  return (
    <article>
      <JsonLd
        data={[
          productSchema(p),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: p.name, path: `/products/${p.slug}` },
          ]),
        ]}
      />

      <header className="relative mx-auto grid max-w-[1760px] items-center gap-12 px-5 md:px-10 pb-16 pt-32 md:pt-36 md:grid-cols-2">
        <div aria-hidden className="absolute left-0 top-20 h-96 w-96 rounded-full blur-[140px]" style={{ background: `${p.accent}33` }} />
        <div className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mist">
            <Link href="/" className="hover:text-snow">Home</Link> / <Link href="/products" className="hover:text-snow">Products</Link> /{" "}
            <span className="text-snow">{p.name}</span>
          </nav>
          <p className="mb-3 text-xs uppercase tracking-[0.3em]" style={{ color: accentText(p.accent) }}>{p.category}</p>
          <SplitReveal as="h1" text={p.name} className="font-display text-4xl font-semibold tracking-tight md:text-[3.4rem]" />
          <Reveal delay={0.3}>
            <p className="mt-4 text-xl">{p.tagline}</p>
            <p className="mt-4 text-mist">{p.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic>
                <Link href={`/contact?product=${p.slug}`} className="inline-block rounded-full px-7 py-3.5 font-medium text-[#0b1324]" style={{ background: p.accent }}>
                  Request a quote
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={`/contact?product=${p.slug}&type=demo`} className="inline-block rounded-full border border-line px-7 py-3.5 font-medium hover:border-snow">
                  Book a demo
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={60}>
          <ProductVisual product={p} className="aspect-[4/3]" />
        </Reveal>
      </header>

      <FeatureWalkthrough product={p} />

      <section className="mx-auto max-w-[1760px] px-5 md:px-10 py-24">
        <h2 className="mb-10 font-display text-4xl font-semibold">Technical specifications</h2>
        <dl className="divide-y divide-line border-y border-line">
          {p.specs.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} y={20} className="grid grid-cols-2 py-5">
              <dt className="text-mist">{s.label}</dt>
              <dd className="font-medium">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-2">
          {p.industries.map((i) => (
            <span key={i} className="rounded-full border border-line px-4 py-1.5 text-sm text-mist">{i}</span>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-32">
          <h2 className="mb-10 font-display text-3xl font-semibold">Works well with</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <li key={r.slug}>
                <Reveal delay={i * 0.1}>
                  <Link href={`/products/${r.slug}`} className="group block rounded-2xl border border-line bg-ink-2 p-4 transition-colors hover:border-snow/20">
                    <ProductVisual product={r} className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]" />
                    <h3 className="mt-4 px-2 font-display text-xl font-semibold">{r.name}</h3>
                    <p className="mb-2 px-2 text-sm text-mist">{r.summary}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
