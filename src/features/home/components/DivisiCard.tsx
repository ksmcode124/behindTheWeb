'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Divisi } from '@/lib/btw/interfaces/btw';
import { IMAGES } from '@/lib/constants';
import Content from '../data/home-content.json';

interface SingleDivisiCardProps {
  divisi: Divisi;
  kepengurusan: string;
}

export default function DivisiCard({
  divisi,
  kepengurusan,
}: SingleDivisiCardProps) {
  const { nama_divisi, foto_divisi, deskripsi } = divisi;

  return (
    <div className="z-20 mt-5 flex w-full flex-col items-center lg:mt-20">
      {/* TITLE */}
      <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
        {nama_divisi}
      </h3>

      {/* CARD */}
      <div className="border-secondary-300 relative w-full max-w-4xl overflow-hidden border-[1.25em]">
        <div className="pointer-events-none absolute top-1/2 right-2 z-10 translate-x-[45%] -translate-y-[85%] rotate-90 sm:right-8 sm:translate-x-[50%] sm:-translate-y-[70%] lg:right-12 lg:translate-x-[55%] lg:-translate-y-[60%]">
          <p
            className="text-secondary-400 text-sm leading-none whitespace-nowrap sm:text-xl md:text-2xl lg:text-5xl"
            style={{
              WebkitTextStroke: '1px var(--color-secondary-300)',
            }}
          >
            {kepengurusan}
          </p>
        </div>

        <div className="relative aspect-video w-full">
          <Image
            src={foto_divisi?.trim() ? foto_divisi : IMAGES.FALLBACK}
            alt={nama_divisi}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3">
          <p className="text-secondary-400 line-clamp-1 max-w-[70%] px-5 pb-5 text-sm">
            {deskripsi}
          </p>

          <Link
            href="/the-team"
            className="border-secondary-300 hover:text-secondary-300 bg-primary-600 text-secondary-400 hover:bg-secondary-400 pointer-events-auto relative border-[0.4em] px-4 py-1 text-center text-2xl font-bold transition-colors duration-300"
          >
            {Content.division.cta.divisionCard}
          </Link>
        </div>
      </div>
    </div>
  );
}
