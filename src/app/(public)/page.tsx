import { Suspense } from 'react';
import Hero from '@/features/home/Hero';
import Origin from '@/features/home/Origin';
import OurPast from '@/components/layout/OurPast';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';
import DivisionsSection from '@/features/home/DivisionsSection';
import { Skeleton } from '@/components/ui/skeleton';
import { IMAGES, TEXTURES } from '@/lib/constants';
import TexturedSection from '@/components/ui/TexturedSection';

// Skeleton component for DivisionsSection
// DivisionsSectionSkeleton.tsx
function DivisionsSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6 py-15">
        {/* title */}
        <div className="bg-secondary/20 h-12 w-64 animate-pulse rounded" />

        {/* hint text */}
        <div className="bg-secondary/10 h-5 w-48 animate-pulse rounded" />

        {/* inti card */}
        <div className="flex w-full max-w-6xl justify-center">
          <div className="bg-secondary/15 h-80 w-64 animate-pulse rounded-xl" />
        </div>
      </section>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-24 py-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary/10 h-96 w-full animate-pulse rounded-xl"
          />
        ))}
      </div>
    </>
  );
}

// Async component for divisions
async function DivisionsData() {
  const divisi = (await fetchCurrentKepengurusan())?.divisi;
  return <DivisionsSection divisi={divisi} />;
}

export default function HOME() {
  return (
    <main className="bg-secondary-300 font-display relative min-h-screen">
      <TexturedSection background={IMAGES.HERO_BG} texture={TEXTURES.TEXTURE1}>
        <Hero />
      </TexturedSection>
      <Origin />
      <Suspense fallback={<DivisionsSkeleton />}>
        <DivisionsData />
      </Suspense>
      <OurPast />
    </main>
  );
}
