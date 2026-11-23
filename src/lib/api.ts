import axios from "axios";

// Same-origin: Next rewrites /api/* to the Express backend, so the httpOnly auth cookie is first-party.
export const api = axios.create({ baseURL: "/api", withCredentials: true, headers: { "Content-Type": "application/json" } });

export type ApiError = { message: string; fields?: Record<string, string>; status?: number };
export function toApiError(e: unknown): ApiError {
  if (axios.isAxiosError(e)) return { message: e.response?.data?.error ?? "Could not reach the server. Please try again.", fields: e.response?.data?.fields, status: e.response?.status };
  return { message: "Something went wrong." };
}
