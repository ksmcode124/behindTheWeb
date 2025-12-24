import React from 'react';
import { FlipCard } from '@/components/common/FlipCard';
import { Divisi } from '@/lib/btw/interfaces/btw';
import { Skeleton } from '@/components/ui/Skeleton';

interface IntiProps {
  divisi?: Divisi;
}

const size = 0;
export default function DivisiIntiList({ divisi }: IntiProps) {
  return (
    <div className="flex items-center justify-center gap-15 md:gap-48">
      {divisi?.anggota.map((anggota, index) => (
        <div key={index} className="items-center justify-center">
          <FlipCard
            size={size}
            imageSrc={anggota.foto_anggota}
            nama={anggota.nama_anggota}
            role={anggota.jabatan}
            ig={anggota.instagram}
            linkedIn={anggota.linkedin}
            className="mx-auto items-center justify-center"
          />
          <div className="items-center justify-center py-6 text-center">
            <h3 className="text-secondary-400 text-xl font-normal">
              {anggota.nama_anggota}
            </h3>
            <div className="mx-auto mt-1 mb-2 h-0.5 w-full bg-[#DEBB95]"></div>
            <p className="text-secondary-400 text-base font-normal">
              {anggota.jabatan}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DivisiIntiListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex items-center justify-center gap-15 md:gap-48">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          {/* FlipCard */}
          <Skeleton className="h-48 w-48 rounded-xl" />

          {/* Text */}
          <div className="flex w-full flex-col items-center justify-center py-6 text-center">
            <Skeleton className="h-5 w-32" />

            {/* Divider */}
            <Skeleton className="mt-2 mb-2 h-0.5 w-full" />

            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
