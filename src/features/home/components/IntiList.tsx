import React from 'react';
import { FlipCard } from '@/components/common/FlipCard';
import { Divisi } from '@/lib/btw/interfaces/btw';

interface IntiProps {
  divisi?: Divisi;
}

const size = 0;
export default function IntiList({ divisi }: IntiProps) {
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
