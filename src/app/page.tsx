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
    console.log("next")
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0)); // geser window ke kiri
    console.log("prev")
  };

  let count: number = 0;
  const ButtonPosition = () => {
    count++;
    return (count % 2 === 0 ? handlePrev : count % 2 === 1 ? handleNext : "");
  };
  
  return (
    <div className="font-sans flex flex-row items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-black">


      {players.slice(startIndex, startIndex + 5).map((player, index) => {
        const size: 1 | 2 | 3 = index < 3
          ? (3 - index) as 1 | 2 | 3   // 0→3, 1→2, 2→1
          : (index - 1) as 1 | 2 | 3;  // 3→2, 4→3
        size === 2 ? ButtonPosition() : "";
        return (ButtonPosition() ? <button
          key={player}
          onClick={ButtonPosition()}
          className="flex w-auto h-auto"
        >
          <FlipCard size={size} imageSrc={player} />
        </button> :

           <FlipCard size={size} imageSrc={player} />
          );
      })}


    </div>
  );
}
