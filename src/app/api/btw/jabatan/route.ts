// ============================================
// 4. JABATAN
// src/app/api/btw/jabatan/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/btw/jabatan - List all
export async function GET() {
  try {
    const data = await prisma.btw_jabatan.findMany({
      orderBy: { nama_jabatan: 'asc' },
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

// POST /api/btw/jabatan - Create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = await prisma.btw_jabatan.create({
      data: {
        nama_jabatan: body.nama_jabatan,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Jabatan berhasil dibuat', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat jabatan' },
      { status: 500 }
    );
  }
}