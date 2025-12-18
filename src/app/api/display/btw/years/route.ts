// src/app/api/display/btw/years/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const years = await prisma.btw_kepengurusan.findMany({
      select: { tahun_kerja: true },
      orderBy: { tahun_kerja: 'asc' }
    });

    return NextResponse.json({
      success: true,
      years: years.map(y => y.tahun_kerja)
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Gagal mengambil daftar tahun'
    }, { status: 500 });
  }
}
