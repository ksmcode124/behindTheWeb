"use client"
import { useState } from "react";
import { FlipCard } from "@/app/behind-the-web/components/FlipCard";
import Image from "next/image";

const players = [
  "/assets/images/ronaldo.jpg",
  "/assets/images/ronaldo.svg",
  "/assets/images/neymar.jpeg",
  "/assets/images/messi.jpeg",
  "/assets/images/mbappe.jpeg",
  "/assets/images/vini.jpeg",
];

export default function Home() {
  const [startIndex, setStartIndex] = useState<number>(0); // index awal window
  const handlePrev = () => {
     setStartIndex((prev) => (prev + 1) % players.length); // geser window ke kanan
    console.log("next")
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev - 1 + players.length) % players.length); // geser window ke kiri
    console.log("prev")
  };

   // Fungsi untuk mengambil 5 nama (looping)
  const getVisibleNames = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const index = (startIndex + i) % players.length; // loop index
      return players[index];
    });
  };
  
  return (
    <div className="font-sans flex flex-row items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-black">
      <button onClick={handlePrev} className="text-white w-[70px] h-[70px] rounded-full bg-[#393c45] p-auto justify-content-center justify-items-center"><Image src="/assets/images/Vector.svg" alt="Previous" width={17} height={28}/></button>
      {getVisibleNames().map((player, i)  => {
        const size: 1 | 2 | 3 = i < 3
          ? (3 - i) as 1 | 2 | 3   // 0→3, 1→2, 2→1
          : (i - 1) as 1 | 2 | 3;  // 3→2, 4→3
        return <FlipCard key={player} size={size} imageSrc={player} />
      })}
      <button onClick={handleNext} className="text-white w-[70px] h-[70px] rounded-full bg-[#393c45] p-auto justify-content-center justify-items-center"><Image src="/assets/images/Vector.svg" alt="Next" className="rotate-180" width={17} height={28}/></button>
    </div>
  
  );
}
