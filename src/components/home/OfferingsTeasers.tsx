import Link from "next/link";
import { SolutionPanels } from "@/components/offerings/SolutionPanels";
import { ServiceCards } from "@/components/offerings/ServiceCards";

function SectionHead({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href: string; cta: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
        <h2 className="font-display text-h2 font-semibold tracking-tight">{title}</h2>
      </div>
      <Link href={href} className="hidden shrink-0 text-sm text-mist underline-offset-4 hover:text-teal hover:underline md:block">
        {cta} →
      </Link>
    </div>
  );
}

export function SolutionsTeaser() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 py-14 md:px-10 md:py-20 lg:py-24">
      <SectionHead eyebrow="Solutions" title="Complete solutions by lab type" href="/solutions" cta="All solutions" />
      <SolutionPanels />
    </section>
  );
}

export function ServicesTeaser() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 py-14 md:px-10 md:py-20 lg:py-24">
      <SectionHead eyebrow="Services" title="Lifetime support for every system" href="/services" cta="All services" />
      <ServiceCards />
    </section>
  );
}
