import { Divisi, KepengurusanResponse } from '@/lib/btw/interfaces/btw';
import { IMAGES } from '@/lib/constants';
import { useMemo } from 'react';
import ScrollingBoxes from '@/components/ui/ScrollingBoxes';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';

interface CodeLensProps {
  className?: string;
  data: KepengurusanResponse | null;
  speed?: number; // allow overriding speed if needed
}

export default function CodeLens({
  className,
  data = null,
  speed = 45,
}: CodeLensProps) {
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
    <section
      className={`relative mb-6 flex w-full flex-col gap-4 bg-[#27292D] py-4 shadow-2xl sm:mb-[4vh] sm:gap-6 sm:py-6 lg:py-8 ${className} `}
    >
      <ScrollingBoxes speed={speed} />
      <InfiniteCarousel images={divisiImages} speed={speed} />
      <ScrollingBoxes speed={speed} />
    </section>
  );
}
