import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { DeviceCard } from "@/components/marketing/DeviceCard";
import { Section, Eyebrow, ProofStrip, HowItWorks, ProductCard, CtaBand, FaqBlock, PlanTable, CtaRow } from "@/components/marketing/blocks";
import { LIVE_PRODUCTS, HERO_SLUGS } from "@/content/products";
import { LIVE_INDUSTRIES } from "@/content/industries";
import { GENERAL_FAQS } from "@/content/plans";

export const metadata = buildMetadata({
  title: "Wireless Temperature Monitoring with WhatsApp Alerts in India",
  description: "Ready-to-use wireless monitoring for cold rooms, clinics, kitchens and warehouses in India. Live readings and WhatsApp alerts the moment something drifts.",
  path: "/",
});

export default function Home() {
  const hero = LIVE_PRODUCTS.filter((p) => HERO_SLUGS.includes(p.slug));
  const more = LIVE_PRODUCTS.filter((p) => !HERO_SLUGS.includes(p.slug));
  return (
    <>
      <section data-theme="dark" className="circuit-bg">
        <div className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Wireless monitoring for cold rooms, clinics and kitchens</p>
            <h1 className="display">Know before<br />it fails.</h1>
            <p className="lede mt-4" style={{ color: "var(--text-body)" }}>Live readings and a WhatsApp alert the moment something drifts. Installed and supported for you.</p>
            <CtaRow secondary={{ href: "/how-it-works", label: "See how it works" }} />
            <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>30-day money-back pilot. No long contract.</p>
          </div>
          <DeviceCard />
        </div>
      </section>
      <ProofStrip />

      <Section>
        <Eyebrow>How it works</Eyebrow><h2 className="section-title">Install, connect, get alerted</h2>
        <p className="lede mb-8">A small sensor watches the thing that costs money when it fails. You hear about a problem from ConnectAtom before it becomes a loss.</p>
        <HowItWorks />
      </Section>

      <Section className="!pt-0">
        <Eyebrow>Products</Eyebrow><h2 className="section-title">One system, built for your kind of site</h2>
        <p className="lede mb-8">The same hardware and software, set up for the way you store things.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{hero.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        <p className="mb-3 mt-8 text-sm font-semibold" style={{ color: "var(--text)" }}>Add-ons and more</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{more.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        <p className="mt-6"><Link href="/products">See all products</Link></p>
      </Section>

      <Section className="!pt-0">
        <Eyebrow>Industries</Eyebrow><h2 className="section-title">Who uses it</h2>
        <ul className="mt-4 flex flex-wrap gap-2">{LIVE_INDUSTRIES.map((i) => <li key={i.slug}><Link href={`/industries/${i.slug}`} className="btn btn-secondary !h-10 no-underline">{i.name}</Link></li>)}</ul>
      </Section>

      <Section dark>
        <Eyebrow>The alert</Eyebrow><h2 className="section-title">Written like a calm colleague</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="card"><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>What you get</p><p className="mt-2" style={{ color: "var(--text)" }}>Cold Room 2: 9.4°C for 10 min (limit 8°C). Door open 14 min. Check door and compressor.</p></div>
          <div className="card"><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>What you do not</p><p className="mt-2 line-through decoration-1" style={{ color: "var(--text-muted)" }}>ALERT!!! Temperature anomaly detected on device CR2.</p></div>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Sample alert. If nobody acknowledges, the next person on your list is told.</p>
      </Section>

      <Section>
        <Eyebrow>Pricing</Eyebrow><h2 className="section-title">One simple monthly plan per device</h2>
        <p className="lede mb-6">Pay once for the device, then a monthly plan for the dashboard, alerts, reports and support.</p>
        <PlanTable compact /><p className="mt-4"><Link href="/pricing">Compare plans</Link></p>
      </Section>

      <Section className="!pt-0"><div className="max-w-3xl"><FaqBlock faqs={GENERAL_FAQS} /></div></Section>
      <CtaBand />
    </>
  );
}
