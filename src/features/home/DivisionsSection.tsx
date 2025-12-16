import Image from 'next/image';
import Wrapper from '@/components/common/Wrapper';
import Inti from '@/features/home/Inti';
import { Divisi } from '@/lib/btw/interfaces/btw';
import { isInti } from '@/lib/utils';
import SingleDivisiCard from './SingleDivisiCard';
import DecorativeText from './DecorativeText';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';
import { Suspense } from 'react';

// SingleDivisiCardSkeleton.tsx
export function SingleDivisiCardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="bg-secondary/20 h-10 w-64 animate-pulse rounded" />

      {/* card */}
      <div className="border-secondary/10 flex flex-col gap-4 rounded-xl border p-6">
        {/* image */}
        <div className="bg-secondary/15 aspect-[3/4] w-full animate-pulse rounded-lg" />

        {/* name */}
        <div className="bg-secondary/20 h-6 w-3/4 animate-pulse rounded" />

        {/* role */}
        <div className="bg-secondary/15 h-4 w-1/2 animate-pulse rounded" />
      </div>
    </div>
  );
}

export default async function DivisionsSection({
  divisi,
}: {
  divisi: Divisi[];
}) {
  return (
    <>
      <TexturedSection texture={TEXTURES.TEXTURE4}>
        <section className="text-secondary-400 relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6 py-15 md:py-20 lg:py-0">
          {/* Title with small line accents */}
          <div className="relative w-fit">
            <h2 className="border-secondary border-b-2 px-5 pb-5 text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              MEET OUR TEAM
            </h2>

            <Image
              src="/images/line_brow_black.webp"
              alt=""
              width={200}
              height={200}
              className="absolute bottom-0 left-0 h-8 w-20 translate-y-[50%] object-cover object-right"
            />
            <Image
              src="/images/line_brow_black.webp"
              alt=""
              width={200}
              height={200}
              className="absolute right-0 bottom-0 h-8 w-20 translate-y-[50%] scale-x-[-1] object-cover object-right"
            />
          </div>
          <p className="text-secondary-400 text-base sm:text-lg md:text-xl lg:hidden">
            Click the photo for details
          </p>
          {/* Content */}
          <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
            <Inti divisi={divisi.find((d) => isInti(d))} />
          </div>
          <DecorativeText />
        </section>
      </TexturedSection>

      <Wrapper className="mt-10 flex flex-col gap-24 py-20">
        {divisi
          .filter((d) => !isInti(d))
          .map((divisi, index) => (
            <Suspense
              key={divisi.id ?? index}
              fallback={<SingleDivisiCardSkeleton />}
            >
              <SingleDivisiCard divisi={divisi} />
            </Suspense>
          ))}
      </Wrapper>
    </>
  );
}
