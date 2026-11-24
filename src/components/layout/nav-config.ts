/** Top-level menu. Items with `mega` open a mega-menu panel on desktop and an accordion in the mobile drawer. */
export type MegaId = "products" | "solutions" | "services" | "resources";

export type TopItem = { label: string; href: string; mega?: MegaId; match?: string[] };

export const topNav: TopItem[] = [
  { label: "Products", href: "/products", mega: "products", match: ["/products"] },
  { label: "Solutions", href: "/solutions", mega: "solutions", match: ["/solutions"] },
  { label: "Services", href: "/services", mega: "services", match: ["/services"] },
  { label: "Resources", href: "/case-studies", mega: "resources", match: ["/case-studies", "/accessories", "/downloads"] },
  { label: "About", href: "/about", match: ["/about"] },
  { label: "Contact", href: "/contact", match: ["/contact"] },
];

export const resourceLinks = [
  { href: "/case-studies", label: "Case Studies", desc: "Measurable results from labs like yours", icon: "chart" },
  { href: "/accessories", label: "Accessories & Spares", desc: "Genuine parts, upgrade kits, consumables", icon: "box" },
  { href: "/downloads", label: "Downloads", desc: "Brochures, datasheets and certificates", icon: "file" },
] as const;

export const isActive = (item: TopItem, pathname: string) => (item.match ?? [item.href]).some((p) => pathname.startsWith(p));
