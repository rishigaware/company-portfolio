import { faqs } from "@/data/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "./FaqAccordion";

/** FAQ section + FAQPage structured data (eligible for rich results in Google). Server component. */
export function Faq() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <FaqAccordion />
    </>
  );
}
