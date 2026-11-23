import { PageHeader } from "@/components/portal/ui";
import { buildRegistry } from "@/lib/seo/registry";

// Read straight from the same registry that drives routes, sitemap and internal links.
export default function Page() {
  const rows = buildRegistry(); const pub = rows.filter((r) => r.indexable).length;
  return (<>
    <PageHeader title="Pages and SEO" sub={`${pub} indexable of ${rows.length} pages. A combination page publishes only if it passes the quality gate.`} />
    <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>URL</th><th>Type</th><th>State</th><th>Gate</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.url}><td className="mono text-xs">{r.url}</td><td>{r.template}</td><td>{r.indexable ? <span className="badge badge-ok">In sitemap</span> : <span className="badge badge-warn">Draft, noindex</span>}</td>
        <td className="text-xs">{r.gate ? (r.gate.passed ? `Passed · ${r.gate.wordCount} words · ${Math.round(r.gate.overlap * 100)}% overlap` : r.gate.failures.join("; ")) : "-"}</td></tr>)}</tbody></table></div></>);
}
