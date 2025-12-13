'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface InfiniteCarouselProps {
  images: { src: string; alt?: string }[];
  speed?: number; // px per second
}

export default function InfiniteCarousel({
  images,
  speed = 60,
}: InfiniteCarouselProps) {
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

      if (Math.abs(pos.current) >= width) pos.current += width;

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
