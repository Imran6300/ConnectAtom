import type { DeviceKey } from "@/lib/catalogue/types";
import { SampleTag } from "@/components/ui/primitives";

const KIND: Record<DeviceKey, { label: string; unit: string; value: string; limit: string; seed: number }> = {
  "gateway-probe": { label: "Cold Room 2", unit: "°C", value: "4.2", limit: "Limit 2 to 8°C", seed: 1 },
  "climate-node": { label: "Zone A", unit: "°C", value: "24.6", limit: "Limit 18 to 27°C", seed: 2 },
  "server-node": { label: "Rack row 3", unit: "°C", value: "23.1", limit: "Limit up to 27°C", seed: 3 },
  "door-sensor": { label: "Door, Store 1", unit: "", value: "Closed", limit: "Alert after 5 min open", seed: 4 },
  "leak-rope": { label: "Under-floor loop", unit: "", value: "Dry", limit: "Alert on wet", seed: 5 },
  "tank-level": { label: "Tank 1", unit: "%", value: "72", limit: "Alert below 25%", seed: 6 },
  "clamp-meter": { label: "Compressor 1", unit: "A", value: "11.8", limit: "Alert above 16 A", seed: 7 },
  "vibration-puck": { label: "Pump motor", unit: "mm/s", value: "2.4", limit: "Baseline 1.8 to 3.0", seed: 8 },
  "air-quality": { label: "Ward 2", unit: "ppm CO₂", value: "720", limit: "Alert above 1000", seed: 9 },
  "soil-stake": { label: "Plot 4", unit: "%", value: "31", limit: "Irrigate below 22%", seed: 10 },
  "water-probe": { label: "Pond 3", unit: "mg/L", value: "5.8", limit: "Alert below 4.0", seed: 11 },
  "gps-tracker": { label: "Vehicle 07", unit: "", value: "On route", limit: "Geofence: depot", seed: 12 },
  "counter-sensor": { label: "Line 2", unit: "/h", value: "412", limit: "Alert below 300", seed: 13 },
};

/** Deterministic sample trace (no randomness, so server and client agree). */
const trace = (seed: number) => Array.from({ length: 28 }, (_, i) => 20 + Math.sin((i + seed) / 3) * 7 + Math.cos((i * seed) / 5) * 3);

export function DashboardPreview({ device, name }: { device: DeviceKey; name: string }) {
  const k = KIND[device]; const t = trace(k.seed);
  const min = Math.min(...t), max = Math.max(...t);
  const d = t.map((v, i) => `${i ? "L" : "M"}${(i / 27) * 300},${44 - ((v - min) / (max - min || 1)) * 38}`).join(" ");
  return (
    <div className="card" data-theme="dark" style={{ background: "var(--surface)" }} aria-label={`Sample dashboard card for ${name}`}>
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-semibold" style={{ color: "var(--text)" }}>{k.label}</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>{k.limit}</p></div>
        <span className="badge badge-ok"><span className="live-dot" /> Normal</span>
      </div>
      <p className="num my-3 text-[2.4rem] font-medium leading-none" style={{ color: "var(--text)" }}>{k.value}<span className="ml-1 text-lg" style={{ color: "var(--text-muted)" }}>{k.unit}</span></p>
      <svg viewBox="0 0 300 48" className="h-12 w-full" role="img" aria-label="Sample trend, steady"><path d={d} className="draw" fill="none" stroke="var(--sector, var(--accent-graphic))" strokeWidth="2" strokeLinejoin="round" /></svg>
      <div className="mt-2 flex items-center justify-between"><SampleTag>Sample screen, not a live reading</SampleTag></div>
    </div>
  );
}
