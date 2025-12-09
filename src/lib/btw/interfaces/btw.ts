// Data setiap anggota
export interface Anggota {
  id?: number | string;
  nama_anggota: string;
  foto_anggota: string | null;
  linkedin: string | null;
  instagram: string | null;
  jabatan: string;
}

// Data divisi (sesuai output endpoint / route.ts)
export interface Divisi {
  id?: number | string;
  nama_divisi: string;
  foto_divisi?: string | null;
  anggota: Anggota[]; // sudah berupa array anggota sesuai route
}

// Helper untuk FE (prev/next navigation)
export interface HelperKepengurusan {
  years: string[];          // list semua tahun
  index: number;            // index tahun sekarang
  prev: string | null;      // tahun sebelumnya
  next: string | null;      // tahun berikutnya
}

// Response utama untuk /api/display/btw?tahun=xxxx
export interface KepengurusanResponse {
  success: boolean;
  data: {
    tahun_kerja: string;
    nama_kepengurusan: string;
    divisi: Divisi[];
  };
  helper: HelperKepengurusan;
}

// Response untuk /api/display/btw/years
export interface YearsResponse {
  success: boolean;
  years: string[];
}

/* DTO untuk API input */
export interface CreateAnggotaInput {
  nama_anggota: string;
  foto_anggota?: string | null; // URL dari uploader
  linkedin?: string | null;
  instagram?: string | null;
}
export interface UpdateAnggotaInput {
  nama_anggota?: string;
  foto_anggota?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
}

export interface CreateDivisiInput {
  nama_divisi: string;
  foto_divisi?: string | null;
}
export interface UpdateDivisiInput {
  nama_divisi?: string;
  foto_divisi?: string | null;
}
