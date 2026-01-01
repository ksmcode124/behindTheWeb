// api/display/btw/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapKepengurusan } from '@/lib/btw/map';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tahunKerja = searchParams.get('tahun');

    // Ambil semua tahun (untuk next/prev)
    const allYears = await prisma.btw_kepengurusan.findMany({
      select: { tahun_kerja: true },
      orderBy: { tahun_kerja: 'asc' }
    });

    // Tentukan tahun target (atau pakai terbaru)
    const tahunList = allYears.map(y => y.tahun_kerja);
    const targetTahun = tahunKerja || tahunList[tahunList.length - 1];

    // Ambil data kabinet yg sesuai
    const kepengurusan = await prisma.btw_kepengurusan.findFirst({
      where: { tahun_kerja: targetTahun },
    });

    if (!kepengurusan) {
      return NextResponse.json(
        { success: false, message: 'Kepengurusan tidak ditemukan' },
        { status: 404 }
      );
    }

    const Divisi = await prisma.btw_divisi.findMany({
      orderBy: { nama_divisi: 'asc' },
      include: {
        galeri: {
          where: { id_btw: kepengurusan.id_btw },
        },
        detail: {
          where: { id_btw: kepengurusan.id_btw }, // ✅ Filter by tahun
          include: {
            anggota: true,
            jabatan: true,
          },
          orderBy: [
            { jabatan: { nama_jabatan: 'asc' } },
            { anggota: { nama_anggota: 'asc' } },
          ],
        },
      },
    });

    // ✅ FILTER: Hanya divisi yang punya anggota di tahun ini
    const divisiWithMembers = Divisi
      .filter((divisi: any) => divisi.detail && divisi.detail.length > 0) // ✅ Filter divisi kosong
      .map((divisi: any) => ({
        nama_divisi: divisi.nama_divisi,
        foto_divisi: divisi.galeri[0]?.foto_divisi ?? null,
        deskripsi: divisi.deskripsi ?? '',
        anggota: divisi.detail.map((detail: any) => ({
          nama_anggota: detail.anggota?.nama_anggota ?? '',
          foto_anggota: detail.foto_anggota ?? null,
          linkedin: detail.anggota?.linkedin ?? null,
          instagram: detail.anggota?.instagram ?? null,
          jabatan: detail.jabatan?.nama_jabatan ?? '',
        })),
      }));

    // Gunakan mapper
    const response = mapKepengurusan(
      { 
        tahun_kerja: kepengurusan.tahun_kerja, 
        nama_kepengurusan: kepengurusan.nama_kepengurusan 
      },
      divisiWithMembers, // ✅ Pass filtered divisi
      tahunList
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}