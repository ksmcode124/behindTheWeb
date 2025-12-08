// Data setiap anggota
export interface Anggota {
  nama_anggota: string;
  foto_anggota: string | null;
  linkedin: string | null;
  instagram: string | null;
  jabatan: string;
}

// Data divisi (sesuai output endpoint / route.ts)
export interface Divisi {
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
