'use client';
import { useState, useEffect } from 'react';
import { FlipCard } from './FlipCard';
import Image from 'next/image';
import { Anggota } from '@/lib/btw/interfaces/btw';

export default function Carousel({ anggotaProp }: { anggotaProp: Anggota[] }) {
  const [batchSize, setBatchSize] = useState<number>(0); // ukuran window
  const [startIndex, setStartIndex] = useState<number>(0); // index awal window
  const anggota = anggotaProp ?? [];
  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? anggota.length - 1 : prev - 1)); // geser window ke kanan
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= anggota.length ? 0 : prev + 1)); // geser window ke kiri
  };

  useEffect(() => {
    if (window.innerWidth < 640) {
      setBatchSize(3);
    } else {
      setBatchSize(5);
    }
  }, []);

  // Fungsi untuk mengambil 5 nama (looping)
  const visibleMembers = [];
  for (let i = 0; i < batchSize; i++) {
    const index = (startIndex + i) % anggota.length; // loop jika habis
    visibleMembers.push(anggota[index]);
  }

  let count: number = 0;
  const ButtonPosition = (
    size: 1 | 2 | 3 | 4 | 5,
  ): React.MouseEventHandler<HTMLButtonElement> | undefined => {
    if (size === 2) count++;
    if (count % 2 === 0) return () => handlePrev();
    if (count % 2 === 1) return () => handleNext();
    return undefined;
  };

  return (
    <div className="z-2 flex items-center justify-center gap-3 p-8 pb-20 font-sans sm:p-20">
      {batchSize === 5 ? (
        <button
          onClick={handlePrev}
          className="p-auto justify-content-center text-secondary-400 h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45]"
        >
          <Image src="/icon/Vector.svg" alt="Previous" width={17} height={28} />
        </button>
      ) : null}

      {visibleMembers.map((anggota, i) => {
        const size =
          batchSize === 3
            ? i % 2 === 1
              ? 1
              : 2
            : i < 3
              ? ((3 - i) as 1 | 2 | 3)
              : ((i - 1) as 1 | 2 | 3);
        const isButton = size === 2;
        return isButton ? (
          <button
            key={i}
            onClick={ButtonPosition(size)}
            className="flex h-auto w-auto"
          >
            <FlipCard
              size={size}
              imageSrc={
                anggota?.foto_anggota && anggota.foto_anggota.trim() !== null
                  ? anggota.foto_anggota
                  : '/images/origin_first_commit.webp'
              }
              nama={anggota?.nama_anggota}
              role={anggota?.jabatan}
              ig={anggota?.linkedin}
              linkedIn={anggota?.linkedin}
            />
          </button>
        ) : (
          <FlipCard
            key={i}
            size={size}
            imageSrc={
              anggota?.foto_anggota && anggota.foto_anggota.trim() !== null
                ? anggota.foto_anggota
                : '/images/origin_first_commit.webp'
            }
            nama={anggota?.nama_anggota}
            role={anggota?.jabatan}
            ig={anggota?.linkedin}
            linkedIn={anggota?.linkedin}
          />
        );
      })}
      {batchSize === 5 ? (
        <button
          onClick={handleNext}
          className="p-auto justify-content-center text-secondary-400 h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45]"
        >
          <Image
            src="/icon/Vector.svg"
            alt="Next"
            className="rotate-180"
            width={17}
            height={28}
          />
        </button>
      ) : null}
    </div>
  );
}
