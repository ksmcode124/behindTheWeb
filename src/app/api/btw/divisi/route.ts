
// ============================================
// 3. DIVISI
// src/app/api/btw/divisi/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/divisi - List all
export async function GET() {
  try {
    const data = await prisma.btw_divisi.findMany({
      orderBy: { nama_divisi: 'asc' },
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

// POST /api/btw/divisi - Create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_divisi.create({
      data: {
        nama_divisi: body.nama_divisi,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Divisi berhasil dibuat', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat divisi' },
      { status: 500 }
    );
  }
}