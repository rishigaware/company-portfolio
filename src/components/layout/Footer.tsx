import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services, solutions } from "@/data/offerings";
import { products } from "@/data/products";

/** "Curtain" footer: fixed behind the page and revealed as the content scrolls away. */
const columns = [
  { title: "Products", links: products.map((p) => ({ href: `/products/${p.slug}`, label: p.name })) },
  { title: "Solutions", links: solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name })) },
  { title: "Services", links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })) },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/accessories", label: "Accessories & Spares" },
      { href: "/downloads", label: "Downloads" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="relative md:h-[880px] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] xl:h-[600px]">
      <footer className="relative flex w-full flex-col justify-between gap-10 bg-ink-2 px-5 pb-8 pt-14 md:fixed md:bottom-0 md:h-[880px] md:gap-0 md:px-10 md:pt-20 xl:h-[600px]">
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-2 gap-8 md:grid-cols-3 md:gap-10 xl:grid-cols-6">
          <div className="col-span-2 md:col-span-3 xl:col-span-1">
            <p className="font-display text-xl font-semibold">{siteConfig.name}</p>
            <p className="mt-3 text-sm text-mist">{siteConfig.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-mist">{col.title}</p>
              <ul className="mt-4 space-y-2 break-words text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link className="hover:text-teal" href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <address className="col-span-2 not-italic md:col-span-1">
            <p className="text-xs uppercase tracking-widest text-mist">Get in touch</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:text-teal" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
              <li><a className="hover:text-teal" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a></li>
              <li className="text-mist">{siteConfig.contact.address.street}, {siteConfig.contact.address.city}</li>
            </ul>
          </address>
        </div>
        <div className="mx-auto w-full max-w-[1760px]">
          <p aria-hidden className="select-none font-display text-[16vw] font-bold leading-none tracking-tighter text-snow/[0.06] md:text-[8vw]">
            {siteConfig.shortName}
          </p>
          <div className="mt-4 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-mist md:flex-row">
            <p>© {year} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([k, v]) => (
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-teal">{k}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
