"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { api } from "@/lib/api";

type Handler = (event: string, payload: Record<string, unknown>) => void;
const Ctx = createContext<{ subscribe: (h: Handler) => () => void }>({ subscribe: () => () => {} });

// One Socket.IO connection for the whole portal. The short-lived token comes from the API; the server
// puts the socket in the tenant's room, so a browser only ever receives its own tenant's events.
export function LiveProvider({ children, enabled = true }: { children: React.ReactNode; enabled?: boolean }) {
  const handlers = useRef(new Set<Handler>());
  useEffect(() => {
    if (!enabled) return;
    let socket: Socket | null = null; let stopped = false;
    (async () => {
      try {
        const { data } = await api.get<{ token: string }>("/auth/socket-token");
        if (stopped) return;
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000", { auth: { token: data.token }, transports: ["websocket", "polling"] });
        for (const ev of ["reading", "incident", "device"]) socket.on(ev, (p) => handlers.current.forEach((h) => h(ev, p)));
        // token lasts 10 minutes: fetch a fresh one before every reconnect
        socket.io.on("reconnect_attempt", async () => { try { const r = await api.get<{ token: string }>("/auth/socket-token"); if (socket) socket.auth = { token: r.data.token }; } catch { /* ignore */ } });
      } catch { /* live updates are a bonus: pages still work by reloading */ }
    })();
    return () => { stopped = true; socket?.disconnect(); };
  }, [enabled]);
  return <Ctx.Provider value={{ subscribe: (h) => { handlers.current.add(h); return () => { handlers.current.delete(h); }; } }}>{children}</Ctx.Provider>;
}
export function useLive(h: Handler) {
  const { subscribe } = useContext(Ctx); const ref = useRef(h); ref.current = h;
  useEffect(() => subscribe((e, p) => ref.current(e, p)), [subscribe]);
}
