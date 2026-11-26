import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { productLd, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SECTOR_META } from "@/lib/catalogue/types";
import { SectorHero } from "@/components/sector/SectorHero";
import { ImageSlot } from "@/components/sector/ImageSlot";
import { DashboardPreview } from "@/components/sector/DashboardPreview";
import { SignalPath } from "@/components/sector/SignalPath";
import { Band, SectionHead, TitleBody, AvailabilityBadge, AVAIL, ButtonLink } from "@/components/ui/primitives";
import { AlertExample, CtaBand, FaqBlock, ProductCard, SpecTable } from "@/components/marketing/blocks";
import { Checklist, Grid, IndustryCard, ResourceCard, ApplicationCard, Toc } from "@/components/marketing/linkcards";
import { DEVICE_META } from "@/components/visuals";

export const revalidate = 3600;
export const dynamicParams = true; // a product added to MongoDB later is rendered on first request, then cached
type P = { params: Promise<{ product: string }> };

export async function generateStaticParams() {
  const s = await getSite();
  return s.rows.filter((r) => r.family === "products" && r.indexable).map((r) => ({ product: r.entity!.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { product } = await params; const s = await getSite(); const p = s.product(product);
  if (!p) return { robots: { index: false } };
  const status = p.availability === "in-development" ? " (in development)" : "";
  return metaFor({ title: `${p.name} with ${p.headline}${status}`, short: `${p.name}${status}`, description: p.summary, path: `/products/${p.slug}`, seo: p.seo, og: { family: "products", slug: p.slug } });
}

export default async function ProductPage({ params }: P) {
  const { product } = await params; const s = await getSite();
  const redirect = s.redirectFor(`/products/${product}`); if (redirect) permanentRedirect(redirect.to);
  const p = s.product(product); if (!p) notFound();
  const path = `/products/${p.slug}`;
  const inds = s.industriesOfProduct(p.slug);
  const related = s.relatedProducts(p, 4);
  const resources = s.resourcesFor({ product: p.slug, tags: p.tags }, 4);
  const apps = s.applicationsFor({ product: p.slug }, 4);
  const sm = SECTOR_META[p.sector];
  const live = p.availability !== "in-development";
  const toc = [
    { id: "overview", label: "Overview" }, { id: "how", label: "How it works" }, { id: "specs", label: "Specifications" }, { id: "features", label: "Features" },
    { id: "benefits", label: "Benefits" }, { id: "applications", label: "Applications" }, { id: "industries", label: "Industries" },
    { id: "protocols", label: "Protocols and integrations" }, { id: "docs", label: "Documents" }, { id: "faq", label: "FAQ" },
  ];
  const cta = live ? { href: `/book-pilot?product=${p.slug}`, label: "Get a free pilot" } : { href: `/early-access?product=${p.slug}`, label: "Register interest" };
  return (
    <div data-sector={p.sector}>
      <JsonLd data={[
        live ? productLd(p, p.images.hero?.src) : webPage({ name: p.brandName, description: p.summary, path, modified: p.updatedAt, about: p.name }),
        ...(live ? [webPage({ name: p.name, description: p.summary, path, modified: p.updatedAt })] : []),
      ]} />
      <SectorHero
        sector={p.sector} scene={p.scene} sceneTitle={`${p.name} in use`} eyebrow={`${sm.label} · ${p.modelCode}`}
        title={`${p.name}: ${p.headline}`} lede={p.tagline}
        trail={[{ name: "Products", path: "/products" }, { name: p.name, path }]}
        meta={<><AvailabilityBadge a={p.availability} /><span className="chip">{DEVICE_META[p.device].name}</span></>}
        actions={<><ButtonLink href={cta.href}>{cta.label}</ButtonLink><ButtonLink href="#specs" kind="secondary">See specifications</ButtonLink></>}
        log={[p.alertExample]}
      />
      {!live && (
        <div className="border-b" style={{ background: "var(--warn-bg)", borderColor: "var(--border)" }}>
          <p className="container-x py-3 text-sm" style={{ color: "var(--warn-text)" }}><strong>In development.</strong> {AVAIL[p.availability].note} Specifications below are design targets, not promises. <Link href={`/early-access?product=${p.slug}`}>Register interest</Link>.</p>
        </div>
      )}
      <div className="container-x grid gap-10 xl:grid-cols-[1fr_200px]">
        <div className="min-w-0">
          <Band id="overview" className="!px-0">
            <SectionHead eyebrow="Overview" title={`What the ${p.name} does`} />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="prose-ca space-y-4">{p.overview.map((t) => <p key={t}>{t}</p>)}<h3 className="!mt-6">The problem it answers</h3><p>{p.problem}</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Typical buyers: {p.buyers.join(", ")}.</p></div>
              <div className="grid gap-4">
                <ImageSlot slot="device" device={p.device} image={p.images.hero} alt={`${p.brandName} device illustration`} />
                <DashboardPreview device={p.device} name={p.name} />
              </div>
            </div>
          </Band>
          <Band id="how" className="!px-0">
            <SectionHead eyebrow="Working principle" title="How it works, step by step" />
            <SignalPath sensor={p.hardware.sensors[0]} link={p.hardware.connectivity[0]} alert={p.alertExample.slice(0, 120) + (p.alertExample.length > 120 ? "…" : "")} />
            <div className="mt-6"><TitleBody items={p.how} cols={2} /></div>
            <div className="mt-6 grid gap-4 md:grid-cols-2"><AlertExample text={p.alertExample} /><div className="card"><p className="eyebrow">Report</p><h3>{p.reportName}</h3><p className="text-sm">Sent on a schedule to the people you choose, so the record is already kept when someone asks for it.</p></div></div>
          </Band>
          <Band id="specs" className="!px-0">
            <SectionHead eyebrow="Technical specifications" title={`${p.modelCode} specifications`} lede="Each line says whether it is confirmed, a design target, or still to be confirmed. We do not publish a figure we cannot back." />
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              {[["Sensors", p.hardware.sensors], ["Connectivity", p.hardware.connectivity], ["Power", [p.hardware.power]]].map(([k, v]) => <div key={k as string} className="card"><p className="kicker">{k as string}</p><ul className="mt-2 space-y-1 text-sm">{(v as string[]).map((x) => <li key={x}>{x}</li>)}</ul></div>)}
            </div>
            <SpecTable p={p} />
            {p.missing.length > 0 && <details className="card mt-4 !p-4"><summary className="cursor-pointer font-semibold" style={{ color: "var(--text)" }}>Not yet confirmed ({p.missing.length})</summary><ul className="mt-2 list-disc pl-5 text-sm">{p.missing.map((m) => <li key={m}>{m}</li>)}</ul></details>}
          </Band>
          <Band id="features" className="!px-0"><SectionHead eyebrow="Features" title="What you get" /><TitleBody items={p.features} cols={2} /></Band>
          <Band id="benefits" className="!px-0"><SectionHead eyebrow="Benefits" title="What changes for you" /><TitleBody items={p.benefits} cols={3} /></Band>
          <Band id="applications" className="!px-0">
            <SectionHead eyebrow="Applications" title="Where it is used" /><TitleBody items={p.applications} cols={3} />
            {apps.length > 0 && <div className="mt-6"><p className="kicker mb-3">Related application guides</p><Grid cols={4}>{apps.map((a) => <ApplicationCard key={a.slug} a={a} />)}</Grid></div>}
          </Band>
          <Band id="industries" className="!px-0">
            <SectionHead eyebrow="Industries" title={`Industries that use the ${p.name}`} />
            <Grid>{inds.map((i) => <IndustryCard key={i.slug} i={i} note={s.pairFor(i.slug, p.slug) ? `${p.name} setup for ${i.name}` : undefined} />)}</Grid>
            {s.pairsOfProduct(p.slug).length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{s.pairsOfProduct(p.slug).map((f) => <li key={f.industrySlug}><Link className="chip no-underline" href={`/industries/${f.industrySlug}/${p.slug}`}>{s.industry(f.industrySlug)?.name} setup</Link></li>)}</ul>}
          </Band>
          <Band id="protocols" className="!px-0">
            <SectionHead eyebrow="Protocols and integrations" title="What it speaks, what it connects to" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card"><h3>Protocols</h3><dl className="space-y-2 text-sm">{p.protocols.map((x) => <div key={x.name}><dt className="font-semibold" style={{ color: "var(--text)" }}>{x.name}</dt><dd className="m-0">{x.role}</dd></div>)}</dl></div>
              <div className="card"><h3>Integrations</h3><dl className="space-y-2 text-sm">{p.integrations.map((x) => <div key={x.name}><dt className="font-semibold" style={{ color: "var(--text)" }}>{x.name}</dt><dd className="m-0">{x.note}</dd></div>)}</dl></div>
            </div>
            <h3 className="!mt-8">Watch out</h3><p className="mb-2 text-sm">Honest limits, so you can decide before you buy.</p><Checklist items={p.watchOut} />
          </Band>
          <Band id="docs" className="!px-0">
            <SectionHead eyebrow="Documents" title="Datasheet, install guide and reports" />
            <ul className="grid gap-3 md:grid-cols-2">{p.docs.map((d) => (
              <li key={d.title} className="card !p-4"><p className="kicker">{d.kind.replace("-", " ")}</p><p className="font-semibold" style={{ color: "var(--text)" }}>{d.title}</p>
                {d.status === "available" && d.href ? <Link href={d.href}>Open</Link> : <p className="text-sm" style={{ color: "var(--text-muted)" }}>{d.status === "on-request" ? <>On request. <Link href={`/contact?topic=${p.slug}`}>Ask us</Link></> : "Planned. Not yet published."}</p>}</li>
            ))}</ul>
          </Band>
          <Band id="faq" className="!px-0"><FaqBlock faqs={p.faqs} title={`${p.name}: frequently asked questions`} /></Band>
          {resources.length > 0 && <Band className="!px-0"><SectionHead eyebrow="Guides" title="Read before you decide" /><Grid>{resources.map((r) => <ResourceCard key={r.slug} r={r} />)}</Grid></Band>}
          <Band className="!px-0"><SectionHead eyebrow="Related products" title="Often used with" /><Grid cols={4}>{related.map((q) => <ProductCard key={q.slug} p={q} />)}</Grid></Band>
        </div>
        <aside className="hidden xl:block"><div className="sticky top-24 pt-12"><Toc items={toc} /></div></aside>
      </div>
      <CtaBand productSlug={p.slug} title={live ? `Pilot the ${p.name}` : `Tell us you want the ${p.name}`} text={live ? "We install a kit at your site. If it does not work for you, you get your money back." : "It is not on sale yet. Early interest decides what we build next, and you hear first."} />
    </div>
  );
}
