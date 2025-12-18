'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

import HeroSection from '@/features/the-team/HeroSection';
import CodeLens from '@/components/common/CodeLens';
import OurPast from '@/components/layout/OurPast';
import Wrapper from '@/components/common/Wrapper';
import Developers from '@/components/common/Developers';
import { Skeleton } from '@/components/ui/skeleton';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';

function CodeLensSkeleton() {
  return (
    <div className="w-full px-4 py-16 lg:hidden">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="mx-auto h-8 w-64" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DevelopersSkeleton() {
  return (
    <div className="w-1/2 space-y-8 py-12">
      <Skeleton className="mx-auto h-10 w-56" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="mx-auto h-6 w-3/4" />
            <Skeleton className="mx-auto h-4 w-1/2" />
            <Skeleton className="mx-auto h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TheTeam() {
  const [data, setData] = useState<KepengurusanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await axios.get<KepengurusanResponse>('/api/display/btw');
        if (!cancelled) {
          setData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <TexturedSection texture={TEXTURES.TEXTURE4}>
        <HeroSection />
      </TexturedSection>

      {isLoading ? (
        <CodeLensSkeleton />
      ) : (
        data && <CodeLens data={data} className="lg:hidden" />
      )}

      <Wrapper>
        {isLoading ? (
          <DevelopersSkeleton />
        ) : (
          <>
            <p className="text-secondary-400 text-xl lg:hidden">
              Click the photo for details
            </p>
            {data?.data.divisi && <Developers divisi={data?.data.divisi} />}
          </>
        )}
      </Wrapper>

      <OurPast />
    </main>
  );
}
