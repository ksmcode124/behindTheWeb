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
  deskripsi: string;
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

/* Untuk API input */

export interface CrudKepengurusan {
  id: number;
  tahun_kerja: string;
  nama_kepengurusan: string;
}

export interface CrudDivisi {
  id: number;
  nama_divisi: string;
  deskripsi: string;
}

export interface CrudJabatan {
  id: number;
  nama_jabatan: string;
}

// Data Dasar Anggota (tanpa relasi)
export interface CrudAnggota {
  id: number;
  nama_anggota: string;
  linkedin: string;
  instagram: string;
}

// Detail Anggota (join table)
export interface DetailAnggota {
  id: number;
  anggota_id: number;
  kepengurusan_id: number;
  divisi_id: number;
  jabatan_id: number;
  anggota_nama?: string;
  kepengurusan_nama?: string;
  divisi_nama?: string;
  jabatan_nama?: string;
  foto_anggota?: string;
  linkedin?: string;
  instagram?: string;
}

export interface CrudDivisiGaleri {
  id: number; // ID foto galeri
  divisi_id: number; // ID divisi terkait
  kepengurusan_id: number; // ID kepengurusan terkait
  foto_divisi: string; // URL foto

  // Nama relasi untuk ditampilkan di tabel
  divisi_nama: string;
  kepengurusan_nama: string;
}
