'use client';

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SocialMediaLink } from "./SocialMediaLink";
const cardVariant = cva("", {
  variants: {
    size: {
      0: "w-[113.72px] h-[171.41px] md:w-[231.78px] md:h-[349px]",
      1: "w-[121.67px] h-[183.4px] md:w-[296px] md:h-[434px] ",
      2: "w-[87.87px] h-[132.48px] md:w-[195px] md:h-[294px] ",
      3: "w-[139px] h-[210px]",
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
  frontBg = 'bg-white',
  backBg = 'bg-white',
  borderColor = 'border-secondary-300',
  ...props
}: {
  size?: 0 | 1 | 2 | 3;
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
        'relative w-auto justify-items-center [perspective:1000px]',
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]", cardVariant({ size }),
          hover && (size === 1 || size === 0) &&  "[transform:rotateY(180deg)]"
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center bg-blue-400 text-white font-semibold [backface-visibility:hidden overflow-hidden] bg-cover",
            size === 0 ? "border-[5.33px] rounded-[22.9px] md:rounded-[46.62px] border-[#DEBC96]" :
              size === 1 ? "border-[4px] rounded-[20px] md:border-[13px] md:rounded-[35px] border-[#393c45]" :
                size === 2 ? "border-[3px] rounded-[15px] md:border-[9px] md:rounded-[30px] border-[#393c45] " :
                  size === 3 ? "border-[6px] rounded-[25px] border-[#393c45]" : ""

          )} style={{ backgroundImage: `url(${imageSrc})` }}
        >
          {size !== 0 ? <div className={cn(
            "absolute w-full bottom-0 flex flex-col items-center justify-center text-black font-semibold overflow-hidden",
            size === 1 ? "text-[10px] p-[4px] rounded-b-[14px] md:text-[20px] md:p-[13px] md:rounded-b-[21px] bg-white/65 backdrop-blur-xs " :
              size === 2 ? "text-[8px] p-[3px] rounded-b-[10px] md:text-[16px] md:p-[9px] md:rounded-b-[18px] bg-white/65 backdrop-blur-xs" :
                size === 3 ? "text-[12px] p-[6px] rounded-b-[17px] bg-white/65 backdrop-blur-xs" : ""
          )}>
            {/* nama dan role untuk looping*/}
            <h3>{nama}</h3>
            <span>{role}</span>
          </div> : null}
          
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center gap-2 text-white font-semibold [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#393c45]",
            size === 0 ? "border-[5.33px] rounded-[22.9px] md:rounded-[46.62px]  border-[#DEBC96]" :
              size === 1 ? "border-[4px] rounded-[20px] md:border-[13px] md:rounded-[35px] border-[#393c45]" :
                size === 2 ? "border-[3px] rounded-[15px] md:border-[9px] md:rounded-[30px]  border-[#393c45] " :
                  size === 3 ? "border-[6px] rounded-[25px] border-[#393c45]" : ""
          )}
        >
          <SocialMediaLink platform="instagram" href={ig ?? ""} iconSize={40} iconClassName="p-4" />
          <SocialMediaLink platform="linkedin" href={linkedIn ?? ""} iconSize={40} iconClassName="p-4"/>

        </div>
      </div>
    </div>
  );
}
