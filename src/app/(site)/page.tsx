import Link from "next/link";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";
import { Hero } from "@/components/hero/Hero";
import { CtaBand, FaqBlock, HowItWorks, PlanTable, ProofStrip, ProductCard } from "@/components/marketing/blocks";
import { Band, SectionHead } from "@/components/ui/primitives";
import { Grid, ResourceCard } from "@/components/marketing/linkcards";
import { Scene } from "@/components/visuals";
import { GENERAL_FAQS } from "@/content/plans";

export const revalidate = 3600;
export const generateMetadata = () => metaFor({
  title: "Wireless Temperature Monitoring with WhatsApp Alerts in India",
  description: "Ready-to-use wireless monitoring for cold rooms, clinics, kitchens and warehouses in India. Live readings and WhatsApp alerts the moment something drifts.",
  path: "/", absoluteTitle: true,
});

export default async function Home() {
  const s = await getSite();
  const ready = s.products.filter((p) => p.availability !== "in-development");
  const next = s.products.filter((p) => p.availability === "in-development");
  const resources = s.resources.filter((r) => r.type !== "glossary").slice(0, 4);
  return (
    <>
      <Hero />
      <ProofStrip />
      <Band>
        <SectionHead eyebrow="Find your industry" title="Monitoring shaped by the place it runs in" lede={`${s.industries.length} industries, ${s.products.length} products. Pick the one that looks like your site.`} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((k) => (
            <li key={k} data-sector={k}>
              <Link href={`/industries#${k}`} className="card hover-lift block overflow-hidden !p-0 no-underline" style={{ color: "inherit", borderTop: "3px solid var(--sector)" }}>
                <div style={{ aspectRatio: "16/9", background: "var(--sector-soft)" }}><Scene name={s.sectorIndustries(k)[0]?.scene ?? "cold-room"} className="h-full w-full" /></div>
                <div className="p-4"><h3 className="!mb-1 !text-base">{SECTOR_META[k].label}</h3><p className="text-sm">{SECTOR_META[k].blurb}</p><p className="kicker mt-2">{s.sectorIndustries(k).length} industries · {s.sectorProducts(k).length} products</p></div>
              </Link>
            </li>
          ))}
        </ul>
      </Band>
      <Band className="!pt-0"><SectionHead eyebrow="How it works" title="Install, connect, get alerted" lede="A small sensor watches the thing that costs money when it fails. You hear about a problem from ConnectAtom before it becomes a loss." /><HowItWorks /></Band>
      <Band className="!pt-0">
        <SectionHead eyebrow="Products you can start with" title="Available and pilot-ready today" />
        <Grid cols={4}>{ready.map((p) => <ProductCard key={p.slug} p={p} note={p.tagline} />)}</Grid>
        {next.length > 0 && (<><p className="mb-3 mt-10 text-sm font-semibold" style={{ color: "var(--text)" }}>In development. Register interest and we tell you first.</p><Grid cols={4}>{next.map((p) => <ProductCard key={p.slug} p={p} />)}</Grid></>)}
        <p className="mt-6"><Link href="/products">See all {s.products.length} products</Link></p>
      </Band>
      <Band dark>
        <SectionHead eyebrow="The alert" title="Written like a calm colleague" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card"><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>What you get</p><p className="mt-2" style={{ color: "var(--text)" }}>Cold Room 2: 9.4°C for 10 min (limit 8°C). Door open 14 min. Check door and compressor.</p></div>
          <div className="card"><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>What you do not</p><p className="mt-2 line-through decoration-1" style={{ color: "var(--text-muted)" }}>ALERT!!! Temperature anomaly detected on device ID 0x4F2A.</p></div>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Sample alert. If nobody acknowledges, the next person on your list is told.</p>
      </Band>
      <Band><SectionHead eyebrow="Pricing" title="One simple monthly plan per device" lede="Pay once for the device, then a monthly plan for the dashboard, alerts, reports and support." /><PlanTable compact /><p className="mt-4"><Link href="/pricing">Compare plans</Link></p></Band>
      {resources.length > 0 && <Band className="!pt-0"><SectionHead eyebrow="Guides" title="Read before you buy" /><Grid cols={4}>{resources.map((r) => <ResourceCard key={r.slug} r={r} />)}</Grid></Band>}
      <Band className="!pt-0"><div className="max-w-3xl"><FaqBlock faqs={GENERAL_FAQS} /></div></Band>
      <CtaBand />
    </>
  );
}
