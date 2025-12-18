// ============================================
// 5. DETAIL ANGGOTA (Junction Table)
// src/app/api/btw/detail/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/detail?id_btw=1 - List all (optional filter by kepengurusan)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idBtw = searchParams.get('id_btw');
    
    const where: any = {};
    if (idBtw) {
      where.id_btw = parseInt(idBtw);
    }

    const data = await prisma.detail_anggota.findMany({
      where,
      include: {
        anggota: true,
        divisi: true,
        kepengurusan: true,
        jabatan: true,
      },
      orderBy: [
        { divisi: { nama_divisi: 'asc' } },
        { anggota: { nama_anggota: 'asc' } },
      ],
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

// POST /api/btw/detail - Create (assign anggota ke divisi & kepengurusan)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Support both camelCase from frontend (anggota_id) and snake_case (id_anggota)
    const anggotaId = body.anggota_id ?? body.id_anggota;
    const divisiId = body.divisi_id ?? body.id_divisi;
    const btwId = body.kepengurusan_id ?? body.id_btw;
    const jabatanId = body.jabatan_id ?? body.id_jabatan;

    if (!anggotaId || !divisiId || !btwId || !jabatanId) {
      return NextResponse.json(
        { success: false, message: 'Field wajib hilang (anggota, divisi, kepengurusan, jabatan).' },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.detail_anggota.findFirst({
      where: {
        id_anggota: anggotaId,
        id_divisi: divisiId,
        id_btw: btwId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Anggota sudah terdaftar di divisi & kepengurusan ini' },
        { status: 400 }
      );
    }

    const data = await prisma.detail_anggota.create({
      data: {
        id_anggota: anggotaId,
        id_divisi: divisiId,
        id_btw: btwId,
        id_jabatan: jabatanId,
      },
      include: {
        anggota: true,
        divisi: true,
        kepengurusan: true,
        jabatan: true,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Detail anggota berhasil dibuat', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat detail anggota' },
      { status: 500 }
    );
  }
}
