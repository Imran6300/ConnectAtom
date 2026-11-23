import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, toApiError } from "@/lib/api";
import type { Session } from "@/lib/server-auth";

type State = { session: Session | null };
const initial: State = { session: null };

export const login = createAsyncThunk<Session, { email: string; password: string }, { rejectValue: string }>("auth/login", async (b, { rejectWithValue }) => {
  try { return (await api.post<Session>("/auth/login", b)).data; } catch (e) { return rejectWithValue(toApiError(e).message); }
});
export const register = createAsyncThunk<Session, Record<string, unknown>, { rejectValue: string }>("auth/register", async (b, { rejectWithValue }) => {
  try { return (await api.post<Session>("/auth/register", b)).data; } catch (e) { return rejectWithValue(toApiError(e).message); }
});
export const logout = createAsyncThunk("auth/logout", async () => { await api.post("/auth/logout"); });
export const refreshSession = createAsyncThunk("auth/me", async () => (await api.get<Session>("/auth/me")).data);

const slice = createSlice({
  name: "auth", initialState: initial,
  reducers: { setSession: (s, a: { payload: Session | null }) => { s.session = a.payload; } },
  extraReducers: (b) => {
    b.addCase(login.fulfilled, (s, a) => { s.session = a.payload; })
      .addCase(register.fulfilled, (s, a) => { s.session = a.payload; })
      .addCase(refreshSession.fulfilled, (s, a) => { s.session = a.payload; })
      .addCase(logout.fulfilled, (s) => { s.session = null; });
  },
});
export const { setSession } = slice.actions;
export default slice.reducer;
