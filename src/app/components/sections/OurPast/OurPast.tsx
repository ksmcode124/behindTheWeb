import Link from 'next/link';
import ShadowedText from '../../ui/ShadowedText';

export default function OurPast() {
  return (
    <div className="bg-secondary-300 text-secondary-400 relative grid h-auto grid-cols-[2fr_1fr] gap-x-16 overflow-hidden px-6 py-6 md:h-[45vh] md:px-16 md:py-8 lg:grid-cols-[5fr_2fr] lg:px-56 lg:py-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 my-5 bg-[url('/assets/images/line.webp')] bg-contain bg-center bg-no-repeat" />

      {/* Left column */}
      <div className="relative z-10 flex flex-col gap-4 self-end">
        <div className="flex -rotate-3 gap-x-6 md:gap-x-10">
          <ShadowedText className="text-4xl md:text-5xl lg:text-8xl">
            CODE124
          </ShadowedText>
          <p className="text-3xl md:text-4xl lg:text-7xl">PREVIOUS</p>
        </div>
        <div className="flex -rotate-3 items-center gap-x-8 pl-5 md:gap-x-25 md:pl-10">
          <p className="text-3xl md:text-4xl lg:text-7xl">MEMBER</p>
          <div className="flex flex-col text-sm md:text-lg lg:text-4xl">
            <p className="text-primary-500 [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1px] text-shadow-[1.5px_1.5px_0_#FEB863]">
              #TheFirstCommit
            </p>
            <p className="text-primary-500 [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1px] text-shadow-[1.5px_1.5px_0_#FEB863]">
              #TheFirstCommit
            </p>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="relative z-10 flex w-full flex-col">
        <p className="flex -rotate-3 flex-col text-left text-xl md:text-3xl lg:text-6xl">
          <span>CHECKOUT OUR</span>
          <span>PAST TEAMS</span>
        </p>
        <Link
          href="/"
          className="bg-primary-500 hover:text-secondary-300 mt-4 self-end border px-2 py-1 text-center text-xl font-bold shadow-[0_3px_5px_#000] transition-colors duration-300 hover:bg-white md:px-6 md:py-3 md:text-2xl lg:px-4 lg:py-2"
        >
          LIHAT DI SINI
        </Link>
      </div>
    </div>
  );
}
