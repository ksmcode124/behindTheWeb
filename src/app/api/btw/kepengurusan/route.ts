// ============================================
// 1. KEPENGURUSAN
// src/app/api/btw/kepengurusan/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/kepengurusan - List all
export async function GET() {
  try {
    const data = await prisma.btw_kepengurusan.findMany({
      orderBy: { tahun_kerja: 'desc' },
      include: {
        _count: {
          select: { detail: true },
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

// POST /api/btw/kepengurusan - Create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_kepengurusan.create({
      data: {
        tahun_kerja: body.tahun_kerja,
        nama_pengurus: body.nama_pengurus,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Kepengurusan berhasil dibuat', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat kepengurusan' },
      { status: 500 }
    );
  }
}