import { ActivityProps } from '@/lib/constants';
import ScrollingBoxes from '@/components/ui/ScrollingBoxes';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';
import { Skeleton } from '../ui/Skeleton';

interface CodeLensProps {
  className?: string;
  data: ActivityProps[];
  speed?: number; // allow overriding speed if needed
}

export default function CodeLens({
  className,
  data,
  speed = 45,
}: CodeLensProps) {
  return (
    <section
      className={`relative mb-6 flex w-full flex-col gap-4 bg-[#27292D] py-4 shadow-2xl sm:mb-[4vh] sm:gap-6 sm:py-6 lg:py-8 ${className} `}
    >
      <ScrollingBoxes speed={speed} boxSize={20} />
      <InfiniteCarousel images={data} speed={speed} />
      <ScrollingBoxes speed={speed} boxSize={20} />
    </section>
  );
}

export function CodeLensSkeleton() {
  return (
    <div className="w-full px-4 py-16 lg:hidden">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="mx-auto h-8 w-64" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
