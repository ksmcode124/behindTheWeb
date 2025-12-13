'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Divisi } from '@/lib/btw/interfaces/btw';
import { IMAGES } from '@/lib/constants';

interface SingleDivisiCardProps {
  divisi: Divisi;
}

export default function SingleDivisiCard({ divisi }: SingleDivisiCardProps) {
  const { nama_divisi, foto_divisi } = divisi;

  return (
    <div className="flex w-full flex-col items-center">
      {/* TITLE */}
      <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
        {nama_divisi}
      </h3>

      {/* CARD */}
      <div className="border-secondary-300 relative w-full max-w-4xl overflow-hidden border-[1.25em]">
        <div className="absolute top-[37%] -right-30 z-1 rotate-90 lg:-right-40">
          <p
            className="text-secondary-400 text-5xl leading-none whitespace-nowrap lg:text-6xl"
            style={{ WebkitTextStroke: '2px var(--color-secondary-300)' }}
          >
            THE FIRST COMMIT
          </p>
        </div>

        <div className="relative h-[430px] w-full">
          <Image
            src={foto_divisi?.trim() ? foto_divisi : IMAGES.FALLBACK}
            alt={nama_divisi}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3">
          <p className="text-secondary-400 max-w-[70%] p-4 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
            sunt esse placeat iusto consequuntur quos animi, non expedita
            sapiente rem sint consectetur deserunt nostrum sequi saepe ipsam
            vitae obcaecati fugiat!
          </p>

          <Link
            href="/"
            className="border-secondary-300 hover:text-secondary-300 bg-primary-600 text-secondary-400 hover:bg-secondary-400 pointer-events-auto relative border-[0.4em] px-4 py-1 text-center text-2xl font-bold transition-colors duration-300"
          >
            SELENGKAPNYA
          </Link>
        </div>
      </div>
    </div>
  );
}
