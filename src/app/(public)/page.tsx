import { Suspense } from 'react';
import OurPastSection from '@/components/layout/OurPastSection';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';
import { HeroSection, DivisionsSection, OriginSection } from '@/features/home';
import { Skeleton } from '@/components/ui/skeleton';
import { IMAGES, TEXTURES } from '@/lib/constants';
import TexturedSection from '@/components/ui/TexturedSection';

// Skeleton component for DivisionsSection
function DivisionsSkeleton() {
  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mx-auto mb-4 h-12 w-64" />
        <Skeleton className="mx-auto mb-12 h-6 w-96" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Async component for divisions
async function DivisionsData() {
  const kepengurusan = await fetchCurrentKepengurusan();
  const divisi = kepengurusan?.divisi;
  return (
    <DivisionsSection
      divisi={divisi}
      kepengurusan={kepengurusan.nama_kepengurusan}
    />
  );
}

export default function HomePage() {
  return (
    <main className="bg-secondary-300 font-display relative min-h-screen">
      <TexturedSection background={IMAGES.HERO_BG} texture={TEXTURES.TEXTURE1}>
        <HeroSection />
      </TexturedSection>
      <OriginSection />
      <Suspense fallback={<DivisionsSkeleton />}>
        <DivisionsData />
      </Suspense>
      <OurPastSection />
    </main>
  );
}
