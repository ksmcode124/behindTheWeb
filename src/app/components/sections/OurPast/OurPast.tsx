import Link from 'next/link';
import ShadowedText from '../../ui/ShadowedText';

export default function OurPast() {
  return (
    <div className="bg-secondary-300 text-secondary-400 grid w-screen grid-cols-[3fr_1fr] gap-x-16 px-16 py-8 lg:px-24 lg:py-12">
      {/* Left column */}
      <div className="flex flex-col gap-4 self-start">
        <div className="flex -rotate-3 gap-x-10">
          <ShadowedText className="text-5xl lg:text-8xl">CODE124</ShadowedText>
          <p className="text-4xl lg:text-7xl">PREVIOUS</p>
        </div>
        <div className="flex -rotate-3 items-center gap-x-12">
          <p className="text-4xl lg:text-7xl">MEMBER</p>
          <div className="flex flex-col text-lg lg:text-4xl">
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
      <div className="flex flex-col self-end">
        <p className="flex -rotate-3 flex-col text-left text-3xl lg:text-6xl">
          <span>CHECKOUT OUR</span>
          <span>PAST TEAMS</span>
        </p>
        <Link
          href="/"
          className="bg-primary-500 hover:text-secondary-300 mt-4 self-end border px-6 py-3 text-center text-2xl font-bold shadow-[0_3px_5px_#000] transition-colors duration-300 hover:bg-white"
        >
          LIHAT DI SINI
        </Link>
      </div>
    </div>
  );
}
