import React from 'react'
import { FlipCard } from './FlipCard';
const players = [{
    nama: "Cristiano Ronaldo",
    role: "Forward",
    image: "/assets/images/ronaldo.jpg",
    ig: "https://www.instagram.com/cristiano/",
    linkedIn: "https://www.linkedin.com/in/cristiano-ronaldo-123456789/",
}, {
    nama: "Lionel Messi",
    role: "Forward",
    image: "/assets/images/messi.jpg",
    ig: "https://www.instagram.com/leomessi/",
    linkedIn: "https://www.linkedin.com/in/lionel-messi-123456789/",
}];
const size = 0;
export default function Inti() {
    return (
        <div className="flex justify-center items-center gap-15 md:gap-48 bg-amber-900">
            {players.map(player => (
                <div key={player.nama} className="justify-center items-center">
                    <FlipCard
                        size={size}
                        imageSrc={player.image}
                        nama={player.nama}
                        role={player.role}
                        ig={player.ig}
                        linkedIn={player.linkedIn}
                        className="justify-center items-center mx-auto"
                    />
                    <div className="py-6 justify-center items-center text-center">
                        <h3 className="text-base md:text-[27px] font-normal text-[#FFF9E6]">{player.nama}</h3>
                        <div className="h-0.5 bg-[#DEBB95] w-full mx-auto mt-1 mb-2"></div>
                        <p className="text-xs md:text-lg font-normal text-[#FFF9E6]">{player.role}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};