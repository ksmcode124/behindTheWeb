import Link from 'next/link';
import Image from 'next/image';
import { FlipCard } from '../../components/ui/FlipCard';
import Wrapper from '../../components/ui/Wrapper';
import { DEVELOPERS, BOARD } from './data/team';

export default function Team() {
  return (
    <>
      <section className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6 text-white">
        <h2 className="border-b-secondary border-b-2 pb-5 text-5xl">
          MEET OUR TEAM
        </h2>

        <p className="lg:hidden">Click the photo for details</p>

        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
          {BOARD.map(({ nama, image, ig, linkedIn, role }) => (
            <div key={nama} className="flex flex-col items-center gap-4">
              <FlipCard
                key={nama}
                size={1}
                imageSrc={image}
                ig={ig}
                linkedIn={linkedIn}
              />

              <p className="border-b-secondary w-full border-b-2 text-center text-3xl">
                {nama}
              </p>
              <p className="text-center text-xl">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <Wrapper className="flex flex-col gap-24 py-20">
        {DEVELOPERS.map(({ id, nama, caption, image }) => (
          <div key={id} className="flex w-full flex-col items-center">
            {/* TITLE */}
            <h3 className="text-primary-500 mb-10 -rotate-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px]">
              {nama}
            </h3>

            {/* CARD */}
            <div className="border-secondary-300 relative w-full max-w-4xl overflow-hidden border-[1.25em]">
              <div className="relative h-[430px] w-full">
                <Image src={image} alt={nama} fill className="object-cover" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3">
                <p className="max-w-[70%] p-4 text-sm text-white">{caption}</p>

                <Link
                  href="/"
                  className="border-secondary-300 bg-primary-600 pointer-events-auto relative border-[0.4em] px-4 py-1 text-center text-2xl font-bold transition-colors duration-300 hover:bg-white"
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
