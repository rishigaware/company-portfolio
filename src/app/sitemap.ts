import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { products } from "@/data/products";
import { services, solutions } from "@/data/offerings";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/products", "/solutions", "/services", "/accessories", "/downloads", "/case-studies", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const productPages = products.map((p) => ({
    url: absoluteUrl(`/products/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  const offeringPages = [...solutions.map((s) => `/solutions/${s.slug}`), ...services.map((s) => `/services/${s.slug}`)].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...productPages, ...offeringPages];
}
