export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://connectatom.com").replace(/\/$/, ""),
  name: "ConnectAtom",
  tagline: "Know before it fails.",
  supportLine: "Wireless monitoring with instant alerts.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@connectatom.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  city: "Hyderabad",
  legalReviewed: process.env.NEXT_PUBLIC_LEGAL_REVIEWED === "true",
  boilerplate:
    "ConnectAtom builds ready-to-use wireless monitoring for cold rooms, clinics, kitchens, warehouses and small factories in India. Sensors send live readings to a simple dashboard and alert the right person on WhatsApp the moment something drifts. Every system comes with installation help and a clear monthly plan.",
  noticeVersion: "2026-11-v1",
};

/** WhatsApp link with a pre-filled message that names the page, so you know which page the lead came from. */
export function whatsappLink(message: string) {
  if (!SITE.whatsapp) return "";
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;
