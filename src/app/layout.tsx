import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./brand.css";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo/jsonld";
import { Analytics } from "@/components/analytics/Analytics";

const display = localFont({ src: "../fonts/space-grotesk-latin-wght-normal.woff2", variable: "--f-display", weight: "300 700", display: "swap" });
const body = localFont({ src: "../fonts/inter-latin-wght-normal.woff2", variable: "--f-body", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--f-mono", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: { default: "Wireless Temperature Monitoring with WhatsApp Alerts in India | ConnectAtom", template: "%s" },
  description: "Ready-to-use wireless monitoring for cold rooms, clinics, kitchens and warehouses in India. Live readings and WhatsApp alerts the moment something drifts.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/icon-512.png", sizes: "512x512", type: "image/png" }], apple: "/icon-192.png" },
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { themeColor: "#0A1622", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body><JsonLd data={[organization(), website()]} />{children}<Analytics /></body>
    </html>
  );
}
