import { siteConfig, absoluteUrl } from "@/config/site";
import type { Product } from "@/data/products";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  description: siteConfig.description,
  foundingDate: String(siteConfig.foundedYear),
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  sameAs: Object.values(siteConfig.social),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
});

export const productSchema = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": p.category === "Software" ? "SoftwareApplication" : "Product",
  name: `${p.name} — ${p.tagline}`,
  description: p.description,
  url: absoluteUrl(`/products/${p.slug}`),
  image: absoluteUrl(`/products/${p.slug}/opengraph-image`),
  brand: { "@type": "Brand", name: siteConfig.name },
  manufacturer: { "@type": "Organization", name: siteConfig.name },
  ...(p.category === "Software" ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" } : {}),
  additionalProperty: p.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});
