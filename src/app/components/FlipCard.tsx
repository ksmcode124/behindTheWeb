"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { SocialMediaLink } from "@/app/components/SosialMediaLink";
const cardVariant = cva("", {
  variants: {
    size: {
      1: "w-[296px] h-[434px]",
      2: "w-[195px] h-[294px]",
      3: "w-[139px] h-[210px]",
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
}: React.ComponentPropsWithoutRef<"div"> &
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
  const Comp = asChild ? Slot : "div";
  const [hover, setHover] = useState(false);

  return (
    <Comp
      className={cn("[perspective:1000px]", cardVariant({ size }), className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...restProps} // ✅ aman, imageSrc tidak ikut tersebar
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          hover && size === 1 &&  "[transform:rotateY(180deg)]"
        )}
      >
        {/* bagian depan pas dihover */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center bg-blue-400 text-white font-semibold [backface-visibility:hidden overflow-hidden] bg-cover border-[#393c45]",
            size === 1 ? "border-[13px] rounded-[35px]" :
              size === 2 ? "border-[9px] rounded-[30px]" :
                size === 3 ? "border-[6px] rounded-[25px]" : "",
          )}
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className={cn(
            "absolute w-full bottom-0 flex flex-col items-center justify-center text-black font-semibold bg-white/65 backdrop-blur-xs overflow-hidden",
            size === 1 ? "text-[20px] p-[13px] rounded-b-[21px]" :
              size === 2 ? "text-[16px] p-[9px] rounded-b-[18px]" :
                size === 3 ? "text-[12px] p-[6px] rounded-b-[17px]" : "",
          )}>
            {/* nama dan role untuk looping*/}
            <h3>{nama}</h3>
            <span>{role}</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center bg-white gap-4 text-white font-semibold [transform:rotateY(180deg)] [backface-visibility:hidden]",
            size === 1 ? "border-[13px] rounded-[35px]" :
              size === 2 ? "border-[9px] rounded-[30px] " :
                size === 3 ? "border-[6px] rounded-[25px]" : "",
          )}
        >
          <SocialMediaLink platform="instagram" href={ig ?? ""} className="w-[60px] h-[60px] text-[38px]" />
          <SocialMediaLink platform="linkedin" href={linkedIn ?? ""} className="w-[60px] h-[60px] text-[38px]" />

        </div>
      </div>
    </Comp>
  );
}

export { FlipCard, cardVariant };
