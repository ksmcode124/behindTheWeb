'use client';

import { IMAGES } from '@/lib/constants';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function InfiniteCarousel({
  images,
  speed = 60, // px per second
}: {
  images: { src: string; alt?: string }[];
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let frame: number;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const width = track.scrollWidth / 2;

      pos.current -= speed * dt;

      if (Math.abs(pos.current) >= width) {
        pos.current += width;
      }

      track.style.transform = `translateX(${pos.current}px)`;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [images, speed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden whitespace-nowrap"
    >
      <div ref={trackRef} className="flex">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="flex flex-none items-center justify-center px-6"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ''}
              width={300}
              height={200}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollingBoxes({ speed = 60 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<string[]>([]);

  // --- Auto-generate number of boxes needed to fill screen ---
  useEffect(() => {
    const calculate = () => {
      const screen = window.innerWidth;

      // Base box width (matches Tailwind h-8 w-8)
      const boxSize = 32; // px
      const gap = 16; // gap-4 → 1rem = 16px
      const fullBox = boxSize + gap;

      const minBoxes = 10; // always at least 10
      const needed = Math.ceil(screen / fullBox) + 4; // small padding for density

      setItems(Array(Math.max(minBoxes, needed)).fill(''));
    };

    calculate();
    window.addEventListener('resize', calculate);

    return () => window.removeEventListener('resize', calculate);
  }, []);

  // --- Perfect loop speed sync ---
  useLoopScroll(trackRef, speed);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={trackRef}
        className="loop-track flex w-max gap-4"
        style={{ animationDuration: 'var(--loop-duration)' }}
      >
        {/* Original list */}
        {items.map((_, i) => (
          <Box key={i} />
        ))}

        {/* Duplicate once for perfect seamless loop */}
        {items.map((_, i) => (
          <Box key={`dup-${i}`} />
        ))}
      </div>
    </div>
  );
}

function Box() {
  return (
    <div className="bg-secondary-400 h-8 w-8 rounded-sm md:h-10 md:w-10 lg:h-12 lg:w-12"></div>
  );
}

// Reuse your loop helper
export function useLoopScroll(
  ref: React.RefObject<HTMLDivElement>,
  speed: number,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const calc = () => {
      const half = el.scrollWidth / 2;
      const duration = half / Math.max(1, speed);
      el.style.setProperty('--loop-duration', `${duration}s`);
      el.style.animationDuration = `var(--loop-duration)`;
      raf = 0;
    };

    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    });
    ro.observe(el);

    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    window.addEventListener('resize', onResize);

    raf = requestAnimationFrame(calc);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [ref, speed]);
}
