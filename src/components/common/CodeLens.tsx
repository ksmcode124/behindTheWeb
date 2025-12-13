import { Divisi, KepengurusanResponse } from '@/lib/btw/interfaces/btw';
import { IMAGES } from '@/lib/constants';
import { useMemo } from 'react';
import ScrollingBoxes from '@/components/ui/ScrollingBoxes';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';

interface CodeLensProps {
  data: KepengurusanResponse | null;
  speed?: number; // allow overriding speed if needed
}

export default function CodeLens({ data = null, speed = 45 }: CodeLensProps) {
  // Ensure a stable array even if data is null
  const divisiImages = useMemo(
    () =>
      data?.data.divisi.map((d: Divisi) => ({
        src: d.foto_divisi ? d.foto_divisi : IMAGES.FALLBACK,
        alt: d.nama_divisi,
      })) ?? [],
    [data],
  );

  return (
    <section className="relative mb-[5vh] flex w-full flex-col gap-6 bg-[#27292D] py-6 shadow-2xl">
      <ScrollingBoxes speed={speed} />
      <InfiniteCarousel images={divisiImages} speed={speed} />
      <ScrollingBoxes speed={speed} />
    </section>
  );
}
