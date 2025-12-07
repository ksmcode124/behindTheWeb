'use client';
import { useState, useEffect } from 'react';
import { FlipCard } from './FlipCard';
import Image from 'next/image';
import { Divisi } from '../data/btw';

export default function Carousel({ divisi }: { divisi: Divisi }) {
  const [batchSize, setBatchSize] = useState<number>(0); // ukuran window
  const [startIndex, setStartIndex] = useState<number>(0); // index awal window
  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - 1 < 0 ? divisi.anggota.length - 1 : prev - 1,
    ); // geser window ke kanan
    console.log('prev');
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= divisi.anggota.length ? 0 : prev + 1)); // geser window ke kiri
    console.log('next');
  };

  useEffect(() => {
    if (window.innerWidth < 640) {
      setBatchSize(3);
    } else {
      setBatchSize(5);
    }
  }, []);

  console.log(batchSize);

  // Fungsi untuk mengambil 5 nama (looping)
  const visibleMembers = [];
  for (let i = 0; i < batchSize; i++) {
    const index = (startIndex + i) % divisi.anggota.length; // loop jika habis
    visibleMembers.push(divisi.anggota[index]);
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
    <div className="flex h-screen items-center justify-center gap-3 p-8 pb-20 font-sans sm:p-20">
      {batchSize === 5 ? (
        <button
          onClick={handlePrev}
          className="p-auto justify-content-center h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45] text-white"
        >
          <Image
            src="/assets/images/icon/Vector.svg"
            alt="Previous"
            width={17}
            height={28}
          />
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
              imageSrc={anggota.foto_anggota}
              nama={anggota.nama_anggota}
              role={anggota.jabatan}
              ig={anggota.linkedin}
              linkedIn={anggota.linkedin}
            />
          </button>
        ) : (
          <FlipCard
            key={i}
            size={size}
            imageSrc={anggota.foto_anggota}
            nama={anggota.nama_anggota}
            role={anggota.jabatan}
            ig={anggota.linkedin}
            linkedIn={anggota.linkedin}
          />
        );
      })}
      {batchSize === 5 ? (
        <button
          onClick={handleNext}
          className="p-auto justify-content-center h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45] text-white"
        >
          <Image
            src="/assets/images/icon/Vector.svg"
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
