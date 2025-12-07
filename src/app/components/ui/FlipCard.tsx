'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SocialMediaLink } from './SocialMediaLink';

export function FlipCard({
  imageSrc,
  nama,
  role,
  ig,
  linkedIn,
  className,
  flip = true,
  frontBg = 'bg-white',
  backBg = 'bg-white',
  borderColor = 'border-secondary-300',
  ...props
}: {
  imageSrc?: string;
  nama?: string;
  role?: string;
  ig?: string;
  linkedIn?: string;
  className?: string;
  flip?: boolean;

  /** NEW: THEMING */
  frontBg?: string;
  backBg?: string;
  borderColor?: string;
}) {
  const [hover, setHover] = useState(false);
  const hasInfo = nama || role;

  return (
    <div
      className={cn(
        'relative aspect-[2/3] w-full max-w-[320px] shrink-0',
        'rounded-[clamp(10px,2vw,24px)] [perspective:1000px]',
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500',
          'rounded-[clamp(10px,2vw,24px)] [transform-style:preserve-3d]',
          hover && flip && '[transform:rotateY(180deg)]',
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden [backface-visibility:hidden]',
            'rounded-[clamp(10px,2vw,24px)]',
            borderColor,
            'border-4',
            frontBg,
          )}
        >
          {/* IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />

          {/* NAME / ROLE */}
          {hasInfo ? (
            <div
              className={cn(
                'absolute bottom-0 flex w-full flex-col items-center',
                'bg-black/30 py-[clamp(4px,1vw,10px)] backdrop-blur-sm',
                'text-[clamp(10px,2vw,18px)] font-semibold text-white',
                'rounded-b-[clamp(10px,2vw,24px)]',
              )}
            >
              <h3>{nama}</h3>
              <span className="opacity-80">{role}</span>
            </div>
          ) : (
            <div className="rounded-b-[clamp(10px,2vw,24px)]. absolute bottom-0 h-[18%] w-full" />
          )}
        </div>

        {/* BACK */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center gap-4',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-[clamp(10px,2vw,24px)]',
            borderColor,
            'border-4',
            backBg, // <— THEMEABLE BACKGROUND
          )}
        >
          <SocialMediaLink
            platform="instagram"
            href={ig ?? ''}
            className="h-[clamp(30px,8vw,60px)] w-[clamp(30px,8vw,60px)] text-[clamp(18px,4vw,32px)]"
          />
          <SocialMediaLink
            platform="linkedin"
            href={linkedIn ?? ''}
            className="h-[clamp(30px,8vw,60px)] w-[clamp(30px,8vw,60px)] text-[clamp(18px,4vw,32px)]"
          />
        </div>
      </div>
    </div>
  );
}
