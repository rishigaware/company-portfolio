/**
 * SINGLE SOURCE OF TRUTH for brand + SEO.
 * Rebranding or moving domains? Change values here (or set NEXT_PUBLIC_SITE_URL)
 * and every title, meta tag, sitemap entry, OG image and JSON-LD block updates.
 */
export const siteConfig = {
  name: "demo",
  shortName: "GAMP",
  tagline: "Precision instruments & validated software for life sciences",
  description:
    "demo builds laboratory instruments and GxP-compliant software that help pharma, biotech and QC labs measure accurately, stay compliant and ship faster.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.gamplifetech.com"
  ).replace(/\/$/, ""),
  locale: "en_US",
  keywords: [
    "laboratory instruments",
    "GxP software",
    "21 CFR Part 11",
    "LIMS",
    "pharma QC equipment",
    "validation software",
    "life science instruments",
  ],
  contact: {
    email: "sales@example.com",
    phone: "+91 00000 00000",
    address: {
      street: "123 Science Park Road",
      city: "Ahmedabad",
      region: "Gujarat",
      postalCode: "380000",
      country: "IN",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    youtube: "https://www.youtube.com/",
  },
  foundedYear: 2010,
};

export type SiteConfig = typeof siteConfig;

export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
