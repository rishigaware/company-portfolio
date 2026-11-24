import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DEFAULT_THEME, themeInitScript } from "@/config/themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Headings: Plus Jakarta Sans (clean, corporate). Body: Inter.
const heading = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050b14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={`${inter.variable} ${heading.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions / devtools (e.g. custom-cursor overlays) inject
          attributes on <body> before React hydrates. This only ignores attribute diffs on <body> itself. */}
      <body className="min-h-screen" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <CustomCursor />
            <Header />
            {/* overflow-x-clip: slide-in animations must never widen the page on phones (which would zoom the whole site out) */}
            <div className="relative z-10 overflow-x-clip bg-ink shadow-[0_40px_80px_var(--t-shadow)]">
              <main id="main">{children}</main>
            </div>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
