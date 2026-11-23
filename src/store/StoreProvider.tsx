"use client";
import { useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { makeStore, type AppStore, type AppDispatch, type RootState } from "./index";
import type { Session } from "@/lib/server-auth";

export function StoreProvider({ session, children }: { session: Session | null; children: React.ReactNode }) {
  const ref = useRef<AppStore | null>(null);
  if (!ref.current) ref.current = makeStore(session);
  return <Provider store={ref.current}>{children}</Provider>;
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSession = () => useSelector((s: RootState) => s.auth.session);
export const useCan = (perm: string) => !!useSession()?.permissions.includes(perm);
