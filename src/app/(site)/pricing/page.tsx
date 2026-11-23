import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, PlanTable, FaqBlock, CtaBand } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GENERAL_FAQS } from "@/content/plans";

export const metadata = buildMetadata({ title: "Pricing: Monitoring Plans per Device per Month", description: "Starter, Pro and Business plans for ConnectAtom monitoring, from ₹299 per device per month. One-time device price, 30-day money-back pilot.", path: "/pricing" });
export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Pay once for the device. Then one simple monthly plan." lede="The plan covers the dashboard, alerts, reports and support. Three plans, so the choice is easy.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Pricing", path: "/pricing" }]} /></div>
      </PageHero>
      <Section><PlanTable /><p className="mt-6 max-w-2xl text-sm">The device is a one-time price, shown on each product page and confirmed in your quote. Plans are per device per month. A room or godown with several devices pays per device.</p></Section>
      <Section className="!pt-0"><div className="max-w-3xl"><FaqBlock faqs={GENERAL_FAQS} /></div></Section>
      <CtaBand />
    </>
  );
}
