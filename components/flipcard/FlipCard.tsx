"use client";
import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

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


const roundedVariant = cva("", {
  variants: {
    rounded: {
      1: "rounded-[35px]",
      2: "rounded-[30px]",
      3: "rounded-[25px]",
    },
  },
  defaultVariants: {
    rounded: 1,
  },
});

function FlipCard({
  size,
  rounded,
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariant> &
  VariantProps<typeof roundedVariant> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  const [hover, setHover] = useState(false);

  return (
    <Comp
      className={cn(
        "[perspective:1000px]",
        cardVariant({ size }),
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          hover && "[transform:rotateY(180deg)]"
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center bg-blue-400 text-white font-semibold [backface-visibility:hidden] border-[8px] border-black ",
            roundedVariant({ rounded })
          )}
        >
          Front
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center bg-red-400 text-white font-semibold [transform:rotateY(180deg)] [backface-visibility:hidden] border-[8px] border-black",
            roundedVariant({ rounded })
          )}
        >
          Belakang
        </div>
      </div>
    </Comp>
  );
}

export { FlipCard, cardVariant };
