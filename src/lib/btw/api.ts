import { KepengurusanResponse } from "./interfaces/btw";

const API_BASE = '/api/btw';

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

function normalizeItem(endpoint: string, item: any) {
  if (!item) return item;

  switch (endpoint) {
    case 'divisi':
      return {
        id: item.id_divisi ?? item.id,
        nama_divisi: item.nama_divisi,
        // SKEMA BARU: Foto dihapus, diganti deskripsi
        deskripsi: item.deskripsi,
      };

    case 'jabatan':
      return {
        id: item.id_jabatan ?? item.id,
        nama_jabatan: item.nama_jabatan,
      };

    case 'kepengurusan':
      return {
        id: item.id_btw ?? item.id,
        tahun_kerja: item.tahun_kerja,
        nama_kepengurusan: item.nama_kepengurusan,
      };

    case 'anggota':
      return {
        id: item.id_anggota ?? item.id,
        nama_anggota: item.nama_anggota,
        // SKEMA BARU: Foto anggota dihapus dari tabel master anggota
        linkedin: item.linkedin,
        instagram: item.instagram,
      };

    case 'detail_anggota':
    case 'detail':
      return {
        id: item.id,
        // Mapping Foreign Keys
        anggota_id: item.id_anggota ?? item.anggota_id,
        kepengurusan_id: item.id_btw ?? item.kepengurusan_id,
        divisi_id: item.id_divisi ?? item.divisi_id,
        jabatan_id: item.id_jabatan ?? item.jabatan_id,

        // Mapping Nama dari Relasi
        anggota_nama: item.anggota?.nama_anggota ?? item.anggota_nama,
        kepengurusan_nama:
          item.kepengurusan?.nama_kepengurusan ?? item.kepengurusan_nama,
        divisi_nama: item.divisi?.nama_divisi ?? item.divisi_nama,
        jabatan_nama: item.jabatan?.nama_jabatan ?? item.jabatan_nama,

        // SKEMA BARU:
        // 1. Foto diambil langsung dari tabel detail (item.foto_anggota)
        foto_anggota: item.foto_anggota,

        // 2. Sosmed tetap diambil dari relasi tabel anggota
        linkedin: item.anggota?.linkedin ?? item.linkedin,
        instagram: item.anggota?.instagram ?? item.instagram,
      };

    case 'divisi_galeri':
      return {
        id: item.id_fotoDiv ?? item.id, // Mapping Primary Key
        id_divisi: item.id_divisi ?? item.divisi_id,
        id_btw: item.id_btw ?? item.kepengurusan_id,
        foto_divisi: item.foto_divisi, // URL Foto

        // Data Join/Relasi (Untuk ditampilkan di Tabel)
        divisi_nama: item.divisi?.nama_divisi ?? 'N/A',
        kepengurusan_nama: item.kepengurusan?.nama_kepengurusan ?? 'N/A',
      };

    default:
      return item;
  }
};

const resolveEndpoint = (endpoint: string) => {
  if (endpoint === 'detail_anggota') return 'detail';
  return endpoint;
};

export async function fetchDataFromAPI(endpoint: string) {
  try {
    const resolved = resolveEndpoint(endpoint);
    console.log(`Mengambil data dari: ${API_BASE}/${endpoint}`);
    const response = await fetch(`${API_BASE}/${resolved}`);

    if (!response.ok) {
      console.error(`Error HTTP! status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log(`Data diterima dari ${endpoint}:`, data);

    if (Array.isArray(data))
      return data.map((item) => normalizeItem(endpoint, item));
    if (data && data.data && Array.isArray(data.data))
      return data.data.map((item: any) => normalizeItem(endpoint, item));

    console.error('Format data tidak dikenali:', data);
    return [];
  } catch (error) {
    console.error(`Error mengambil ${endpoint}:`, error);
    return [];
  }
};

export async function saveDataToAPI (endpoint: string, data: any, id?: number) {
  try {
    const resolved = resolveEndpoint(endpoint);
    const url = id
      ? `${API_BASE}/${resolved}/${id}`
      : `${API_BASE}/${resolved}`;
    const method = id ? 'PUT' : 'POST';

    console.log(`Menyimpan ke: ${url}`, data);

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Data berhasil disimpan:', result);

    // Normalisasi payload supaya selalu berupa objek data ter-normalisasi
    const raw = result?.data ?? result;
    return normalizeItem(endpoint, raw);
  } catch (error) {
    console.error(`Error menyimpan ${endpoint}:`, error);
    throw error;
  }
};

export async function deleteDataFromAPI (endpoint: string, id: number) {
  try {
    const resolved = resolveEndpoint(endpoint);
    console.log(`Menghapus dari: ${API_BASE}/${resolved}/${id}`);
    const response = await fetch(`${API_BASE}/${resolved}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) return false;

    // Jika API mengembalikan { success: boolean }, gunakan itu
    const result = await response.json().catch(() => null);
    return result?.success ?? true;
  } catch (error) {
    console.error(`Error menghapus ${endpoint}/${id}:`, error);
    return false;
  }
};