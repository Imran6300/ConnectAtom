import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, ProductCard, Eyebrow } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LIVE_PRODUCTS, ROADMAP } from "@/content/products";

export const metadata = buildMetadata({ title: "Wireless Monitoring Products for Cold Rooms, Clinics and Kitchens", description: "Ready-to-use wireless monitors for cold rooms, medical fridges, kitchen freezers, godowns, server rooms and more, each with WhatsApp alerts.", path: "/products" });

export default function Products() {
  return (
    <>
      <PageHero eyebrow="Products" title="Ready-to-use monitoring, one product per problem" lede="Every product arrives as a working system: device, dashboard, alerts, reports and install help.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Products", path: "/products" }]} /></div>
      </PageHero>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{LIVE_PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </Section>
      <Section className="!pt-0">
        <Eyebrow>Coming next</Eyebrow><h2>Need something else monitored?</h2>
        <p className="lede mb-4">We add products when customers ask for them. Tell us what you need and we will tell you honestly if and when we can do it.</p>
        <ul className="grid gap-2 sm:grid-cols-2">{ROADMAP.map((r) => <li key={r.slug}><Link href={`/get-quote?need=${encodeURIComponent(r.name)}`} className="card block !p-3 text-sm no-underline" style={{ color: "var(--text)" }}>{r.name}</Link></li>)}</ul>
      </Section>
    </>
  );
}
