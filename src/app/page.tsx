"use client";
import Card from "@/app/behind-the-web/components/hasbi";
import Image from "next/image";
import { useState } from 'react';

export default function AccordionParent() {
  // Simpan indeks card yang sedang terbuka
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // Jika yang diklik sudah terbuka → tutup
    // Jika belum terbuka → buka yang ini, tutup lainnya
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      className="flex bg-cover gap-4 bg-center justify-center items-center w-[705px] overflow-hidden" 
      style={{ backgroundImage: "url('/assets/images/photo.svg')"
       }}
    >
    <Card title="visi" 
        content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
        expanded={openIndex === 0} 
        onToggle={() => handleToggle(0)}>
    </Card>
      <Card title="misi" 
        content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
        expanded={openIndex === 1} 
        onToggle={() => handleToggle(1)}>
   </Card>
    </div>
  );
}