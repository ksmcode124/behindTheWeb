import { useRef, useEffect } from 'react';
import { FlipCard } from '@/components/common/FlipCard';
import Carousel from '@/components/common/Carousel';
import { isInti } from '@/lib/utils';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

type Props = {
  kepengurusan: KepengurusanResponse | null;
  currentIndex: number;
};

export default function YearCarouselContainer({
  kepengurusan,
  currentIndex,
}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current || !kepengurusan?.helper?.years) return;
    const container = carouselRef.current;
    const target = container.children[currentIndex] as HTMLElement;
    if (target)
      container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }, [currentIndex, kepengurusan?.helper?.years]);

  return (
    <div
      ref={carouselRef}
      id="carousel-container"
      className="relative z-10 flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        #carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {kepengurusan?.helper?.years.map((_, idx) => (
        <div key={idx} className="w-full flex-shrink-0 snap-center">
          {/* Ketua & Wakil */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12 px-4">
            {(
              kepengurusan?.data.divisi.find((d) => isInti(d))?.anggota || []
            ).map(
              ({
                id,
                nama_anggota,
                foto_anggota,
                instagram,
                linkedin,
                jabatan,
              }) => (
                <div key={id} className="flex flex-col items-center gap-4">
                  <FlipCard
                    size={1}
                    nama={nama_anggota}
                    role={jabatan}
                    imageSrc={foto_anggota}
                    ig={instagram}
                    linkedIn={linkedin}
                  />
                </div>
              ),
            )}
          </div>

          {/* Developer Carousels */}
          {(kepengurusan?.data.divisi || [])
            .filter((divisi) => !isInti(divisi))
            .map((divisi, index) => (
              <div
                key={index}
                className="relative z-10 flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
              >
                <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
                  {divisi.nama_divisi}
                </h3>
                <Carousel anggotaProp={divisi.anggota} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
