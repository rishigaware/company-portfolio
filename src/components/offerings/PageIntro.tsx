import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

/** Shared top-of-page intro: eyebrow, animated H1, lead paragraph. */
export function PageIntro({ eyebrow, title, highlight = [], lead }: { eyebrow: string; title: string; highlight?: string[]; lead: string }) {
  return (
    <section className="mx-auto max-w-[1760px] px-5 pb-10 pt-32 md:px-10 md:pt-36">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
      <SplitReveal as="h1" text={title} highlight={highlight} className="max-w-4xl font-display text-h1 font-semibold tracking-tight" />
      <Reveal delay={0.3}>
        <p className="mt-5 max-w-2xl text-lg text-mist">{lead}</p>
      </Reveal>
    </section>
  );
}
