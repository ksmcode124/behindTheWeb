// src/app/api/btw/kepengurusan/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/kepengurusan/1 - Get one
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const data = await prisma.btw_kepengurusan.findUnique({
      where: { id_btw: parseInt(params.id) },
      include: {
        detail: {
          include: {
            anggota: true,
            divisi: true,
            jabatan: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Kepengurusan tidak ditemukan' },
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

// PUT /api/btw/kepengurusan/1 - Update
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    
    const data = await prisma.btw_kepengurusan.update({
      where: { id_btw: parseInt(params.id) },
      data: {
        tahun_kerja: body.tahun_kerja,
        nama_kepengurusan: body.nama_kepengurusan,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Kepengurusan berhasil diupdate',
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update kepengurusan' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/kepengurusan/1 - Delete
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    await prisma.btw_kepengurusan.delete({
      where: { id_btw: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Kepengurusan berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus kepengurusan' },
      { status: 500 }
    );
  }
}