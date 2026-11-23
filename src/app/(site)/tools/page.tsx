import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = buildMetadata({ title: "Free Tools for Cold Storage and Monitoring Decisions", description: "Free calculators to estimate what a missed temperature alert costs and whether monitoring pays for itself at your site.", path: "/tools" });
export default function Tools() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Work out what a missed alert costs you">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Tools", path: "/tools" }]} /></div>
      </PageHero>
      <Section><Link href="/tools/spoilage-cost-calculator" className="card block max-w-xl no-underline" style={{ color: "inherit" }}><h3>Food and stock spoilage cost calculator</h3><p>Estimate the yearly cost of unnoticed failures and compare it with the cost of monitoring.</p></Link></Section>
    </>
  );
}
