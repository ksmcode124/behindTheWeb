import { Suspense } from 'react';
import Hero from '@/features/home/Hero';
import Origin from '@/features/home/Origin';
import OurPast from '@/components/layout/OurPast';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';
import DivisionsSection from '@/features/home/DivisionsSection';
import { Skeleton } from '@/components/ui/skeleton';

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
  const divisi = (await fetchCurrentKepengurusan())?.divisi;
  return <DivisionsSection divisi={divisi} />;
}

export default function HOME() {
  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <Hero />
      <Origin />
      <Suspense fallback={<DivisionsSkeleton />}>
        <DivisionsData />
      </Suspense>
      <OurPast />
    </main>
  );
}
