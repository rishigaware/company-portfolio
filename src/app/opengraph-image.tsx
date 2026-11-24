import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #050b14 0%, #0a1f33 60%, #0f3b44 100%)",
          color: "#e8eef7",
        }}
      >
        <div style={{ fontSize: 34, color: "#2dd4bf", letterSpacing: 4, textTransform: "uppercase" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 24, lineHeight: 1.1, maxWidth: 900 }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
