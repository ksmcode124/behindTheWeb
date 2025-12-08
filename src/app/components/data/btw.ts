// hooks/useBtwData.ts
'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export interface Anggota {
  nama_anggota: string;
  foto_anggota: string | null;
  linkedin: string | null;
  instagram: string | null;
  jabatan: string;
}

export interface Divisi {
  nama_divisi: string;
  anggota: Anggota[];
}

export interface BtwData {
  tahun_kerja: string;
  nama_kepengurusan: string;
  divisi: Divisi[];
}

export const useBtwData = () => {
  const [data, setData] = useState<BtwData | null>(null);

  useEffect(() => {
    axios
      .get("http://192.168.18.64:3000/api/display/btw")
      .then(res => setData(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return data;
};
