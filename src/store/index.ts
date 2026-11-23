import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import type { Session } from "@/lib/server-auth";

export const makeStore = (session: Session | null = null) => configureStore({ reducer: { auth }, preloadedState: { auth: { session } } });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
