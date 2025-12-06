<<<<<<< HEAD
"use client"
import { FlipCard } from "@/app/behind-the-web/components/FlipCard";
import Image from "next/image";
import Card from "@/app/behind-the-web/components/hasbi";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useState, useEffect, useRef } from "react";

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
export function AccordionParent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mask, setMask] = useState<string>("none");

  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // ambil posisi & ukuran card yang terlihat
    const visibleCards: { left: number; width: number }[] = [];
    const visibleCardsHeight: { top: number; height: number }[] = [];
    cardRefs.forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // relatif terhadap parent
      const parentRect = el.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      visibleCards.push({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
      visibleCardsHeight.push({
        top: rect.top - parentRect.top,
        height: rect.height,
      });
    });

    if (visibleCards.length === 0 && visibleCardsHeight.length === 0) {
      setMask("none");
      return;
    }

    // bangun mask gradient dari area setiap card
    const segments: string[] = [];
    let prevEnd = 0;

    visibleCards.forEach(({ left, width }, i) => {
      const start = left;
      const end = left + width;

      // area sebelum card → transparan
      if (start > prevEnd) {
        segments.push(`transparent ${prevEnd}px, transparent ${start}px`);
      }
      // area card → putih (terlihat)
      segments.push(`white ${start}px, white ${end}px`);
      prevEnd = end;
    });

    // area setelah card terakhir → transparan
    segments.push(`transparent ${prevEnd}px, transparent 100%`);

    setMask(`linear-gradient(to right, ${segments.join(", ")})`);
  }, [openIndex]);




  return (
    <div
      className="flex gap-4 bg-cover justify-center items-center"
    >
      <div ref={cardRefs[0]}>
        <Card
          title="visi"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          expanded={openIndex === 0}
          onToggle={() => handleToggle(0)}
        />
      </div>

      <div ref={cardRefs[1]}>
        <Card
          title="misi"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          expanded={openIndex === 1}
          onToggle={() => handleToggle(1)}
        />
      </div>
      </div>);
}

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
