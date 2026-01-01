'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DivisiWrapper from '@/components/common/DivisiWrapper';
import OurPastHeader from '@/features/our-past/sections/OurPastHeader';
import YearNavigation, {
  YearNavigationSkeleton,
} from '@/features/our-past/components/YearsNavigation';
import YearCarousel, {
  YearCarouselSkeleton,
} from '@/features/our-past/components/YearCarousel';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';

function ContentSkeleton() {
  return (
    <div className="py-12">
      <YearNavigationSkeleton dotCount={5} />
      <YearCarouselSkeleton />
    </div>
  );
}

export default function OurPastTeam() {
  const [kepengurusanCache, setKepengurusanCache] = useState<
    Record<string, any>
  >({});
  const [kepengurusan, setKepengurusan] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!kepengurusan) {
      setIsLoading(true);
      axios
        .get('/api/display/btw')
        .then((res) => {
          if (cancelled) return;
          setKepengurusan(res.data);
          setKepengurusanCache({
            [res.data.helper.years[res.data.helper.index ?? 0]]: res.data,
          });
          setIsLoading(false);
        })
        .catch(() => {
          if (!cancelled) setIsLoading(false);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [kepengurusan]);

  useEffect(() => {
    if (!kepengurusan?.helper?.years) return;
    const year = kepengurusan.helper.years[currentIndex];
    if (kepengurusanCache[year]) {
      setKepengurusan(kepengurusanCache[year]);
      return;
    }

    let cancelled = false;
    setIsTransitioning(true);
    axios
      .get(`/api/display/btw?tahun=${year}`)
      .then((res) => {
        if (cancelled) return;
        setKepengurusan(res.data);
        setKepengurusanCache((prev) => ({ ...prev, [year]: res.data }));
        setIsTransitioning(false);
      })
      .catch(() => {
        if (!cancelled) setIsTransitioning(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentIndex, kepengurusan?.helper?.years, kepengurusanCache]);

  const scrollToIndex = (index: number) => {
    if (!kepengurusan) return;
    const max = kepengurusan.helper.years.length - 1;
    setCurrentIndex(Math.max(0, Math.min(index, max)));
  };

  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <TexturedSection texture={TEXTURES.TEXTURE5}>
        <OurPastHeader />
      </TexturedSection>
      <DivisiWrapper>
        {isLoading ? (
          <ContentSkeleton />
        ) : kepengurusan ? (
          <div
            className={
              isTransitioning
                ? 'opacity-50 transition-opacity duration-300'
                : 'opacity-100 transition-opacity duration-300'
            }
          >
            <YearNavigation
              kepengurusan={kepengurusan}
              currentIndex={currentIndex}
              scrollToIndex={scrollToIndex}
            />
            <YearCarousel kepengurusan={kepengurusan} />
          </div>
        ) : null}
      </DivisiWrapper>
    </main>
  );
}
