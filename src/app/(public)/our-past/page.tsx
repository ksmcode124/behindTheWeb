'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from '@/components/common/Wrapper';
import HeaderSection from '@/features/our-past/HeaderSection';
import YearNavigation from '@/features/our-past/YearsNavigation';
import YearCarouselContainer from '@/features/our-past/YearCarouselContainer';

export default function OurPastTeam() {
  const [kepengurusanCache, setKepengurusanCache] = useState<
    Record<string, any>
  >({});
  const [kepengurusan, setKepengurusan] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (!kepengurusan) {
      axios.get('/api/display/btw').then((res) => {
        if (cancelled) return;
        setKepengurusan(res.data);
        setKepengurusanCache({
          [res.data.helper.years[res.data.helper.index ?? 0]]: res.data,
        });
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!kepengurusan?.helper?.years) return;
    const year = kepengurusan.helper.years[currentIndex];
    if (kepengurusanCache[year]) {
      setKepengurusan(kepengurusanCache[year]);
      return;
    }
    let cancelled = false;
    axios.get(`/api/display/btw?tahun=${year}`).then((res) => {
      if (cancelled) return;
      setKepengurusan(res.data);
      setKepengurusanCache((prev) => ({ ...prev, [year]: res.data }));
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
      <HeaderSection />
      <Wrapper>
        {kepengurusan && (
          <>
            <YearNavigation
              kepengurusan={kepengurusan}
              currentIndex={currentIndex}
              scrollToIndex={scrollToIndex}
            />
            <YearCarouselContainer
              kepengurusan={kepengurusan}
              currentIndex={currentIndex}
            />
          </>
        )}
      </Wrapper>
    </main>
  );
}
