import React from 'react';
import Image from 'next/image';

interface WrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className = '' }: WrapperProps) {
  return (
    <div
      className={`relative flex flex-col items-center rounded-t-[5em] bg-[linear-gradient(to_right,#FFF9E6_0%,#DEBB95_30%,#DEBB95_80%,#FFF9E6_100%)] px-6 py-20 md:px-10 md:py-[7.5rem] ${className}`}
    >
      {/* top border */}
      <div className="border-secondary-400 absolute -top-6 left-0 h-10 w-full rounded-t-[15em] border-x border-t-2" />

      {/* DECORATION WRAPPER — prevents overflow */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {/* LEFT COLUMN */}
        <div className="absolute top-0 left-0 flex h-full flex-col justify-around opacity-70">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col items-start gap-[30vh]">
              <Image
                width={360}
                height={360}
                alt="code124"
                src="/assets/images/logo_white.webp"
                className="w-[180px] rotate-60 select-none xl:w-[250px]"
              />
              <Image
                width={360}
                height={200}
                alt="code124"
                src="/assets/images/white_accent.webp"
                className="w-[180px] scale-x-[-1] select-none xl:w-[250px]"
              />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="absolute top-0 right-0 flex h-full flex-col items-end justify-around opacity-70">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col items-end gap-[30vh]">
              <Image
                width={360}
                height={360}
                alt="code124"
                src="/assets/images/white_accent.webp"
                className="w-[180px] select-none xl:w-[250px]"
              />
              <Image
                width={360}
                height={200}
                alt="code124"
                src="/assets/images/logo_white.webp"
                className="w-[180px] select-none xl:w-[250px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {children}
    </div>
  );
}
