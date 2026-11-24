import { ImageResponse } from "next/og";
import { getProduct, products } from "@/data/products";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: `linear-gradient(135deg, #050b14 30%, ${p?.accent ?? "#2dd4bf"}55)`, color: "#e8eef7" }}>
        <div style={{ fontSize: 28, color: p?.accent, letterSpacing: 4, textTransform: "uppercase" }}>{`${siteConfig.name} · ${p?.category ?? ""}`}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700 }}>{p?.name}</div>
          <div style={{ fontSize: 40, marginTop: 16, maxWidth: 950, color: "#cbd5e1" }}>{p?.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
