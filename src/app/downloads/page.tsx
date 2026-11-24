import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/offerings/PageIntro";
import { DownloadsLibrary } from "@/components/offerings/DownloadsLibrary";

export const metadata: Metadata = {
  title: "Downloads — Brochures, Datasheets & Certificates",
  description: `Download ${siteConfig.name} product brochures, technical datasheets, user manuals, compliance whitepapers and quality certificates.`,
  alternates: { canonical: "/downloads" },
  openGraph: { url: "/downloads" },
};

export default function DownloadsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Downloads", path: "/downloads" }])} />
      <PageIntro
        eyebrow="Downloads"
        title="Brochures, datasheets and certificates."
        highlight={["certificates."]}
        lead="Everything you need for evaluation, purchasing and audits. Request any document and we'll email it to you."
      />
      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-10">
        <DownloadsLibrary />
      </section>
    </>
  );
}
