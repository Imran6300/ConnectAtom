import { ImageResponse } from "next/og";
import { getSite } from "@/lib/catalogue/site";
import { SECTOR_META } from "@/lib/catalogue/types";

export const revalidate = 86400;
// Per-page Open Graph image (1200x630), generated on demand from the record and cached by the CDN. Brand: Deep Space + Atom Teal, flat, no effects.
export async function GET(_req: Request, { params }: { params: Promise<{ family: string; slug: string }> }) {
  const { family, slug } = await params; const site = await getSite();
  let eyebrow = "ConnectAtom", title = "Know before it fails.", sub = "Wireless monitoring with instant alerts.";
  if (family === "products") { const p = site.product(slug); if (!p) return new Response("Not found", { status: 404 }); eyebrow = `${p.brandName} | ${p.modelCode}`; title = p.name; sub = p.tagline; }
  else if (family === "industries") { const i = site.industry(slug); if (!i) return new Response("Not found", { status: 404 }); eyebrow = `Industry | ${SECTOR_META[i.sector].label}`; title = `Monitoring for ${i.name}`; sub = i.tagline; }
  else if (family === "applications") { const a = site.application(slug); if (!a) return new Response("Not found", { status: 404 }); eyebrow = "Application"; title = a.name; sub = a.job; }
  else if (family === "resources") { const r = site.resource(slug); if (!r) return new Response("Not found", { status: 404 }); eyebrow = r.type === "glossary" ? "Glossary" : "Resource"; title = r.title; sub = r.summary; }
  else if (family === "combinations") { const [is, ps] = slug.split("--"); const i = site.industry(is), p = site.product(ps); if (!i || !p) return new Response("Not found", { status: 404 }); eyebrow = `${p.brandName} | ${i.name}`; title = `${p.name} for ${i.name}`; sub = site.pairFor(is, ps)?.angle ?? p.tagline; }
  else return new Response("Not found", { status: 404 });
  const size = title.length > 52 ? 54 : title.length > 34 ? 64 : 76;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0A1622", padding: 72, color: "#F4F8FA" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 64 64"><path d="M50 14a26 26 0 1 0 0 36" fill="none" stroke="#F4F8FA" strokeWidth="7" strokeLinecap="round" /><circle cx="30" cy="32" r="6" fill="#14D1BC" /><rect x="30" y="29.5" width="26" height="5" fill="#14D1BC" /><circle cx="56" cy="32" r="4.5" fill="#14D1BC" /></svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>Connect<span style={{ color: "#14D1BC" }}>Atom</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#14D1BC" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#9FB3C3", lineHeight: 1.35 }}>{sub.length > 140 ? `${sub.slice(0, 137)}...` : sub}</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#14D1BC" }} />
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
  );
}
