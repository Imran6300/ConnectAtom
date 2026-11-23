import type { Metadata } from "next";
import { AuthShell } from "../AuthShell"; import { ResetForm } from "../AuthForms";
export const metadata: Metadata = { title: "New password | ConnectAtom", robots: { index: false, follow: false } };
export default function Page() { return <AuthShell title="Choose a new password"><ResetForm /></AuthShell>; }
