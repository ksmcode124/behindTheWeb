"use client"
import { useState } from "react";
import { FlipCard } from "@/app/behind-the-web/components/FlipCard";
import Image from "next/image";

const FE_players = [
  // Dummy bisa diganti looping dari database
  {
    nama: "Cristiano Ronaldo",
    role: "Forward",
    image: "/assets/images/ronaldo.jpg",
    ig: "https://www.instagram.com/cristiano/",
    linkedIn: "https://www.linkedin.com/in/cristiano-ronaldo-123456789/",
  },
  {
    nama: "Lionel Messi",
    role: "Forward",
    image: "/assets/images/messi.jpeg",
    ig: "https://www.instagram.com/leomessi/",
    linkedIn: "https://www.linkedin.com/in/leomessi/",
  },
  {
    nama: "Neymar Jr",
    role: "Forward",
    image: "/assets/images/neymar.jpeg",
    ig: "https://www.instagram.com/neymarjr/",
    linkedIn: "https://www.linkedin.com/in/neymarjr/",
  },
  {
    nama: "Kylian Mbappe",
    role: "Forward",
    image: "/assets/images/mbappe.jpeg",
    ig: "https://www.instagram.com/k.mbappe/",
    linkedIn: "https://www.linkedin.com/in/kylian-mbappe/",
  },
  {
    nama: "Vinicius Jr",
    role: "Forward",
    image: "/assets/images/vini.jpeg",
    ig: "https://www.instagram.com/vinijr/",
    linkedIn: "https://www.linkedin.com/in/vinicius-jr-123456789/",
  }
];
console.log(FE_players);
// [
//   "/assets/images/ronaldo.jpg",
//   "/assets/images/ronaldo.svg",
//   "/assets/images/neymar.jpeg",
//   "/assets/images/messi.jpeg",
//   "/assets/images/mbappe.jpeg",
//   "/assets/images/vini.jpeg",
// ];

export default function Home() {
  const [startIndex, setStartIndex] = useState<number>(0); // index awal window
  const handlePrev = () => {
    setStartIndex((prev) => (prev + 1) % FE_players.length); // geser window ke kanan
    console.log("prev")
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev - 1 + FE_players.length) % FE_players.length); // geser window ke kiri
    console.log("next")
  };

  // Fungsi untuk mengambil 5 nama (looping)
  const getVisibleNames = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const index = (startIndex + i) % FE_players.length; // loop index
      return FE_players[index];
    });
  };

  let count: number = 0;
  const ButtonPosition = (size: 1 | 2 | 3) => {
    size === 2 ? count++ : "";
    return (count % 2 === 0 ? handlePrev : count % 2 === 1 ? handleNext : null);
  };

  return (
    <div className="font-sans flex flex-row items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-black">
      <button onClick={handlePrev} className="text-white w-[70px] h-[70px] rounded-full bg-[#393c45] p-auto justify-content-center justify-items-center"><Image src="/assets/images/Vector.svg" alt="Previous" width={17} height={28} /></button>
      {getVisibleNames().map((players, i) => {
        const size: 1 | 2 | 3 = i < 3
          ? (3 - i) as 1 | 2 | 3   // 0→3, 1→2, 2→1
          : (i - 1) as 1 | 2 | 3;  // 3→2, 4→3
        const isButton = size === 2;
        return isButton ?
          <button key={players.nama} onClick={ButtonPosition(size)}
            className="flex w-auto h-auto" >
            <FlipCard key={players.nama}
              size={size}
              imageSrc={players.image}
              nama={players.nama}
              role={players.role}
              ig={players.ig}
              linkedIn={players.linkedIn} />
          </button>
          : <FlipCard key={players.nama} 
              size={size} 
              imageSrc={players.image} 
              nama={players.nama} 
              role={players.role} 
              ig={players.ig} 
              linkedIn={players.linkedIn} />;
      })}
      <button onClick={handleNext} className="text-white w-[70px] h-[70px] rounded-full bg-[#393c45] p-auto justify-content-center justify-items-center"><Image src="/assets/images/Vector.svg" alt="Next" className="rotate-180" width={17} height={28} /></button>
    </div>
  );
}
