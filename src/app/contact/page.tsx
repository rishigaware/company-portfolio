import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Contact Us — Request a Quote or Demo",
  description: `Contact ${siteConfig.name} for product quotes, live demos and service support. Our application specialists respond within one business day.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const items = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "Office", value: `${contact.address.street}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}` },
    { label: "Hours", value: "Mon – Sat, 9:00 – 18:00 IST" },
  ];

  return (
    <section className="mx-auto max-w-[1760px] px-5 md:px-10 pb-20 md:pb-32 pt-32 md:pt-36">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Contact us</p>
      <SplitReveal as="h1" text="Let's talk about your lab." highlight={["lab."]} className="mb-12 font-display text-h1 font-semibold tracking-tight" />
      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.1} className="border-b border-line pb-6">
              <p className="text-xs uppercase tracking-widest text-mist">{it.label}</p>
              {it.href ? (
                <a href={it.href} className="mt-2 block text-lg hover:text-teal">{it.value}</a>
              ) : (
                <p className="mt-2 text-lg">{it.value}</p>
              )}
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            {/* Animated map placeholder — swap for a Google Maps embed when ready */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-2">
              <div aria-hidden className="grid-bg absolute inset-0" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute -inset-6 animate-ping rounded-full bg-teal/30" />
                <span className="relative block h-4 w-4 rounded-full bg-teal ring-4 ring-teal/30" />
              </span>
              <p className="absolute bottom-4 left-4 text-sm text-mist">{contact.address.city}, {contact.address.country}</p>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<div className="h-[600px] rounded-2xl border border-line bg-ink-2" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
      <div className="-mx-6 mt-16">
        <Faq />
      </div>
    </section>
  );
}
