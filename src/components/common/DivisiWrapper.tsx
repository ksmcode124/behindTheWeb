'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TEXTURES } from '@/lib/constants';

interface WrapperProps {
  children?: React.ReactNode;
  className?: string;
}

function DecorationColumn({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  return (
    <div
      className={`absolute top-0 ${
        isLeft ? 'left-0' : 'right-0'
      } flex h-full flex-col ${
        isLeft ? 'justify-around' : 'items-end justify-around'
      } opacity-70`}
    >
      {[1, 2].map((i) => (
        <div
          key={i}
          className={`flex flex-col ${
            isLeft ? 'items-start' : 'items-end'
          } gap-[30vh]`}
        >
          <Image
            src={
              isLeft ? '/images/logo_white.webp' : '/images/white_accent.webp'
            }
            width={360}
            height={360}
            alt=""
            className="w-[180px] rotate-60 select-none xl:w-[250px]"
            priority={false}
          />
          <Image
            src={
              isLeft ? '/images/white_accent.webp' : '/images/logo_white.webp'
            }
            width={360}
            height={200}
            alt=""
            className={`w-[180px] select-none xl:w-[250px] ${
              isLeft ? 'scale-x-[-1]' : ''
            }`}
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}

/* =========================
   TEXTURE BACKGROUND LAYER
   (async, lowest layer)
========================= */
function TextureLayer({
  texture,
  opacity = 0.25,
}: {
  texture: string;
  opacity?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = texture;
    img.onload = () => setReady(true);
  }, [texture]);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center mix-blend-multiply transition-opacity duration-300"
      style={{
        backgroundImage: `url(${texture})`,
        opacity,
      }}
    />
  );
}

export default function DivisiWrapper({
  children,
  className = '',
}: WrapperProps) {
  return (
    <section className="relative isolate">
      {/* TEXTURE — LOWEST */}
      <TextureLayer texture={TEXTURES.TEXTURE6} />

      {/* CONTENT — TOP PRIORITY */}
      <div
        className={`relative z-20 flex flex-col items-center rounded-t-[5em] bg-[linear-gradient(to_right,#FFF9E6_0%,#DEBB95_30%,#DEBB95_80%,#FFF9E6_100%)] px-6 py-20 md:px-10 md:py-30 ${className}`}
      >
        {/* DECORATION — BELOW CONTENT */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block">
          <DecorationColumn side="left" />
          <DecorationColumn side="right" />
        </div>
        {/* top border */}
        <div className="border-secondary-400 absolute -top-6 left-0 z-10 h-10 w-full rounded-t-[15em] border-x border-t-2" />

        {/* ACTUAL CONTENT */}
        <div className="relative z-20 w-full">{children}</div>
      </div>
    </section>
  );
}
