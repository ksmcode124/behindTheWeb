'use client';
import { useRef, useEffect, useState } from 'react';
import { useLoopScroll } from './useLoopScroll';

interface ScrollingBoxesProps {
  speed?: number;
  boxSize?: number; // px
  gap?: number; // px
}

export default function ScrollingBoxes({
  speed = 60,
  boxSize = 32,
  gap = 16,
}: ScrollingBoxesProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const calculate = () => {
      const screen = window.innerWidth;
      const fullBox = boxSize + gap;
      const minBoxes = 10;
      const needed = Math.ceil(screen / fullBox) + 4;
      setItems(Array(Math.max(minBoxes, needed)).fill(''));
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [boxSize, gap]);

  useLoopScroll(trackRef, speed);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={trackRef}
        className="loop-track flex w-max gap-4"
        style={{ animationDuration: 'var(--loop-duration)' }}
      >
        {items.map((_, i) => (
          <Box key={i} />
        ))}
        {items.map((_, i) => (
          <Box key={`dup-${i}`} />
        ))}
      </div>
    </div>
  );
}

function Box() {
  return (
    <div className="bg-secondary-400 h-8 w-8 rounded-sm md:h-10 md:w-10 lg:h-12 lg:w-12" />
  );
}
