// src/app/api/btw/anggota/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/anggota/1 - Get one
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const data = await prisma.btw_anggota.findUnique({
      where: { id_anggota: parseInt(params.id) },
      include: {
        detail: {
          include: {
            kepengurusan: true,
            divisi: true,
            jabatan: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Anggota tidak ditemukan' },
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

// PUT /api/btw/anggota/1 - Update
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    
    const data = await prisma.btw_anggota.update({
      where: { id_anggota: parseInt(params.id) },
      data: {
        nama_anggota: body.nama_anggota,
        foto_anggota: body.foto_anggota,
        linkedin: body.linkedin,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Anggota berhasil diupdate',
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update anggota' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/anggota/1 - Delete
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    await prisma.btw_anggota.delete({
      where: { id_anggota: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Anggota berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus anggota' },
      { status: 500 }
    );
  }
}