import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageHero, Section, AlertExample, ReportPreview, RelatedLinks, CtaBand, CtaRow } from "@/components/marketing/blocks";
import { industryBySlug, LIVE_INDUSTRIES } from "@/content/industries";
import { productBySlug, LIVE_PRODUCTS } from "@/content/products";
import { fitFor } from "@/content/fits";
import { publishableFits, isPublishable } from "@/lib/seo/gate";

// Only pairs that PASS the combination gate are generated. Anything else is a real 404.
export const dynamicParams = false;
export const generateStaticParams = () => publishableFits().map((f) => ({ industry: f.industrySlug, product: f.productSlug }));
type Props = { params: Promise<{ industry: string; product: string }> };

function load(industry: string, product: string) {
  const i = industryBySlug(industry), p = productBySlug(product), f = fitFor(product, industry);
  if (!i || !p || !f || !isPublishable(f)) return null;
  return { i, p, f };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry, product } = await params; const d = load(industry, product); if (!d) return {};
  return buildMetadata({ title: `${d.p.name} for ${d.i.name}`, description: d.f.angle.slice(0, 155), path: `/industries/${industry}/${product}` });
}

export default async function PairPage({ params }: Props) {
  const { industry, product } = await params; const d = load(industry, product); if (!d) notFound();
  const { i, p, f } = d;
  const otherProducts = publishableFits().filter((x) => x.industrySlug === i.slug && x.productSlug !== p.slug);
  const otherIndustries = publishableFits().filter((x) => x.productSlug === p.slug && x.industrySlug !== i.slug);
  return (
    <>
      <PageHero eyebrow={`${p.brandName} | ${i.name}`} title={`${p.name} for ${i.name}`} lede={f.angle}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Industries", path: "/industries" }, { name: i.name, path: `/industries/${i.slug}` }, { name: p.name, path: `/industries/${i.slug}/${p.slug}` }]} /></div>
        <CtaRow primary={{ href: `/book-pilot?product=${p.slug}&industry=${i.slug}`, label: `Get a ${i.name.toLowerCase()} pilot` }} secondary={{ href: `/products/${p.slug}`, label: `About ${p.name}` }} />
      </PageHero>
      <Section><div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="prose-ca"><h2 className="!mt-0">The problem in {i.name.toLowerCase()}</h2><p>{f.problem}</p>
          <h2>How it is set up</h2><p>{f.setup}</p>
          {f.thresholds && <><h2>Default alert rules</h2><div className="overflow-x-auto"><table className="table-ca"><thead><tr><th>What</th><th>Rule</th></tr></thead><tbody>{f.thresholds.map((t) => <tr key={t.label}><td>{t.label}</td><td>{t.rule}</td></tr>)}</tbody></table></div><p className="text-sm" style={{ color: "var(--text-muted)" }}>These are starting values. You set your own limits.</p></>}
          {f.failureScenario && <><h2>A typical failure</h2><p>{f.failureScenario}</p></>}
          {f.hardwareVariant && <><h2>Recommended hardware</h2><p>{f.hardwareVariant}</p></>}
          {f.installNotes && <p><b>Install notes.</b> {f.installNotes}</p>}
          {f.planRecommendation && <p><b>Plan.</b> {f.planRecommendation} <Link href="/pricing">See plans</Link>.</p>}
        </div>
        <aside className="grid content-start gap-5">{f.exampleAlert && <AlertExample text={f.exampleAlert} />}{f.reportTemplate && <ReportPreview name={f.reportTemplate} />}
          {f.proof?.map((x) => <p key={x.label} className="text-xs" style={{ color: "var(--text-muted)" }}>{x.label}</p>)}</aside>
      </div></Section>
      <Section className="!pt-0"><div className="grid gap-10 lg:grid-cols-2">
        <RelatedLinks title={`More for ${i.name}`} links={[{ href: `/industries/${i.slug}`, label: `All monitoring for ${i.name}` }, ...otherProducts.map((x) => ({ href: `/industries/${i.slug}/${x.productSlug}`, label: `${LIVE_PRODUCTS.find((q) => q.slug === x.productSlug)?.name} for ${i.name}` }))]} />
        <RelatedLinks title={`${p.name} in other industries`} links={[{ href: `/products/${p.slug}`, label: p.name }, ...otherIndustries.map((x) => ({ href: `/industries/${x.industrySlug}/${p.slug}`, label: `${p.name} for ${LIVE_INDUSTRIES.find((q) => q.slug === x.industrySlug)?.name}` }))]} />
      </div></Section>
      <CtaBand productSlug={p.slug} industrySlug={i.slug} title={`Try it at your ${i.name.toLowerCase()} free for 30 days`} />
    </>
  );
}
