import { KepengurusanResponse } from "./interfaces/btw";

// lib/api.ts
async function apiGet<T>(path: string, options?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

  const res = await fetch(`${base}${path}`, {
    cache: "no-store",
    ...options,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
}

export async function fetchCurrentKepengurusan() {
  const res = await apiGet<KepengurusanResponse>('/api/display/btw');
  return res.data;
}

export async function fetchKepengurusanByYear({ year } : { year: number}) {
  const res = await apiGet<KepengurusanResponse>(`/api/display/btw?tahun=${year}`);
  return res.data;
}