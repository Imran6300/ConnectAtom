import type { Metadata } from "next";
import { AuthShell } from "../AuthShell"; import { ForgotForm } from "../AuthForms";
export const metadata: Metadata = { title: "Reset password | ConnectAtom", robots: { index: false, follow: false } };
export default function Page() { return <AuthShell title="Reset your password"><ForgotForm /></AuthShell>; }
