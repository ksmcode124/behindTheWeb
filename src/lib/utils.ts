import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Divisi } from "./btw/interfaces/btw"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isInti(divisi: Divisi) {
  return divisi.nama_divisi.toLowerCase() === 'inti';
}