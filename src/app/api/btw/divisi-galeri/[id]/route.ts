// src/app/api/btw/divisi-galeri/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/divisi-galeri/1 - Get one
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
   const data = await prisma.divisi_galeri.findUnique({
  where: { id_fotoDiv: parseInt(params.id) },
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

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Foto divisi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

// PUT /api/btw/divisi-galeri/1 - Update
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { foto_divisi } = body;

    if (!foto_divisi) {
      return NextResponse.json(
        { success: false, message: 'Field foto_divisi wajib diisi' },
        { status: 400 }
      );
    }

    const data = await prisma.divisi_galeri.update({
      where: { id_fotoDiv: parseInt(params.id) },
      data: {
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
    return NextResponse.json({
      success: true,
      message: 'Foto divisi berhasil diupdate',
      data,
    });
  } catch (error: any) {
    console.error('Error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Foto divisi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Gagal update foto divisi' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/divisi-galeri/1 - Delete
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    
    await prisma.divisi_galeri.delete({
      where: { id_fotoDiv: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Foto divisi berhasil dihapus',
    });
  } catch (error: any) {
    console.error('Error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Foto divisi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Gagal menghapus foto divisi' },
      { status: 500 }
    );
  }
}