'use client';
import { useRef, useEffect, useState } from 'react';
import { useLoopScroll } from './useLoopScroll';

interface ScrollingBoxesProps {
  speed?: number;
  boxSize?: number; // px
  gap?: number; // px
}

export default function ScrollingBoxes({ speed = 60 }: ScrollingBoxesProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const root = document.documentElement;
      const box = parseFloat(
        getComputedStyle(root).getPropertyValue('--box-size'),
      );
      const gap = parseFloat(
        getComputedStyle(root).getPropertyValue('--box-gap'),
      );

      const full = box + gap;
      const needed = Math.ceil(window.innerWidth / full) + 4;
      setItems(Math.max(10, needed));
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  useLoopScroll(trackRef, speed);

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-4">
      <div
        ref={trackRef}
        className="loop-track flex w-max gap-[var(--box-gap)]"
      >
        {Array.from({ length: items * 2 }).map((_, i) => (
          <Box key={i} />
        ))}
      </div>
    </div>
  );
}

function Box() {
  return (
    <div className="bg-secondary-400 h-[var(--box-size)] w-[var(--box-size)] rounded-sm" />
  );
}
