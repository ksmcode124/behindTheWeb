'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

import HeroSection from '@/features/the-team/HeroSection';
import CodeLens, { CodeLensSkeleton } from '@/components/common/CodeLens';
import OurPast from '@/components/layout/OurPast';
import Wrapper from '@/components/common/Wrapper';
import Developers from '@/components/common/Developers';
import { Skeleton } from '@/components/ui/skeleton';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';

function DevelopersSkeleton() {
  return (
    <div className="space-y-8 py-12">
      <Skeleton className="mx-auto h-10 w-56" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(12)].map((_, i) => (
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
