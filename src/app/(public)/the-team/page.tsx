'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

import HeroSection from '@/features/the-team/HeroSection';
import CodeLens from '@/components/common/CodeLens';
import OurPast from '@/components/layout/OurPast';
import Wrapper from '@/components/common/Wrapper';
import Developers from '@/components/common/Developers';

export default function TheTeam() {
  const [data, setData] = useState<KepengurusanResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      const res = await axios.get<KepengurusanResponse>('/api/display/btw');
      if (!cancelled) setData(res.data);
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <HeroSection />

      {data && <CodeLens data={data} />}

      <Wrapper>
        {data?.data.divisi && <Developers divisi={data.data.divisi} />}
      </Wrapper>

      <OurPast />
    </main>
  );
}
