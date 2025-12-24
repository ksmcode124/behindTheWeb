import Link from 'next/link';
import ShadowedText from '@/components/ui/ShadowedText';
import { ROUTES } from '@/lib/constants';
import { Brand } from '@/lib/data';

export default function OurPastSection() {
  return (
    <div className="bg-secondary-300 text-secondary-400 relative grid grid-cols-2 gap-x-16 px-6 py-10 md:px-16 md:py-14 lg:gap-x-20 lg:px-56 lg:py-20">
      <BackgroundLines />

      <LeftColumn />
      <RightColumn />
    </div>
  );
}

function BackgroundLines() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[url('/images/line.webp')] bg-[length:200%] bg-center bg-no-repeat sm:bg-[length:180%] md:bg-[length:140%] lg:bg-contain" />
  );
}

function LeftColumn() {
  return (
    <div className="z-30 -ml-4 grid grid-rows-2 lg:-ml-20">
      <div /> {/* empty top space */}
      <div className="flex flex-col items-start">
        <CodePrevious />
        <MemberTags />
      </div>
    </div>
  );
}

function CodePrevious() {
  return (
    <div className="flex -skew-3 items-center gap-x-6">
      <ShadowedText className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
        {Brand.name}
      </ShadowedText>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
        PREVIOUS
      </p>
    </div>
  );
}

function MemberTags() {
  return (
    <div className="flex -skew-3 items-center gap-x-6">
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
        MEMBER
      </p>
      <div className="flex flex-col leading-none sm:text-base md:text-lg lg:text-2xl xl:text-4xl">
        <p className="text-primary-500 [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1px] text-shadow-[1.5px_1.5px_0_#FEB863]">
          {Brand.tagline}
        </p>
        <p className="text-primary-500 [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1px] text-shadow-[1.5px_1.5px_0_#FEB863]">
          {Brand.tagline}
        </p>
      </div>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="z-30 ml-4 grid w-full sm:ml-6 md:ml-8 lg:ml-20">
      <div className="flex flex-col justify-start px-6 sm:px-8">
        <p className="-skew-3 text-left text-sm leading-tight font-bold tracking-tight sm:text-xl sm:leading-tight md:text-3xl md:leading-snug lg:text-5xl lg:leading-none xl:text-7xl">
          <span className="block">CHECKOUT OUR</span>
          <span className="block">PAST TEAM</span>
        </p>

        <Link
          href={ROUTES.OUR_PAST}
          className="bg-primary-500 hover:text-secondary-300 mt-6 self-end border px-3 py-2 text-base font-bold shadow-[0_3px_5px_#000] transition-colors duration-300 hover:bg-white sm:text-lg md:px-6 md:py-3 md:text-xl lg:px-5 lg:py-3 lg:text-2xl"
        >
          LIHAT DI SINI
        </Link>
      </div>
      <div />
    </div>
  );
}
