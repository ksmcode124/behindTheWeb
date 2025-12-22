import React from 'react';
import Image from 'next/image';
import TexturedSection from '../ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';

interface WrapperProps {
  children?: React.ReactNode;
  className?: string;
}

// Helper for the decorative column
function DecorationColumn({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} flex h-full flex-col ${
        isLeft ? 'justify-around' : 'items-end justify-around'
      } opacity-70`}
    >
      {[1, 2].map((i) => (
        <div
          key={i}
          className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'} gap-[30vh]`}
        >
          <Image
            width={360}
            height={360}
            alt="code124"
            src={
              isLeft ? '/images/logo_white.webp' : '/images/white_accent.webp'
            }
            className="w-[180px] rotate-60 select-none xl:w-[250px]"
          />
          <Image
            width={360}
            height={200}
            alt="code124"
            src={
              isLeft ? '/images/white_accent.webp' : '/images/logo_white.webp'
            }
            className={`w-[180px] select-none xl:w-[250px] ${isLeft ? 'scale-x-[-1]' : ''}`}
          />
        </div>
      ))}
    </div>
  );
}

export default function DivisiWrapper({
  children,
  className = '',
}: WrapperProps) {
  return (
    <TexturedSection texture={TEXTURES.TEXTURE6}>
      <div
        className={`relative flex flex-col items-center rounded-t-[5em] bg-[linear-gradient(to_right,#FFF9E6_0%,#DEBB95_30%,#DEBB95_80%,#FFF9E6_100%)] px-6 py-20 md:px-10 md:py-30 ${className}`}
      >
        {/* top border */}
        <div className="border-secondary-400 absolute -top-6 left-0 h-10 w-full rounded-t-[15em] border-x border-t-2" />

        {/* DECORATION WRAPPER — prevents overflow */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block">
          <DecorationColumn side="left" />
          <DecorationColumn side="right" />
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </TexturedSection>
  );
}
