import { Divisi } from '@/lib/btw/interfaces/btw';
import Carousel from './Carousel';
import { isInti } from '@/lib/utils';
import { Skeleton } from '../ui/Skeleton';

export default function DevelopersList({ divisi = [] }: { divisi: Divisi[] }) {
  return (
    <>
      {divisi
        .filter((d) => !isInti(d))
        .map(({ nama_divisi, anggota }, index) => (
          <div
            key={index}
            className="z-30 flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
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

export function DevelopersSkeleton() {
  return (
    <div className="w-1/2 space-y-8 py-12">
      <Skeleton className="mx-auto h-10 w-56" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
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
