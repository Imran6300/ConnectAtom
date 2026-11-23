import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { productLd } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageHero, Section, SpecTable, AlertExample, ReportPreview, FaqBlock, RelatedLinks, CtaBand, CtaRow, PlanTable } from "@/components/marketing/blocks";
import { LIVE_PRODUCTS, productBySlug, inr } from "@/content/products";
import { LIVE_INDUSTRIES } from "@/content/industries";
import { publishableFits } from "@/lib/seo/gate";

export const dynamicParams = false; // unknown slugs are a real 404, not a soft 404
export const generateStaticParams = () => LIVE_PRODUCTS.map((p) => ({ product: p.slug }));
type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = productBySlug((await params).product); if (!p) return {};
  return buildMetadata({ title: `${p.name} with ${p.headline}`, description: p.summary, path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: Props) {
  const p = productBySlug((await params).product); if (!p) notFound();
  // Product -> industries it serves, only for pair pages that passed the gate (max 8, then link to the hub)
  const pairs = publishableFits().filter((f) => f.productSlug === p.slug).sort((a, b) => b.fitScore - a.fitScore).slice(0, 8);
  const industries = LIVE_INDUSTRIES.filter((i) => i.fits.includes(p.num));
  return (
    <>
      <JsonLd data={productLd(p)} />
      <PageHero eyebrow={`${p.brandName} | ${p.modelCode}`} title={p.name} lede={p.summary}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Products", path: "/products" }, { name: p.name, path: `/products/${p.slug}` }]} /></div>
        <CtaRow secondary={{ href: `/get-quote?product=${p.slug}`, label: "Get a quote" }} />
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Kit from {inr(p.hardwareFromInr)} (indicative). Plans from ₹299 per device per month, plus GST.</p>
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-ca">
            <h2 className="!mt-0">The problem</h2><p>{p.problem}</p>
            <h2>How it works</h2>
            <ol><li><b>Device.</b> {p.hardware.sensors[0]}, connected over {p.hardware.connectivity[0]}.</li><li><b>Dashboard.</b> Live readings and history on your phone.</li><li><b>Alert.</b> The right person is told, and the next person if nobody answers.</li></ol>
            <h2>What you get</h2>
            <ul className="!list-none !pl-0 grid gap-3">{p.features.map((f) => <li key={f.title} className="card !p-4"><b style={{ color: "var(--text)" }}>{f.title}.</b> {f.body}</li>)}</ul>
          </div>
          <aside className="grid content-start gap-5"><AlertExample text={p.alertExample} /><ReportPreview name={p.reportName} /></aside>
        </div>
      </Section>
      <Section className="!pt-0"><h2>Specification</h2><div className="overflow-x-auto"><SpecTable p={p} /></div></Section>
      <Section className="!pt-0">
        <h2>Who it is for</h2><p className="lede mb-4">{p.buyers.join(", ")}.</p>
        {pairs.length > 0 && <div className="mb-8"><RelatedLinks title="By industry" links={pairs.map((f) => ({ href: `/industries/${f.industrySlug}/${p.slug}`, label: `${p.name} for ${LIVE_INDUSTRIES.find((i) => i.slug === f.industrySlug)?.name}` }))} /></div>}
        {industries.length > pairs.length && <p className="text-sm">See also <Link href="/industries">all industries</Link>.</p>}
      </Section>
      <Section className="!pt-0"><h2>Plans and price</h2><PlanTable compact /><p className="mt-3"><Link href="/pricing">Full plan comparison</Link></p></Section>
      <Section className="!pt-0"><div className="grid gap-10 lg:grid-cols-2"><FaqBlock faqs={p.faqs} /><RelatedLinks title="Related products" links={p.relatedSlugs.map((s) => productBySlug(s)).filter(Boolean).map((r) => ({ href: `/products/${r!.slug}`, label: r!.name, note: r!.summary.split(".")[0] }))} /></div>
        <p className="mt-8 text-sm" style={{ color: "var(--text-muted)" }}>Updated {new Date(p.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.</p></Section>
      <CtaBand productSlug={p.slug} />
    </>
  );
}
