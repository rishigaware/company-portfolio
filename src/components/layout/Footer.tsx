import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/content";
import { products } from "@/data/products";

/** "Curtain" footer: fixed behind the page and revealed as the content scrolls away. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="relative h-[820px] md:h-[560px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      <footer className="fixed bottom-0 flex h-[820px] w-full flex-col justify-between bg-ink-2 px-5 pb-8 pt-20 md:px-10 md:h-[560px]">
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-xl font-semibold">{siteConfig.name}</p>
            <p className="mt-3 text-sm text-mist">{siteConfig.tagline}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-mist">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><Link className="hover:text-teal" href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-mist">Products</p>
            <ul className="mt-4 space-y-2 text-sm">
              {products.map((p) => (
                <li key={p.slug}><Link className="hover:text-teal" href={`/products/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
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
