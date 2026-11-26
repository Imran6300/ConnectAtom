import type { Industry, SectorKey } from "@/lib/catalogue/types";
import { SampleTag } from "@/components/ui/primitives";

type Row = Industry["sample"]["rows"][number];
const STATE = { ok: "var(--ok-text)", warn: "var(--warn-text)", crit: "var(--crit-text)" } as const;
const col = (r: Row) => STATE[r.state ?? "ok"];

/** One signature module per sector. The content is the industry's own sample; the form changes with the sector. */
function Body({ sector, rows }: { sector: SectorKey; rows: Row[] }) {
  switch (sector) {
    case "cold-chain": // excursion table
      return <table className="table-ca"><thead><tr><th>Time</th><th>Event</th><th>Reading</th></tr></thead><tbody>{rows.map((r, i) => <tr key={i}><td className="num">{r.time}</td><td>{r.label}</td><td className="num" style={{ color: col(r) }}>{r.value}</td></tr>)}</tbody></table>;
    case "healthcare": // timeline
      return <ol className="relative ml-2 border-l pl-6" style={{ borderColor: "var(--sector)" }}>{rows.map((r, i) => <li key={i} className="relative pb-5 last:pb-0"><span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full" style={{ background: col(r) }} /><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>{r.time}</p><p style={{ color: "var(--text)" }}>{r.label}{r.value && <span className="num ml-2" style={{ color: col(r) }}>{r.value}</span>}</p></li>)}</ol>;
    case "food-service": // shift cards
      return <div className="grid gap-3 sm:grid-cols-2">{rows.map((r, i) => <div key={i} className="rounded-[12px] border p-3" style={{ borderColor: "var(--border)", borderLeft: `4px solid ${col(r)}` }}><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>{r.time}</p><p className="text-sm" style={{ color: "var(--text)" }}>{r.label}</p>{r.value && <p className="num text-lg" style={{ color: col(r) }}>{r.value}</p>}</div>)}</div>;
    case "agriculture": // day-night band
      return <div className="grid gap-2">{rows.map((r, i) => <div key={i} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 text-sm"><span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{r.time}</span><span className="h-6 rounded-full" style={{ background: `linear-gradient(90deg, var(--sector-soft), ${col(r)})`, width: `${40 + ((i * 17) % 55)}%` }} aria-hidden /><span style={{ color: "var(--text)" }}>{r.label} <span className="num" style={{ color: col(r) }}>{r.value}</span></span></div>)}</div>;
    case "industrial": // state bars
      return <ul className="grid gap-3">{rows.map((r, i) => <li key={i}><div className="mb-1 flex justify-between text-sm"><span style={{ color: "var(--text)" }}>{r.label}</span><span className="num" style={{ color: col(r) }}>{r.value}</span></div><div className="h-2 rounded-full" style={{ background: "var(--border)" }}><div className="h-2 rounded-full" style={{ width: r.state === "crit" ? "92%" : r.state === "warn" ? "68%" : "38%", background: col(r) }} /></div></li>)}</ul>;
    case "facilities": // site grid
      return <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{rows.map((r, i) => <div key={i} className="rounded-[12px] border p-3 text-center" style={{ borderColor: col(r), background: "var(--sector-soft)" }}><p className="text-sm" style={{ color: "var(--text)" }}>{r.label}</p><p className="num mt-1 text-xl" style={{ color: col(r) }}>{r.value}</p>{r.time && <p className="mono text-[10px]" style={{ color: "var(--text-muted)" }}>{r.time}</p>}</div>)}</div>;
    case "logistics": // route stops
      return <ol className="grid gap-0">{rows.map((r, i) => <li key={i} className="grid grid-cols-[28px_1fr] gap-3"><div className="flex flex-col items-center"><span className="mt-1 h-3 w-3 rounded-full" style={{ background: col(r) }} />{i < rows.length - 1 && <span className="w-px flex-1" style={{ background: "var(--sector)" }} />}</div><div className="pb-4"><p className="mono text-xs" style={{ color: "var(--text-muted)" }}>{r.time}</p><p style={{ color: "var(--text)" }}>{r.label} {r.value && <span className="num" style={{ color: col(r) }}>{r.value}</span>}</p></div></li>)}</ol>;
  }
}
export function SampleModule({ sector, sample }: { sector: SectorKey; sample: Industry["sample"] }) {
  return (
    <figure className="card m-0" data-sector={sector}>
      <figcaption className="mb-4"><h3 className="!mb-1">{sample.title}</h3><p className="text-sm">{sample.caption}</p><SampleTag /></figcaption>
      <Body sector={sector} rows={sample.rows} />
    </figure>
  );
}
