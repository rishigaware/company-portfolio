import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, services, solutions } from "@/data/offerings";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ServiceIcon } from "@/components/offerings/ServiceIcon";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => solutions.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} Solution`,
    description: `${s.tagline}. ${s.summary}`,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { url: `/solutions/${s.slug}`, title: `${s.name} | ${siteConfig.name}`, description: s.summary },
  };
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const recProducts = products.filter((p) => s.products.includes(p.slug));
  const recServices = services.filter((x) => s.services.includes(x.slug));

  return (
    <article>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: s.name, path: `/solutions/${s.slug}` },
        ])}
      />

      <header className="relative overflow-hidden pt-24 text-white" style={{ background: `linear-gradient(160deg, ${s.color}, color-mix(in srgb, ${s.color} 50%, #0b1324))` }}>
        <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1760px] px-5 pb-16 pt-10 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/75">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/solutions" className="hover:text-white">Solutions</Link> / <span className="text-white">{s.name}</span>
          </nav>
          <SplitReveal as="h1" text={s.name} className="font-display text-h1 font-semibold tracking-tight" />
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{s.tagline}</p>
            <p className="mt-2 max-w-2xl text-white/75">{s.summary}</p>
          </Reveal>
          <dl className="mt-10 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/20 pt-8">
            {s.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={0.4 + i * 0.1}>
                <dd className="font-display text-4xl font-semibold">{o.value}</dd>
                <dt className="text-sm text-white/75">{o.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1760px] gap-10 px-5 py-16 md:px-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Challenges we solve</h2>
          <p className="mt-3 text-mist">The problems labs tell us about most often.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {s.challenges.map((c, i) => (
            <Reveal key={c} delay={i * 0.1} className="h-full rounded-2xl border border-line bg-ink-2 p-6">
              <span className="font-display text-sm font-semibold" style={{ color: s.color }}>0{i + 1}</span>
              <p className="mt-3">{c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 py-16 md:px-10">
        <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight">Recommended products</h2>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recProducts.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.08}>
                <Link href={`/products/${p.slug}`} className="group block rounded-2xl border border-line bg-ink-2 p-3 transition-colors hover:border-teal/40">
                  <ProductVisual product={p} className="aspect-[4/3]" />
                  <p className="mt-3 px-2 font-display font-semibold">{p.name}</p>
                  <p className="mb-2 px-2 text-sm text-mist">{p.summary}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 py-16 md:px-10">
        <h2 className="mb-8 font-display text-4xl font-semibold tracking-tight">Services included</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recServices.map((x, i) => (
            <Reveal key={x.slug} delay={i * 0.08}>
              <Link href={`/services/${x.slug}`} className="flex items-start gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-teal/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <ServiceIcon icon={x.icon} />
                </span>
                <span>
                  <span className="block font-display font-semibold">{x.name}</span>
                  <span className="text-sm text-mist">{x.summary}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-ink-2 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold">Plan your {s.name.toLowerCase()} with us</h2>
            <p className="mt-2 text-mist">Get a tailored proposal covering instruments, software and services.</p>
          </div>
          <Magnetic>
            <Link href={`/contact?type=quote&solution=${s.slug}`} className="inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-ink">Request a proposal</Link>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
