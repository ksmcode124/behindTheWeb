import { FlipCard } from '@/components/common/FlipCard';
import { isInti } from '@/lib/utils';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';
import DevelopersList from '@/components/common/DevelopersList';

type Props = {
  kepengurusan: KepengurusanResponse | null;
};

export default function YearCarousel({ kepengurusan }: Props) {
  return (
    <div
      className="relative z-10 flex"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        #carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="w-full snap-center">
        {/* Ketua & Wakil */}
        <div className="relative z-10 mx-auto mb-15 flex w-full max-w-6xl flex-wrap justify-center gap-12 px-4 lg:mb-20">
          {(
            kepengurusan?.data.divisi.find((d) => isInti(d))?.anggota || []
          ).map(
            (
              { nama_anggota, foto_anggota, instagram, linkedin, jabatan },
              index,
            ) => (
              <div key={index} className="flex flex-col items-center gap-4">
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
        {kepengurusan?.data.divisi && (
          <DevelopersList divisi={kepengurusan?.data.divisi} />
        )}
      </div>
    </div>
  );
}
