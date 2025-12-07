// ============================================
// src/app/api/btw/divisi/[id]/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/divisi/1 - Get one
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.btw_divisi.findUnique({
      where: { id_divisi: parseInt(params.id) },
      include: {
        detail: {
          include: {
            anggota: true,
            kepengurusan: true,
            jabatan: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Divisi tidak ditemukan' },
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

// PUT /api/btw/divisi/1 - Update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_divisi.update({
      where: { id_divisi: parseInt(params.id) },
      data: {
        nama_divisi: body.nama_divisi,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Divisi berhasil diupdate',
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update divisi' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/divisi/1 - Delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.btw_divisi.delete({
      where: { id_divisi: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Divisi berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus divisi' },
      { status: 500 }
    );
  }
}
