import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/offerings";
import { products } from "@/data/products";
import { siteConfig, absoluteUrl } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ServiceIcon } from "@/components/offerings/ServiceIcon";
import { ProductVisual } from "@/components/ui/ProductVisual";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} Services`,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { url: `/services/${s.slug}`, title: `${s.name} | ${siteConfig.name}`, description: s.summary },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = products.filter((p) => s.products.includes(p.slug));
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.description,
            url: absoluteUrl(`/services/${s.slug}`),
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      <header className="mx-auto grid max-w-[1760px] gap-12 px-5 pb-12 pt-32 md:px-10 md:pt-36 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mist">
            <Link href="/" className="hover:text-snow">Home</Link> / <Link href="/services" className="hover:text-snow">Services</Link> / <span className="text-snow">{s.name}</span>
          </nav>
          <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-ink">
            <ServiceIcon icon={s.icon} className="h-7 w-7" />
          </span>
          <SplitReveal as="h1" text={s.name} className="font-display text-h1 font-semibold tracking-tight" />
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-2xl text-lg text-mist">{s.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href={`/contact?type=quote&service=${s.slug}`} className="inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-ink">Request this service</Link>
              </Magnetic>
              <Link href="/services" className="inline-block rounded-full border border-line px-7 py-3.5 font-medium hover:border-teal">All services</Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="rounded-2xl border border-line bg-ink-2 p-7">
          <h2 className="font-display text-lg font-semibold">What&apos;s included</h2>
          <ul className="mt-4 space-y-3">
            {s.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-[11px] text-teal">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1760px] px-5 py-16 md:px-10">
        <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight">How it works</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {s.steps.map((st, i) => (
            <Reveal key={st.title} delay={i * 0.12} className="relative h-full rounded-2xl border border-line p-6">
              <span className="font-display text-sm font-semibold text-teal">Step 0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{st.title}</h3>
              <p className="mt-2 text-sm text-mist">{st.text}</p>
              {i < s.steps.length - 1 && <span aria-hidden className="absolute -right-3 top-1/2 hidden h-px w-6 bg-teal/50 xl:block" />}
            </Reveal>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1760px] px-5 py-16 md:px-10">
          <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight">Available for</h2>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.08}>
                  <Link href={`/products/${p.slug}`} className="group block rounded-2xl border border-line bg-ink-2 p-3 transition-colors hover:border-teal/40">
                    <ProductVisual product={p} className="aspect-[4/3]" />
                    <p className="mt-3 px-2 font-display font-semibold">{p.name}</p>
                    <p className="mb-2 px-2 text-sm text-mist">{p.category}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-[1760px] px-5 pb-24 pt-8 md:px-10">
        <h2 className="mb-6 font-display text-2xl font-semibold">Other services</h2>
        <div className="flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-teal hover:text-teal">
              <ServiceIcon icon={o.icon} className="h-4 w-4" /> {o.name}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
