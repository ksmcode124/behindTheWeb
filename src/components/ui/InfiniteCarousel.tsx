'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { ActivityProps } from '@/lib/constants';

interface InfiniteCarouselProps {
  images: ActivityProps[];
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
        {images.map((image, i) => (
          <div
            key={i}
            className="flex flex-none items-center justify-center px-3 sm:px-5 lg:px-8"
          >
            <Image
              src={image.src}
              alt={image.alt ?? ''}
              width={400}
              height={300}
              className="aspect-3/2 h-[clamp(80px,12vw,160px)] object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
