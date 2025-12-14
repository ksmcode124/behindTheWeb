import { Divisi } from '@/lib/btw/interfaces/btw';
import Carousel from './Carousel';
import { isInti } from '@/lib/utils';

export default function Developers({ divisi = [] }: { divisi: Divisi[] }) {
  return (
    <>
      {divisi
        .filter((d) => !isInti(d))
        .map(({ nama_divisi, anggota }, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
          >
            <h3 className="text-primary-500 mb-10 -skew-4 text-4xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl lg:[-webkit-text-stroke-width:2.5px]">
              {nama_divisi}
            </h3>
            <Carousel anggotaProp={anggota} />
          </div>
        ))}
    </>
  );
}
