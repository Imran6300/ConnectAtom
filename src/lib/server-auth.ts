import { cookies } from "next/headers";

export type Session = {
  user: { id: string; name: string; email: string; phone?: string; staffRole: string | null };
  tenant: { id: string; name: string; plan: "starter" | "pro" | "business"; status: string; timezone: string } | null;
  plan: { label: string; retentionDays: number; maxUsers: number | null; channels: string[] } | null;
  role: string | null; permissions: string[];
};

// Server-side session check for layouts. Calls the Express API with the visitor's cookie.
export async function getServerSession(): Promise<Session | null> {
  const token = (await cookies()).get("ca_token")?.value;
  if (!token) return null;
  try {
    const res = await fetch(`${process.env.BACKEND_URL ?? "http://localhost:5000"}/api/auth/me`, { headers: { cookie: `ca_token=${token}` }, cache: "no-store" });
    return res.ok ? ((await res.json()) as Session) : null;
  } catch { return null; }
}
