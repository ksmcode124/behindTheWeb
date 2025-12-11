import React from 'react';
import { FlipCard } from './FlipCard';
import { Divisi } from '@/lib/btw/interfaces/btw';

interface IntiProps {
  divisi: Divisi;
}

const size = 0;
export default function Inti({ divisi }: IntiProps) {
  return (
    <div className="flex items-center justify-center gap-15 md:gap-48">
      {divisi?.anggota.map((anggota) => (
        <div key={anggota.nama_anggota} className="items-center justify-center">
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
            <h3 className="text-xl font-normal text-[#FFF9E6]">
              {anggota.nama_anggota}
            </h3>
            <div className="mx-auto mt-1 mb-2 h-0.5 w-full bg-[#DEBB95]"></div>
            <p className="text-base font-normal text-[#FFF9E6]">
              {anggota.jabatan}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
