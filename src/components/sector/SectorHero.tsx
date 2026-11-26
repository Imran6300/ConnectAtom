import type { ReactNode } from "react";
import type { SceneKey, SectorKey } from "@/lib/catalogue/types";
import { Scene } from "@/components/visuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

/** Three hero compositions. The sector picks one, so industries do not share a layout:
 *  panel = copy left, framed scene right (cold-chain, healthcare, facilities)
 *  backdrop = full-bleed scene behind copy (agriculture, logistics)
 *  log = copy beside a monospace status log over a dim scene (food-service, industrial) */
export const HERO_VARIANT: Record<SectorKey, "panel" | "backdrop" | "log"> = {
  "cold-chain": "panel", healthcare: "panel", facilities: "panel", agriculture: "backdrop", logistics: "backdrop", "food-service": "log", industrial: "log",
};
type Props = { sector: SectorKey; scene: SceneKey; eyebrow: string; title: string; lede: string; trail: { name: string; path: string }[]; actions?: ReactNode; meta?: ReactNode; aside?: ReactNode; log?: string[]; sceneTitle: string };

export function SectorHero({ sector, scene, eyebrow, title, lede, trail, actions, meta, aside, log, sceneTitle }: Props) {
  const v = HERO_VARIANT[sector];
  const copy = (
    <div className="relative z-10">
      <Breadcrumbs trail={trail} dark />
      <p className="eyebrow mb-3 flex items-center gap-2"><span className="sector-dot h-2 w-2 rounded-full" />{eyebrow}</p>
      <h1 className="rise !text-[clamp(2rem,4.6vw,3.25rem)]">{title}</h1>
      <p className="lede rise rise-2 mt-3 max-w-xl" style={{ color: "var(--text-body)" }}>{lede}</p>
      {meta && <div className="rise rise-3 mt-4 flex flex-wrap gap-2">{meta}</div>}
      {actions && <div className="rise rise-4 mt-7 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
  return (
    <section data-theme="dark" data-sector={sector} className="relative overflow-hidden circuit-bg" style={{ background: "var(--ca-ink)" }}>
      {v === "backdrop" && (
        <>
          <div className="absolute inset-0 opacity-60" aria-hidden><Scene name={scene} className="h-full w-full object-cover" /></div>
          <div className="hero-fade absolute inset-0" aria-hidden />
        </>
      )}
      <div className={`container-x relative grid items-center gap-10 py-12 sm:py-20 ${v === "backdrop" ? "min-h-[460px]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
        {copy}
        {v === "panel" && (
          <div className="rise rise-2 overflow-hidden rounded-[20px] border" style={{ borderColor: "var(--sector)", background: "var(--sector-soft)", aspectRatio: "16/10" }}>
            <Scene name={scene} className="h-full w-full" title={sceneTitle} />
          </div>
        )}
        {v === "log" && (
          <div className="rise rise-2 relative overflow-hidden rounded-[16px] border" style={{ borderColor: "var(--border)", background: "rgba(10,22,34,.7)" }}>
            <div className="absolute inset-0 opacity-25" aria-hidden><Scene name={scene} className="h-full w-full object-cover" /></div>
            <div className="relative p-5">
              <p className="kicker mb-3 flex items-center gap-2"><span className="live-dot" />Sample status log</p>
              <ul className="mono space-y-1.5 text-[0.8rem]" style={{ color: "var(--text-body)" }}>{(log ?? []).map((l, i) => <li key={i} className="flex gap-2"><span style={{ color: "var(--sector)" }}>▸</span>{l}</li>)}</ul>
            </div>
          </div>
        )}
        {v === "backdrop" && aside && <div className="relative z-10 hidden lg:block" />}
      </div>
    </section>
  );
}
