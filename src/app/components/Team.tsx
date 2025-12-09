import Link from 'next/link';
import Image from 'next/image';
import { FlipCard } from '../../components/ui/FlipCard';
import Wrapper from '../../components/ui/Wrapper';
import { DEVELOPERS, BOARD } from './data/team';
import Inti from '@/components/ui/Inti';

export default function Team() {
  return (
    <>
      <section className="text-secondary-400 relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6">
        {/* Title with small line accents */}
        <div className="relative w-fit">
          <h2 className="border-secondary border-b-2 px-5 pb-5 text-center text-5xl">
            MEET OUR TEAM
          </h2>

          <Image
            src="/assets/images/line_brow_black.webp"
            alt=""
            width={200}
            height={200}
            className="absolute bottom-0 left-0 h-8 w-20 translate-y-[50%] object-contain"
          />
          <Image
            src="/assets/images/line_brow_black.webp"
            alt=""
            width={200}
            height={200}
            className="absolute right-0 bottom-0 h-8 w-20 translate-y-[50%] scale-x-[-1] object-contain"
          />
        </div>

        {/* Full-section decorative text */}
        <div className="pointer-events-none absolute inset-7">
          {/* Desktop: left/right at edges, Mobile: top/bottom */}
          <div className="hidden md:block">
            {/* RIGHT — top of section */}
            <div className="absolute top-55 -right-28 rotate-90">
              <p
                className="text-7xl leading-none whitespace-nowrap text-transparent"
                style={{ WebkitTextStroke: '2px var(--color-primary-400)' }}
              >
                THE FIRST COMMIT
              </p>
            </div>

            {/* LEFT — bottom of section */}
            <div className="absolute bottom-55 -left-28 -rotate-90">
              <p
                className="text-7xl leading-none whitespace-nowrap text-transparent"
                style={{ WebkitTextStroke: '2px var(--color-primary-400)' }}
              >
                THE FIRST COMMIT
              </p>
            </div>
          </div>

          {/* Mobile: top/bottom centered */}
          <div className="flex h-full w-full flex-col justify-between md:hidden">
            <div className="flex justify-center">
              <p
                className="text-5xl text-transparent"
                style={{ WebkitTextStroke: '2px var(--color-primary-400)' }}
              >
                THE FIRST COMMIT
              </p>
            </div>
            <div className="flex justify-center">
              <p
                className="text-5xl text-transparent"
                style={{ WebkitTextStroke: '2px var(--color-primary-400)' }}
              >
                THE FIRST COMMIT
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
          <Inti />
        </div>
      </section>

      <Wrapper className="flex flex-col gap-24 py-20">
        {DEVELOPERS.map(({ id, nama, caption, image }) => (
          <div key={id} className="flex w-full flex-col items-center">
            {/* TITLE */}
            <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)]">
              {nama}
            </h3>

            {/* CARD */}
            <div className="border-secondary-300 relative w-full max-w-4xl overflow-hidden border-[1.25em]">
              <div className="absolute top-[37%] -right-30 z-1 rotate-90 lg:-right-40">
                <p
                  className="text-secondary-400 text-5xl leading-none whitespace-nowrap lg:text-6xl"
                  style={{
                    WebkitTextStroke: '2px var(--color-secondary-300)',
                  }}
                >
                  THE FIRST COMMIT
                </p>
              </div>

              <div className="relative h-[430px] w-full">
                <Image src={image} alt={nama} fill className="object-cover" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3">
                <p className="text-secondary-400 max-w-[70%] p-4 text-sm">
                  {caption}
                </p>

                <Link
                  href="/"
                  className="border-secondary-300 hover:text-secondary-300 bg-primary-600 text-secondary-400 hover:bg-secondary-400 pointer-events-auto relative border-[0.4em] px-4 py-1 text-center text-2xl font-bold transition-colors duration-300"
                >
                  SELENGKAPNYA
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    </>
  );
}
