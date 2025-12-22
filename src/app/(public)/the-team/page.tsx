'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

import TeamHeader from '@/features/the-team/sections/TeamHeader';
import CodeLens, { CodeLensSkeleton } from '@/components/common/CodeLens';
import OurPastSection from '@/components/layout/OurPastSection';
import DivisiWrapper from '@/components/common/DivisiWrapper';
import DevelopersList, {
  DevelopersSkeleton,
} from '@/components/common/DevelopersList';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';
import { CodeLensImages } from '@/lib/data';

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
      } catch {
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
        <TeamHeader />
      </TexturedSection>

      {isLoading ? (
        <CodeLensSkeleton />
      ) : (
        data && (
          <CodeLens data={CodeLensImages[0].activities} className="lg:hidden" />
        )
      )}

      <DivisiWrapper>
        {isLoading ? (
          <DevelopersSkeleton />
        ) : (
          <>
            <p className="text-secondary-400 text-xl lg:hidden">
              Click the photo for details
            </p>
            {data?.data.divisi && <DevelopersList divisi={data?.data.divisi} />}
          </>
        )}
      </DivisiWrapper>

      <OurPastSection />
    </main>
  );
}
