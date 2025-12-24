'use client';
import { useRef, useEffect, useState } from 'react';
import { useLoopScroll } from './useLoopScroll';
import { Skeleton } from './Skeleton';

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
    <div className="relative w-full overflow-hidden py-2 sm:py-3">
      <div ref={trackRef} className="loop-track flex w-max gap-(--box-gap)">
        {Array.from({ length: items * 2 }).map((_, i) => (
          <Box key={i} />
        ))}
      </div>
    </div>
  );
}

function Box() {
  return (
    <div className="bg-secondary-400 h-(--box-size) w-(--box-size) rounded-sm" />
  );
}

export function ScrollingBoxesSkeleton() {
  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-3">
      <div className="loop-track flex w-max gap-(--box-gap)">
        {Array.from({ length: 38 }).map((_: any, i: number) => (
          <div key={i} className="h-(--box-size) w-(--box-size) rounded-sm">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
