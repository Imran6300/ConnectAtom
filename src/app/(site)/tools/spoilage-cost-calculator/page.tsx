import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, CtaBand } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Calculator } from "./Calculator";

export const metadata = buildMetadata({ title: "Spoilage Cost Calculator for Cold Rooms and Fridges", description: "Estimate what an unnoticed cold room or fridge failure costs you each year, and compare it with the yearly cost of ConnectAtom monitoring.", path: "/tools/spoilage-cost-calculator" });
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tool" title="Spoilage cost calculator" lede="Enter your own numbers. The result shows its assumptions, so you can check it.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Tools", path: "/tools" }, { name: "Spoilage cost calculator", path: "/tools/spoilage-cost-calculator" }]} /></div>
      </PageHero>
      <Section><Calculator />
        <div className="prose-ca mt-10 max-w-3xl"><h2>How this is calculated</h2><p>Expected yearly loss is the number of failures a year, times the value of stock exposed in one failure, times the share of that stock that spoils before the failure is noticed. Monitoring cost is devices times the plan price times 12. The share spoiled depends on how fast you find out, which is your estimate, not a measured figure. This is a planning aid, not a promise of savings.</p></div></Section>
      <CtaBand />
    </>
  );
}
