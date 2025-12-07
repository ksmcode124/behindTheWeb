// ============================================
// 1. PUBLIC DISPLAY API (SIMPLIFIED)
// src/app/api/display/btw/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tahunKerja = searchParams.get('tahun');

    // Get kepengurusan (latest atau by tahun)
    const kepengurusan = await prisma.btw_kepengurusan.findFirst({
      where: tahunKerja ? { tahun_kerja: tahunKerja } : undefined,
      orderBy: { tahun_kerja: 'desc' },
    });

    if (!kepengurusan) {
      return NextResponse.json(
        { success: false, message: 'Kepengurusan tidak ditemukan' },
        { status: 404 }
      );
    }

    // Get all divisi with details (NO FILTER - semua divisi ditampilkan)
    const divisi = await prisma.btw_divisi.findMany({
      orderBy: { nama_divisi: 'asc' },
      include: {
        detail: {
          where: {
            id_btw: kepengurusan.id_btw,
          },
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

    // Simple mapping - langsung return semua divisi
    return NextResponse.json({
      success: true,
      data: {
        tahun_kerja: kepengurusan.tahun_kerja,
        nama_kepengurusan: kepengurusan.nama_kepengurusan,
        divisi: divisi.map((d: any) => ({
          nama_divisi: d.nama_divisi,
          anggota: d.detail.map((detail: any) => ({
            nama_anggota: detail.anggota.nama_anggota,
            foto_anggota: detail.anggota.foto_anggota,
            linkedin: detail.anggota.linkedin,
            instagram: detail.anggota.instagram,
            jabatan: detail.jabatan.nama_jabatan,
          })),
        })),
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

