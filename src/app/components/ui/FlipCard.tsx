'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { SocialMediaLink } from './SocialMediaLink';

const cardVariant = cva('', {
  variants: {
    size: {
      1: 'w-[296px] h-[434px]',
      2: 'w-[195px] h-[294px]',
      3: 'w-[139px] h-[210px]',
    },
  },
  defaultVariants: {
    size: 1,
  },
});

function FlipCard({
  size,
  imageSrc, // dikeluarkan dari props
  nama,
  role,
  ig,
  linkedIn,
  asChild = false,
  className,
  children,
  ...restProps // ganti jadi restProps agar imageSrc tidak ikut tersebar
}: React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariant> & {
    asChild?: boolean;
    children?: React.ReactNode;
    imageSrc?: string;
    className?: string;
    nama?: string;
    role?: string;
    ig?: string;
    linkedIn?: string;
  }) {
  const Comp = asChild ? Slot : 'div';
  const [hover, setHover] = useState(false);

  return (
    <Comp
      className={cn('[perspective:1000px]', cardVariant({ size }), className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...restProps} // ✅ aman, imageSrc tidak ikut tersebar
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
          hover && size === 1 && '[transform:rotateY(180deg)]',
        )}
      >
        {/* bagian depan pas dihover */}
        <div
          className={cn(
            '[backface-visibility:hidden overflow-hidden] absolute flex h-full w-full items-center justify-center border-[#393c45] bg-blue-400 bg-cover font-semibold text-white',
            size === 1
              ? 'rounded-[35px] border-[13px]'
              : size === 2
                ? 'rounded-[30px] border-[9px]'
                : size === 3
                  ? 'rounded-[25px] border-[6px]'
                  : '',
          )}
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div
            className={cn(
              'absolute bottom-0 flex w-full flex-col items-center justify-center overflow-hidden bg-white/65 font-semibold text-black backdrop-blur-xs',
              size === 1
                ? 'rounded-b-[21px] p-[13px] text-[20px]'
                : size === 2
                  ? 'rounded-b-[18px] p-[9px] text-[16px]'
                  : size === 3
                    ? 'rounded-b-[17px] p-[6px] text-[12px]'
                    : '',
            )}
          >
            {/* nama dan role untuk looping*/}
            <h3>{nama}</h3>
            <span>{role}</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            'absolute flex h-full w-full [transform:rotateY(180deg)] items-center justify-center gap-4 bg-white font-semibold text-white [backface-visibility:hidden]',
            size === 1
              ? 'rounded-[35px] border-[13px]'
              : size === 2
                ? 'rounded-[30px] border-[9px]'
                : size === 3
                  ? 'rounded-[25px] border-[6px]'
                  : '',
          )}
        >
          <SocialMediaLink
            platform="instagram"
            href={ig ?? ''}
            className="h-[60px] w-[60px] text-[38px]"
          />
          <SocialMediaLink
            platform="linkedin"
            href={linkedIn ?? ''}
            className="h-[60px] w-[60px] text-[38px]"
          />
        </div>
      </div>
    </Comp>
  );
}

export { FlipCard, cardVariant };
