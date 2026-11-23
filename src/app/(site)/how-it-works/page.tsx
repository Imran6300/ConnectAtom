import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, HowItWorks, CtaBand, Eyebrow } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = buildMetadata({ title: "How ConnectAtom Monitoring Works: Install, Connect, Get Alerted", description: "How a ConnectAtom sensor, dashboard and WhatsApp alert work together, what happens during a power cut, and who is told when nobody answers.", path: "/how-it-works" });
export default function How() {
  return (
    <>
      <PageHero eyebrow="How it works" title="From a small sensor to a calm alert" lede="Three steps for you. Here is what happens behind them.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "How it works", path: "/how-it-works" }]} /></div>
      </PageHero>
      <Section><HowItWorks /></Section>
      <Section className="!pt-0"><div className="prose-ca max-w-3xl">
        <Eyebrow>Behind the alert</Eyebrow><h2 className="!mt-0">What happens when something drifts</h2>
        <ol>
          <li>The sensor sends a reading about once a minute and keeps a local buffer if the network drops.</li>
          <li>ConnectAtom checks it against your limit. A reading that stays out of range for the time you set opens one alert, not one per reading.</li>
          <li>The first person on your list is told. The alert says what happened, for how long, and what to check.</li>
          <li>If nobody acknowledges within your set time, the next person is told, then the next.</li>
          <li>When the reading returns to normal, the alert closes and a message says how long it lasted.</li>
          <li>If a device stops sending data, that is its own alert, because silence is also a failure.</li>
        </ol>
        <h2>When the power or network goes</h2><p>Devices keep a battery backup and send a power-cut alert. Readings are stored on the device and uploaded in order when the link returns. Where Wi-Fi is weak, a 4G variant keeps the device connected. An optional buzzer and light alarm locally even when the network is down.</p>
        <h2>Who sees what</h2><p>Each customer sees only their own devices and data. You choose who can view, who can acknowledge alerts, and who can change limits. Every change is logged. <a href="/security">Read about security</a>.</p>
      </div></Section>
      <CtaBand />
    </>
  );
}
