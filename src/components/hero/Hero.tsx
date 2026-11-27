import type { CSSProperties } from "react";
import { CtaRow } from "@/components/marketing/blocks";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroStage } from "./HeroStage";
import "./hero.css";

const STEPS = ["Sensor reads", "Limit crossed", "Alert sent", "Acknowledged"];

// Home page hero. Copy is server-rendered (good for SEO and first paint); HeroStage is the only client part.
// HeroStage writes data-stage onto this <section> so the copy column can follow the animation.
export function Hero() {
  return (
    <section data-theme="dark" data-stage="steady" className="ca-hero circuit-bg" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="container-x ca-hero__grid">
        <div className="ca-hero__copy">
          <p className="ca-pill">
            <span className="live-dot" aria-hidden="true" />
            Wireless monitoring for cold rooms, clinics and kitchens
          </p>
          <h1 id="hero-title" className="display ca-title">
            <span className="ca-scan" style={{ "--d": "0.15s" } as CSSProperties}>Know before</span>
            <br />
            <span className="ca-scan" style={{ "--d": "0.55s" } as CSSProperties}>it fails.</span>
          </h1>
          <p className="lede ca-lede">Live readings and a WhatsApp alert the moment something drifts. Installed and supported for you.</p>
          <CtaRow secondary={{ href: "/how-it-works", label: "See how it works" }} />
          <p className="ca-assure">30-day money-back pilot. No long contract.</p>
          <ol className="ca-rail" aria-hidden="true">
            {STEPS.map((s) => (
              <li key={s}><i />{s}</li>
            ))}
          </ol>
        </div>
        <HeroStage />
      </div>
      <div className="ca-hero__edge" aria-hidden="true" />
    </section>
  );
}
