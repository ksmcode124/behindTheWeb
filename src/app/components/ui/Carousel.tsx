'use client';
import { useState, useEffect, useRef } from 'react';
import { FlipCard } from './FlipCard';
import Image from 'next/image';

const FE_players = [
  // Dummy bisa diganti looping dari database
  {
    nama: 'Cristiano Ronaldo',
    role: 'Forward',
    image: '/assets/images/logo_black.webp',
    ig: 'https://www.instagram.com/cristiano/',
    linkedIn: 'https://www.linkedin.com/in/cristiano-ronaldo-123456789/',
  },
  {
    nama: 'Lionel Messi',
    role: 'Forward',
    image: '/assets/images/logo_black.webp',
    ig: 'https://www.instagram.com/leomessi/',
    linkedIn: 'https://www.linkedin.com/in/leomessi/',
  },
  {
    nama: 'Neymar Jr',
    role: 'Forward',
    image: '/assets/images/logo_white.webp',
    ig: 'https://www.instagram.com/neymarjr/',
    linkedIn: 'https://www.linkedin.com/in/neymarjr/',
  },
  {
    nama: 'Kylian Mbappe',
    role: 'Forward',
    image: '/assets/images/logo_white.webp',
    ig: 'https://www.instagram.com/k.mbappe/',
    linkedIn: 'https://www.linkedin.com/in/kylian-mbappe/',
  },
  {
    nama: 'Vinicius Jr',
    role: 'Forward',
    image: '/assets/images/logo_white.webp',
    ig: 'https://www.instagram.com/vinijr/',
    linkedIn: 'https://www.linkedin.com/in/vinicius-jr-123456789/',
  },
];
// [
//   "/assets/images/ronaldo.jpg",
//   "/assets/images/ronaldo.svg",
//   "/assets/images/neymar.jpeg",
//   "/assets/images/messi.jpeg",
//   "/assets/images/mbappe.jpeg",
//   "/assets/images/vini.jpeg",
// ];

export default function Carousel() {
  const [batchSize, setBatchSize] = useState<number>(0); // ukuran window
  const [startIndex, setStartIndex] = useState<number>(0); // index awal window
  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? FE_players.length - 1 : prev - 1)); // geser window ke kanan
    console.log('prev');
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= FE_players.length ? 0 : prev + 1)); // geser window ke kiri
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
  const visiblePlayers = [];
  for (let i = 0; i < batchSize; i++) {
    const index = (startIndex + i) % FE_players.length; // loop jika habis
    visiblePlayers.push(FE_players[index]);
  }

  let count: number = 0;
  const ButtonPosition = (size: 1 | 2 | 3 | 4 | 5) => {
    size === 2 ? count++ : '';
    return count % 2 === 0 ? handlePrev : count % 2 === 1 ? handleNext : null;
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 border-2 border-amber-50 bg-black p-8 pb-20 font-sans sm:p-20 md:gap-3">
      {batchSize === 5 ? (
        <button
          onClick={handlePrev}
          className="p-auto justify-content-center h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45] text-white"
        >
          <Image
            src="/assets/images/Vector.svg"
            alt="Previous"
            width={17}
            height={28}
          />
        </button>
      ) : null}

      {visiblePlayers.map((players, i) => {
        console.log('tes', i);
        const size =
          batchSize === 3
            ? i % 2 === 1
              ? 4
              : 5
            : i < 3
              ? ((3 - i) as 1 | 2 | 3)
              : ((i - 1) as 1 | 2 | 3);
        const isButton = batchSize === 3 ? size === 5 : size === 2;
        return isButton ? (
          <button
            key={players.nama}
            onClick={ButtonPosition(size)}
            className="flex h-auto w-auto"
          >
            <FlipCard
              key={players.nama}
              size={size}
              imageSrc={players.image}
              nama={players.nama}
              role={players.role}
              ig={players.ig}
              linkedIn={players.linkedIn}
            />
          </button>
        ) : (
          <FlipCard
            key={players.nama}
            size={size}
            imageSrc={players.image}
            nama={players.nama}
            role={players.role}
            ig={players.ig}
            linkedIn={players.linkedIn}
          />
        );
      })}
      {batchSize === 5 ? (
        <button
          onClick={handleNext}
          className="p-auto justify-content-center h-[70px] w-[70px] justify-items-center rounded-full bg-[#393c45] text-white"
        >
          <Image
            src="/assets/images/Vector.svg"
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
