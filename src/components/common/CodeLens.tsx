import { ActivityProps } from '@/lib/constants';
import ScrollingBoxes from '@/components/ui/ScrollingBoxes';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';

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
      <ScrollingBoxes speed={speed} />
      <InfiniteCarousel images={data} speed={speed} />
      <ScrollingBoxes speed={speed} />
    </section>
  );
}
