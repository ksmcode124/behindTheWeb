'use client';

import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SocialMediaLink } from './SocialMediaLink';
const cardVariant = cva('', {
  variants: {
    size: {
      0: 'w-[113.72px] h-[171.41px] md:w-[231.78px] md:h-[349px]',
      1: 'w-[121.67px] h-[183.4px] md:w-[296px] md:h-[434px] ',
      2: 'w-[87.87px] h-[132.48px] md:w-[195px] md:h-[294px] ',
      3: 'w-[139px] h-[210px]',
    },
  },
  defaultVariants: {
    size: 1,
  },
});

export function FlipCard({
  size,
  imageSrc, // dikeluarkan dari props
  nama,
  role,
  ig,
  linkedIn,
  className,
  flip = true,
  frontBg = 'bg-secondary-400',
  backBg = 'bg-secondary-400',
  borderColor = 'border-secondary-300',
  ...props
}: {
  size?: 0 | 1 | 2 | 3;
  imageSrc?: string | null;
  nama?: string;
  role?: string;
  ig?: string | null;
  linkedIn?: string | null;
  className?: string;
  flip?: boolean;

  /** NEW: THEMING */
  frontBg?: string;
  backBg?: string;
  borderColor?: string;
}) {
  const [iconSize, setIconSize] = useState(30);
  const [iconPadding, setIconPadding] = useState('p-2');
  const [hover, setHover] = useState(false);
  const hasInfo = nama || role;
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIconSize(20);
      setIconPadding('p-1');
    } else {
      setIconSize(30);
      setIconPadding('p-2');
    }
  }, []);
  return (
    <div
      className={cn(
        'relative w-auto justify-items-center [perspective:1000px]',
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
          cardVariant({ size }),
          hover && (size === 1 || size === 0) && '[transform:rotateY(180deg)]',
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            '[backface-visibility:hidden overflow-hidden] text-secondary-400 absolute flex h-full w-full items-center justify-center bg-blue-400 bg-cover font-semibold',
            size === 0
              ? 'rounded-[22.9px] border-[5.33px] border-[#DEBC96] md:rounded-[46.62px]'
              : size === 1
                ? 'rounded-[20px] border-[4px] border-[#393c45] md:rounded-[35px] md:border-[13px]'
                : size === 2
                  ? 'rounded-[15px] border-[3px] border-[#393c45] md:rounded-[30px] md:border-[9px]'
                  : size === 3
                    ? 'rounded-[25px] border-[6px] border-[#393c45]'
                    : '',
          )}
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          {size !== 0 ? (
            <div
              className={cn(
                'absolute bottom-0 flex w-full flex-col items-center justify-center overflow-hidden font-semibold text-black',
                size === 1
                  ? 'bg-secondary-400/65 rounded-b-[14px] p-[4px] text-[10px] backdrop-blur-xs md:rounded-b-[21px] md:p-[13px] md:text-[20px]'
                  : size === 2
                    ? 'bg-secondary-400/65 rounded-b-[10px] p-[3px] text-[8px] backdrop-blur-xs md:rounded-b-[18px] md:p-[9px] md:text-[16px]'
                    : size === 3
                      ? 'bg-secondary-400/65 rounded-b-[17px] p-[6px] text-[12px] backdrop-blur-xs'
                      : '',
              )}
            >
              {/* nama dan role untuk looping*/}
              <h3>{nama}</h3>
              <span>{role}</span>
            </div>
          ) : null}
        </div>

        {/* BACK */}
        <div
          className={cn(
            'text-secondary-400 absolute flex h-full w-full [transform:rotateY(180deg)] items-center justify-center gap-2 bg-[#393c45] font-semibold [backface-visibility:hidden]',
            size === 0
              ? 'rounded-[22.9px] border-[5.33px] border-[#DEBC96] md:rounded-[46.62px]'
              : size === 1
                ? 'rounded-[20px] border-[4px] border-[#393c45] md:rounded-[35px] md:border-[13px]'
                : size === 2
                  ? 'rounded-[15px] border-[3px] border-[#393c45] md:rounded-[30px] md:border-[9px]'
                  : size === 3
                    ? 'rounded-[25px] border-[6px] border-[#393c45]'
                    : '',
          )}
        >
          <div className="flex gap-3">
            <SocialMediaLink platform="instagram" href={ig ?? ''} withBorder />
            <SocialMediaLink
              platform="linkedin"
              href={linkedIn ?? ''}
              withBorder
            />
          </div>
        </div>
      </div>
    </div>
  );
}
