import { KepengurusanResponse, Divisi, HelperKepengurusan } from './interfaces/btw';

/**
 * mapKepengurusan:
 * - sekarang menerima objek kepengurusan (tahun_kerja, nama_kepengurusan)
 * - dan daftar divisi yang sudah berisi anggota (sesuai output route.ts)
 */
export function mapKepengurusan(
  kepengurusan: { tahun_kerja: string; nama_kepengurusan: string },
  divisiList: Divisi[],
  allYears: string[]
): KepengurusanResponse {

  // pastikan divisiList berbentuk array
  const divisi = Array.isArray(divisiList)
    ? divisiList.map(d => ({
        nama_divisi: d.nama_divisi,
        foto_divisi: d.foto_divisi ?? null,
        anggota: Array.isArray(d.anggota) ? d.anggota.map(a => ({
          nama_anggota: a.nama_anggota,
          foto_anggota: a.foto_anggota ?? null,
          linkedin: a.linkedin ?? null,
          instagram: a.instagram ?? null,
          jabatan: a.jabatan,
        })) : [],
      }))
    : [];

  // helper prev/next
  const currentIndex = allYears.findIndex(y => y === kepengurusan.tahun_kerja);
  const helper: HelperKepengurusan = {
    years: allYears,
    index: currentIndex,
    prev: allYears[currentIndex - 1] ?? null,
    next: allYears[currentIndex + 1] ?? null,
  };

  return {
    success: true,
    data: {
      tahun_kerja: kepengurusan.tahun_kerja,
      nama_kepengurusan: kepengurusan.nama_kepengurusan,
      divisi,
    },
    helper,
  };
}
