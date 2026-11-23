import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageHero, Section, FaqBlock, CtaBand, CtaRow, RelatedLinks } from "@/components/marketing/blocks";
import { LIVE_INDUSTRIES, industryBySlug, INDUSTRY_UPDATED } from "@/content/industries";
import { LIVE_PRODUCTS } from "@/content/products";
import { publishableFits } from "@/lib/seo/gate";

export const dynamicParams = false;
export const generateStaticParams = () => LIVE_INDUSTRIES.map((i) => ({ industry: i.slug }));
type Props = { params: Promise<{ industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = industryBySlug((await params).industry); if (!i || i.status !== "live") return {};
  return buildMetadata({ title: `Temperature and Equipment Monitoring for ${i.name} in India`, description: (i.summary ?? "").slice(0, 150), path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const i = industryBySlug((await params).industry); if (!i || i.status !== "live") notFound();
  const products = LIVE_PRODUCTS.filter((p) => i.fits.includes(p.num));
  const pairSlugs = new Set(publishableFits().filter((f) => f.industrySlug === i.slug).map((f) => f.productSlug));
  const siblings = LIVE_INDUSTRIES.filter((x) => x.slug !== i.slug && x.fits.some((n) => i.fits.includes(n))).slice(0, 4);
  return (
    <>
      <PageHero eyebrow="Industry" title={`Monitoring for ${i.name}`} lede={i.summary}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Industries", path: "/industries" }, { name: i.name, path: `/industries/${i.slug}` }]} /></div>
        <CtaRow primary={{ href: `/get-quote?industry=${i.slug}`, label: "Get a quote" }} secondary={{ href: "/tools/spoilage-cost-calculator", label: "Spoilage cost calculator" }} />
      </PageHero>
      <Section><div className="grid gap-10 md:grid-cols-2">
        <div className="prose-ca"><h2 className="!mt-0">What goes wrong</h2><ul>{i.losses?.map((l) => <li key={l}>{l}</li>)}</ul></div>
        <div className="prose-ca"><h2 className="!mt-0">What to monitor</h2><ul>{i.monitor?.map((l) => <li key={l}>{l}</li>)}</ul></div>
      </div></Section>
      <Section className="!pt-0"><h2>Products that fit</h2><div className="grid gap-4 sm:grid-cols-2">{products.map((p) => (
        <Link key={p.slug} href={pairSlugs.has(p.slug) ? `/industries/${i.slug}/${p.slug}` : `/products/${p.slug}`} className="card block no-underline" style={{ color: "inherit" }}>
          <p className="mono text-xs" style={{ color: "var(--accent)" }}>{p.modelCode}</p><h3 className="mt-1">{p.name}{pairSlugs.has(p.slug) ? ` for ${i.name}` : ""}</h3><p className="text-sm">{p.summary.split(". ")[0]}.</p>
        </Link>))}</div></Section>
      <Section className="!pt-0"><div className="prose-ca max-w-3xl"><h2 className="!mt-0">A short checklist</h2><ol>{i.checklist?.map((c) => <li key={c}>{c}</li>)}</ol></div></Section>
      <Section className="!pt-0"><div className="grid gap-10 lg:grid-cols-2"><FaqBlock faqs={i.faqs ?? []} /><RelatedLinks title="Related industries" links={siblings.map((s) => ({ href: `/industries/${s.slug}`, label: s.name }))} /></div>
        <p className="mt-8 text-sm" style={{ color: "var(--text-muted)" }}>Updated {new Date(INDUSTRY_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.</p></Section>
      <CtaBand industrySlug={i.slug} title={`Try it at your ${i.name.toLowerCase()} free for 30 days`} />
    </>
  );
}
