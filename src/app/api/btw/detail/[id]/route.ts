// src/app/api/btw/detail/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/detail/1 - Get one
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const data = await prisma.detail_anggota.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        anggota: true,
        divisi: true,
        kepengurusan: true,
        jabatan: true,
      },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Detail tidak ditemukan' },
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

// PUT /api/btw/detail/1 - Update (ganti divisi atau jabatan)
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    
    const data = await prisma.detail_anggota.update({
      where: { id: parseInt(params.id) },
      data: {
        id_divisi: body.id_divisi,
        id_jabatan: body.id_jabatan,
      },
      include: {
        anggota: true,
        divisi: true,
        kepengurusan: true,
        jabatan: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Detail anggota berhasil diupdate',
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update detail anggota' },
      { status: 500 }
    );
  }
}

// DELETE /api/btw/detail/1 - Delete (remove anggota dari divisi & kepengurusan)
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    await prisma.detail_anggota.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Detail anggota berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus detail anggota' },
      { status: 500 }
    );
  }
}