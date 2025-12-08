'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface CarouselProps {
  images: { src: string; alt?: string }[];
  speed?: number; // px per second
  direction?: 'left' | 'right';
}

export default function InfiniteCarousel({
  images,
  speed = 40,
  direction = 'left',
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;

    track.style.setProperty('--duration', `${duration}s`);
    track.style.setProperty(
      '--direction',
      direction === 'left' ? 'forwards' : 'reverse',
    );
  }, [images, speed, direction]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={trackRef}
        className="animate-carousel flex whitespace-nowrap"
        style={{
          animationDuration: 'var(--duration)',
          animationDirection: 'var(--direction)',
        }}
      >
        {/* Repeat twice for seamless looping */}
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="flex flex-none items-center justify-center px-6"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ''}
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
