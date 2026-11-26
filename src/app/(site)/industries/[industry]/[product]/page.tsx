import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SECTOR_META } from "@/lib/catalogue/types";
import { SectorHero } from "@/components/sector/SectorHero";
import { Band, ButtonLink, SectionHead } from "@/components/ui/primitives";
import { AlertExample, CtaBand, ReportPreview, RelatedLinks } from "@/components/marketing/blocks";

export const revalidate = 3600;
export const dynamicParams = true; // pairs are created in MongoDB; unpublished or gated pairs return 404
type P = { params: Promise<{ industry: string; product: string }> };

export async function generateStaticParams() {
  const s = await getSite();
  return s.published.map((f) => ({ industry: f.industrySlug, product: f.productSlug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { industry, product } = await params; const s = await getSite();
  const f = s.pairFor(industry, product), i = s.industry(industry), p = s.product(product);
  if (!f || !i || !p) return { robots: { index: false } };
  return metaFor({ title: `${p.name} for ${i.name}`, description: f.angle.slice(0, 160), path: `/industries/${industry}/${product}`, seo: f.seo, og: { family: "combinations", slug: `${industry}--${product}` } });
}

export default async function PairPage({ params }: P) {
  const { industry, product } = await params; const s = await getSite();
  const rd = s.redirectFor(`/industries/${industry}/${product}`); if (rd) permanentRedirect(rd.to);
  const f = s.pairFor(industry, product), i = s.industry(industry), p = s.product(product);
  if (!f || !i || !p) notFound();
  const path = `/industries/${i.slug}/${p.slug}`;
  const others = s.pairsOfIndustry(i.slug).filter((x) => x.productSlug !== p.slug);
  const elsewhere = s.pairsOfProduct(p.slug).filter((x) => x.industrySlug !== i.slug);
  const sm = SECTOR_META[i.sector];
  return (
    <div data-sector={i.sector}>
      <JsonLd data={webPage({ name: `${p.name} for ${i.name}`, description: f.angle, path, modified: f.updatedAt, about: p.name })} />
      <SectorHero sector={i.sector} scene={i.scene} sceneTitle={`${i.name} with ${p.name}`} eyebrow={`${sm.label} · ${p.brandName}`}
        title={`${p.name} for ${i.name}`} lede={f.angle}
        trail={[{ name: "Industries", path: "/industries" }, { name: i.name, path: `/industries/${i.slug}` }, { name: p.name, path }]}
        actions={<><ButtonLink href={`/book-pilot?product=${p.slug}&industry=${i.slug}`}>Get a {i.name.toLowerCase()} pilot</ButtonLink><ButtonLink href={`/products/${p.slug}`} kind="secondary">About {p.name}</ButtonLink></>}
        log={f.exampleAlert ? [f.exampleAlert] : undefined} />
      <Band>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-ca">
            <SectionHead title={`The problem in ${i.name.toLowerCase()}`} /><p>{f.problem}</p>
            <h2>How it is set up</h2><p>{f.setup}</p>
            {f.thresholds && <><h2>Default alert rules</h2><div className="overflow-x-auto"><table className="table-ca"><thead><tr><th>What</th><th>Rule</th></tr></thead><tbody>{f.thresholds.map((t) => <tr key={t.label}><td>{t.label}</td><td>{t.rule}</td></tr>)}</tbody></table></div></>}
            {f.failureScenario && <><h2>A typical failure</h2><p>{f.failureScenario}</p></>}
            {f.hardwareVariant && <><h2>Recommended hardware</h2><p>{f.hardwareVariant}</p></>}
            {f.installNotes && <p><b>Install notes.</b> {f.installNotes}</p>}
            {f.planRecommendation && <p><b>Plan.</b> {f.planRecommendation} <Link href="/pricing">See plans</Link>.</p>}
          </div>
          <aside className="grid content-start gap-5">
            {f.exampleAlert && <AlertExample text={f.exampleAlert} />}
            {f.reportTemplate && <ReportPreview name={f.reportTemplate} />}
            {f.proof?.map((x) => <p key={x.label} className="text-xs" style={{ color: "var(--text-muted)" }}>{x.label}</p>)}
          </aside>
        </div>
      </Band>
      <Band className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <RelatedLinks title={`More for ${i.name}`} links={[{ href: `/industries/${i.slug}`, label: `All monitoring for ${i.name}` }, ...others.map((x) => ({ href: `/industries/${i.slug}/${x.productSlug}`, label: `${s.product(x.productSlug)?.name} for ${i.name}` }))]} />
          <RelatedLinks title={`${p.name} in other industries`} links={[{ href: `/products/${p.slug}`, label: p.name }, ...elsewhere.map((x) => ({ href: `/industries/${x.industrySlug}/${p.slug}`, label: `${p.name} for ${s.industry(x.industrySlug)?.name}` }))]} />
        </div>
      </Band>
      <CtaBand productSlug={p.slug} industrySlug={i.slug} title={`Try it at your ${i.name.toLowerCase()} free for 30 days`} />
    </div>
  );
}
