"use client";
import { PageHeader, useFetch, Loading, ago } from "@/components/portal/ui";
type A = { id: string; name: string; plan: string; status: string; devices: number; members: number; openIncidents: number; flags: { longOffline: number; noDevices: boolean }; createdAt: string };
export default function Page() {
  const a = useFetch<A[]>("/admin/accounts");
  return (<><PageHeader title="Accounts" sub="Churn signals: no devices claimed, or devices offline for over 48 hours." />
    {a.loading ? <Loading /> : <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>Business</th><th>Plan</th><th>Devices</th><th>Users</th><th>Open alerts</th><th>Signals</th><th>Created</th></tr></thead>
      <tbody>{a.data?.map((t) => <tr key={t.id}><td>{t.name}</td><td>{t.plan}</td><td className="num">{t.devices}</td><td className="num">{t.members}</td><td className="num">{t.openIncidents}</td><td>{t.flags.noDevices && <span className="badge badge-warn">No devices</span>} {t.flags.longOffline > 0 && <span className="badge badge-crit">{t.flags.longOffline} offline 48 h+</span>}</td><td>{ago(t.createdAt)}</td></tr>)}</tbody></table></div>}</>);
}
