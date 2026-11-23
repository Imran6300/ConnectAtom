"use client";
import { PageHeader, useFetch, Loading, fmtTime } from "@/components/portal/ui";
type L = { _id: string; ts: string; action: string; target?: string; actorLabel?: string; ip?: string };
export default function Page() {
  const a = useFetch<L[]>("/admin/audit");
  return (<><PageHeader title="Audit log" sub="Last 200 sensitive actions." />{a.loading ? <Loading /> : <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Target</th></tr></thead><tbody>{a.data?.map((l) => <tr key={l._id}><td>{fmtTime(l.ts)}</td><td>{l.actorLabel ?? "-"}</td><td className="mono text-xs">{l.action}</td><td className="mono text-xs">{l.target ?? "-"}</td></tr>)}</tbody></table></div>}</>);
}
