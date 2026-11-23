import type { Metadata } from "next";
import { SITE, abs } from "@/lib/site";

// One helper builds the whole Metadata object, so no route writes its own tags.
export function buildMetadata(o: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const title = `${o.title} | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: o.description,
    alternates: { canonical: abs(o.path) }, // always self-referencing and clean: no query string
    robots: o.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type: "website", url: abs(o.path), siteName: SITE.name, title, description: o.description, images: [{ url: "/og-image-1200x630.png", width: 1200, height: 630, alt: "ConnectAtom: Know before it fails." }], locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description: o.description, images: ["/og-image-1200x630.png"] },
  };
}
