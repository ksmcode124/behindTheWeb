"use client"
import { useState } from "react";
import { FlipCard } from "@/app/behind-the-web/components/FlipCard";

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
  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, players.length - 5)); // geser window ke kanan
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0)); // geser window ke kiri
  };

  return (
    <div className="font-sans flex flex-row items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-black">
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>
    
        {players.slice(startIndex, startIndex + 5).map((player, index) => {
          const size: 1 | 2 | 3 = index < 3
            ? (3 - index) as 1 | 2 | 3   // 0→3, 1→2, 2→1
            : (index - 1) as 1 | 2 | 3;  // 3→2, 4→3
          return (
           <FlipCard size={size} imageSrc={player} />
          );
        })}


      <button
        onClick={handleNext}
        disabled={startIndex >= players.length - 5}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>


    </div>
  );
}
