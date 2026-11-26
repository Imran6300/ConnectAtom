import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/blocks";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSite } from "@/lib/catalogue/site";

export const metadata: Metadata = { title: "Register early-access interest | ConnectAtom", robots: { index: false, follow: false } };
export default async function EarlyAccess({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const site = await getSite();
  const sp = await searchParams;
  const p = sp.product ? site.product(sp.product) : undefined;
  return (
    <>
      <PageHero eyebrow="Early access" title={p ? `Register interest in the ${p.name}` : "Register early-access interest"} lede="This product is in development. Tell us what you need to monitor. We use the interest we collect to decide what to build next, and we will contact you before anything ships." />
      <Section><div className="card max-w-2xl"><LeadForm kind="contact" productSlug={p?.slug} products={site.products.filter((x) => x.availability === "in-development").map((x) => ({ slug: x.slug, name: x.name }))} cta="Register interest" /></div></Section>
    </>
  );
}
