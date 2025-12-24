'use client';
import Image from 'next/image';
import DivisiWrapper from '@/components/common/DivisiWrapper';
import DivisiIntiList, {
  DivisiIntiListSkeleton,
} from '../components/DivisiIntiList';
import { Divisi, KepengurusanResponse } from '@/lib/btw/interfaces/btw';
import { isInti } from '@/lib/utils';
import DecorativeText from '../components/DecorativeText';
import DivisiCard from '../components/DivisiCard';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';
import Content from '../data/home-content.json';
import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect, useState } from 'react';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';

export default function DivisionsSection() {
  const [data, setData] = useState<KepengurusanResponse | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchCurrentKepengurusan().then((res) => {
      if (cancelled) return;
      setData(res);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        <DivisiIntiListSkeleton />
        <DivisiCardSkeleton />
      </>
    );
  }
  return (
    <>
      <TexturedSection texture={TEXTURES.TEXTURE4}>
        <section className="text-secondary-400 relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6 py-15 lg:py-0">
          {/* Title with small line accents */}
          <div className="relative w-fit">
            <h2 className="border-secondary border-b-2 px-5 pb-5 text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              {Content.division.headline}
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
            {Content.division.cta.flipCard}
          </p>
          {/* Content */}
          <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
            <DivisiIntiList
              divisi={data?.divisi.find((d: Divisi) => isInti(d))}
            />
          </div>
          <DecorativeText text={data?.nama_kepengurusan} />
        </section>
      </TexturedSection>

      <DivisiWrapper className="mt-10 flex flex-col gap-5 py-20">
        {data?.divisi
          .filter((d: Divisi) => !isInti(d))
          .map((divisi: Divisi, index: number) => (
            <DivisiCard
              divisi={divisi}
              kepengurusan={data?.nama_kepengurusan}
              key={index}
            />
          ))}
      </DivisiWrapper>
    </>
  );
}

export function DivisiCardSkeleton() {
  return (
    <DivisiWrapper className="mt-10">
      <div className="z-20 flex w-full flex-col items-center">
        {/* TITLE */}
        <Skeleton className="mb-10 h-12 w-64 -skew-3 lg:h-16 lg:w-96" />

        {/* CARD */}
        <div className="relative w-full max-w-4xl overflow-hidden border-[1.25em] border-transparent">
          {/* Rotated kepengurusan text */}
          <Skeleton className="absolute top-1/2 right-8 h-5 w-40 -translate-y-[70%] rotate-90 sm:h-6 sm:w-52 lg:h-10 lg:w-72" />

          {/* Image */}
          <div className="relative aspect-video w-full">
            <Skeleton className="absolute inset-0 h-full w-full" />
          </div>

          {/* Gradient overlay (visual only, no skeleton needed) */}

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3 px-5 pb-5">
            {/* Description */}
            <Skeleton className="h-4 w-[65%]" />

            {/* CTA button */}
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </DivisiWrapper>
  );
}
