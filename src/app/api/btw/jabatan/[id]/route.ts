// ============================================
// src/app/api/btw/jabatan/[id]/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/jabatan/1 - Get one
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.btw_jabatan.findUnique({
      where: { id_jabatan: parseInt(params.id) },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Jabatan tidak ditemukan' },
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

// PUT /api/btw/jabatan/1 - Update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_jabatan.update({
      where: { id_jabatan: parseInt(params.id) },
      data: {
        nama_jabatan: body.nama_jabatan,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Jabatan berhasil diupdate',
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update jabatan' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/jabatan/1 - Delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.btw_jabatan.delete({
      where: { id_jabatan: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Jabatan berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus jabatan' },
      { status: 500 }
    );
  }
}
