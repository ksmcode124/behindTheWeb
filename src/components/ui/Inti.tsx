import React from 'react';
import { FlipCard } from './FlipCard';
const players = [
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
    image: '/assets/images/logo_white.webp',
    ig: 'https://www.instagram.com/leomessi/',
    linkedIn: 'https://www.linkedin.com/in/lionel-messi-123456789/',
  },
];
const size = 0;
export default function Inti() {
  return (
    <div className="flex items-center justify-center gap-15 md:gap-48">
      {players.map((player) => (
        <div key={player.nama} className="items-center justify-center">
          <FlipCard
            size={size}
            imageSrc={player.image}
            nama={player.nama}
            role={player.role}
            ig={player.ig}
            linkedIn={player.linkedIn}
            className="mx-auto items-center justify-center"
          />
          <div className="items-center justify-center py-6 text-center">
            <h3 className="text-base font-normal text-[#FFF9E6]">
              {player.nama}
            </h3>
            <div className="mx-auto mt-1 mb-2 h-0.5 w-full bg-[#DEBB95]"></div>
            <p className="text-xs font-normal text-[#FFF9E6]">{player.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
