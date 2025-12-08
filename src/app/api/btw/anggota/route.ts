// ============================================
// 2. ANGGOTA
// src/app/api/btw/anggota/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/anggota - List all
export async function GET() {
  try {
    const data = await prisma.btw_anggota.findMany({
      orderBy: { nama_anggota: 'asc' },
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

// POST /api/btw/anggota - Create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_anggota.create({
      data: {
        nama_anggota: body.nama_anggota,
        foto_anggota: body.foto_anggota,
        linkedin: body.linkedin,
        instagram: body.instagram,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Anggota berhasil dibuat', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat anggota' },
      { status: 500 }
    );
  }
}
