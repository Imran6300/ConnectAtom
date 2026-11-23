import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LIVE_INDUSTRIES } from "@/content/industries";
import { LIVE_PRODUCTS } from "@/content/products";

export const metadata = buildMetadata({ title: "Temperature and Equipment Monitoring by Industry in India", description: "See how cold storages, pharmacies, hospitals, restaurants, warehouses and server rooms use ConnectAtom to catch problems before they become losses.", path: "/industries" });

export default function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Monitoring for the places that lose money when something fails" lede="Pick your kind of site to see what goes wrong, what to monitor, and which product fits.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Industries", path: "/industries" }]} /></div>
      </PageHero>
      <Section><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{LIVE_INDUSTRIES.map((i) => (
        <Link key={i.slug} href={`/industries/${i.slug}`} className="card block no-underline" style={{ color: "inherit" }}>
          <h3>{i.name}</h3><p className="text-sm">{i.summary}</p>
          <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>{LIVE_PRODUCTS.filter((p) => i.fits.includes(p.num)).map((p) => p.name).join(", ")}</p>
        </Link>))}</div></Section>
    </>
  );
}
