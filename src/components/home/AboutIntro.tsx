import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/data/content";
import { siteConfig } from "@/config/site";

export function AboutIntro() {
  return (
    <section id="about" className="mx-auto max-w-[1760px] px-5 md:px-10 py-14 md:py-20 lg:py-24">
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-teal">Who we are</p>
      <h2 className="sr-only">About {siteConfig.name}</h2>
      <ScrollFillText
        className="font-display text-lead font-medium"
        text={`Since ${siteConfig.foundedYear}, ${siteConfig.name} has engineered instruments and software that labs trust when results matter most — from first sample to final audit.`}
      />
      <dl className="mt-14 grid md:mt-24 grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="border-t border-line pt-6">
            <dt className="text-sm text-mist">{s.label}</dt>
            <dd className="mt-2 font-display text-4xl font-semibold text-gradient">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
