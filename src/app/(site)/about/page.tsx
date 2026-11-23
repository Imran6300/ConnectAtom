import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, CtaBand } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({ title: "About ConnectAtom: Wireless Monitoring Built in Hyderabad", description: "ConnectAtom builds ready-to-use wireless monitoring for cold rooms, clinics, kitchens and warehouses in India, with install help and a clear monthly plan.", path: "/about" });
export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We make monitoring that works on day one" lede={SITE.boilerplate}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "About", path: "/about" }]} /></div>
      </PageHero>
      <Section><div className="prose-ca max-w-3xl">
        <h2 className="!mt-0">What we believe</h2>
        <ul><li><b>Precise.</b> Real numbers, exact times, specific alerts.</li><li><b>Calm.</b> Quiet by default, clear when it matters, never alarmist.</li><li><b>Practical.</b> It works on day one and is explained in your words: stock, fridge, shift.</li><li><b>Dependable.</b> Always on, honest about limits, easy to reach.</li></ul>
        <h2>Where we are</h2><p>We are based in {SITE.city}, India. Installation is in person in {SITE.city} and by video elsewhere. <a href="/contact">Contact us</a>.</p>
      </div></Section>
      <CtaBand />
    </>
  );
}
