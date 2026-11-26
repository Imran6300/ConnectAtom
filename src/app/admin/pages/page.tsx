import { PageHeader } from "@/components/portal/ui";
import { getSite } from "@/lib/catalogue/site";

// Reads the same registry that drives routes, sitemaps and internal links, so this view cannot disagree with them.
export default async function Page() {
  const s = await getSite(); const rows = s.rows; const pub = s.indexable.length;
  const byFamily = Object.entries(rows.reduce<Record<string, [number, number]>>((a, r) => { const x = (a[r.family] ??= [0, 0]); x[0]++; if (r.indexable) x[1]++; return a; }, {}));
  return (<>
    <PageHeader title="Pages and SEO" sub={`${pub} indexable of ${rows.length} pages. Thin, gated or noindex pages are excluded from sitemaps and marked noindex.`} />
    <div className="mb-4 flex flex-wrap gap-2">{byFamily.map(([f, [t, p]]) => <span key={f} className="chip">{f}: {p}/{t}</span>)}</div>
    <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>URL</th><th>Type</th><th>Words</th><th>State</th><th>Why not indexed</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.url}><td className="mono text-xs">{r.url}</td><td>{r.template}</td><td className="num">{r.wordCount || "-"}</td><td>{r.indexable ? <span className="badge badge-ok">In sitemap</span> : <span className="badge badge-warn">{r.state}</span>}</td><td className="text-xs">{r.reasons.join("; ") || "-"}</td></tr>)}</tbody></table></div></>);
}
