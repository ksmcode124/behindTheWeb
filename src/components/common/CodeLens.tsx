import { ActivityProps } from '@/lib/constants';
import ScrollingBoxes, {
  ScrollingBoxesSkeleton,
} from '@/components/ui/ScrollingBoxes';
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

export function CodeLensSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className="relative mb-6 flex w-full flex-col gap-4 bg-[#27292D] py-4 shadow-2xl sm:mb-[4vh] sm:gap-6 sm:py-6 lg:hidden lg:py-8">
      {/* ScrollingBoxes (top) */}
      <ScrollingBoxesSkeleton />

      {/* InfiniteCarousel */}
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <div className="flex">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="relative mx-1 aspect-3/2 h-[clamp(80px,12vw,160px)] flex-none px-3 sm:mx-2 sm:px-5 md:mx-3 lg:mx-5 lg:px-8"
            >
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ScrollingBoxes (bottom) */}
      <ScrollingBoxesSkeleton />
    </section>
  );
}
