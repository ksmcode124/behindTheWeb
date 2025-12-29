// src/app/api/btw/divisi-galeri/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/divisi-galeri?id_btw=3&id_divisi=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idBtw = searchParams.get('id_btw');
    const idDivisi = searchParams.get('id_divisi');

    const where: any = {};
    if (idBtw) where.id_btw = parseInt(idBtw);
    if (idDivisi) where.id_divisi = parseInt(idDivisi);

    const data = await prisma.divisi_galeri.findMany({
  where,
   select: {
    id_fotoDiv: true,
    foto_divisi: true,
    divisi: {
      select: {
        id_divisi: true,
        nama_divisi: true,
      },
    },
    kepengurusan: {
      select: {
        id_btw: true,
        tahun_kerja: true,
        nama_kepengurusan: true,
      },
    },
  },
  orderBy: [
    { kepengurusan: { tahun_kerja: 'desc' } },
    { divisi: { nama_divisi: 'asc' } },
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

// POST /api/btw/divisi-galeri - Create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_divisi, id_btw, foto_divisi } = body;

    // Validasi
    if (!id_divisi || !id_btw || !foto_divisi) {
      return NextResponse.json(
        { success: false, message: 'Field wajib: id_divisi, id_btw, foto_divisi' },
        { status: 400 }
      );
    }

    // Cek apakah sudah ada foto untuk divisi & periode ini
    const existing = await prisma.divisi_galeri.findFirst({
      where: {
        id_divisi: parseInt(id_divisi),
        id_btw: parseInt(id_btw),
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Foto divisi untuk periode ini sudah ada. Gunakan PUT untuk update.' },
        { status: 400 }
      );
    }

    // Create
    const data = await prisma.divisi_galeri.create({
    data: {
    id_divisi: parseInt(id_divisi),
    id_btw: parseInt(id_btw),
    foto_divisi,
  },
  select: {
    id_fotoDiv: true,
    foto_divisi: true,
    divisi: {
      select: {
        id_divisi: true,
        nama_divisi: true,
      },
    },
    kepengurusan: {
      select: {
        id_btw: true,
        tahun_kerja: true,
        nama_kepengurusan: true,
      },
    },
  },
});

    return NextResponse.json(
      { success: true, message: 'Foto divisi berhasil ditambahkan', data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Foto divisi untuk periode ini sudah ada' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan foto divisi' },
      { status: 500 }
    );
  }
}