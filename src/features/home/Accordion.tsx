'use client';
import GoalCard from '@/features/home/GoalCard';
import { KSM_MISI, KSM_VISI } from '@/lib/constants';
import { useState, useEffect, useRef, useMemo } from 'react';

export default function AccordionParent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);

  const cardRefs = useMemo(() => [cardRef1, cardRef2], []);

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
  }, [cardRefs, openIndex]);

  return (
    <div className="relative z-50 flex w-auto flex-col items-center justify-center gap-4 overflow-hidden md:flex-row">
      <div ref={cardRefs[0]}>
        <GoalCard
          title="visi"
          content={KSM_VISI}
          expanded={openIndex === 0}
          onToggle={() => handleToggle(0)}
        />
      </div>

      <div ref={cardRefs[1]}>
        <GoalCard
          title="misi"
          content={KSM_MISI}
          expanded={openIndex === 1}
          onToggle={() => handleToggle(1)}
        />
      </div>
    </div>
  );
}
