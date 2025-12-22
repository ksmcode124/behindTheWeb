import Image from 'next/image';
import Wrapper from '@/components/common/Wrapper';
import IntiList from '../components/IntiList';
import { Divisi } from '@/lib/btw/interfaces/btw';
import { isInti } from '@/lib/utils';
import DecorativeText from '../components/DecorativeText';
import DivisionCardItem from '../components/DivisionCardItem';
import TexturedSection from '@/components/ui/TexturedSection';
import { TEXTURES } from '@/lib/constants';
import Copy from '../data/home.copy.json';

export default async function DivisionsSection({
  divisi,
  kepengurusan,
}: {
  divisi: Divisi[];
  kepengurusan: string;
}) {
  return (
    <>
      <TexturedSection texture={TEXTURES.TEXTURE4}>
        <section className="text-secondary-400 relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6 py-15 lg:py-0">
          {/* Title with small line accents */}
          <div className="relative w-fit">
            <h2 className="border-secondary border-b-2 px-5 pb-5 text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              {Copy.division.headline}
            </h2>

            <Image
              src="/images/line_brow_black.webp"
              alt=""
              width={200}
              height={200}
              className="absolute bottom-0 left-0 h-8 w-20 translate-y-[50%] object-cover object-right"
            />
            <Image
              src="/images/line_brow_black.webp"
              alt=""
              width={200}
              height={200}
              className="absolute right-0 bottom-0 h-8 w-20 translate-y-[50%] scale-x-[-1] object-cover object-right"
            />
          </div>
          <p className="text-secondary-400 text-base sm:text-lg md:text-xl lg:hidden">
            {Copy.division.cta.flipCard}
          </p>
          {/* Content */}
          <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
            <IntiList divisi={divisi.find((d) => isInti(d))} />
          </div>
          <DecorativeText text={kepengurusan} />
        </section>
      </TexturedSection>

      <Wrapper className="mt-10 flex flex-col gap-24 py-20">
        {divisi
          .filter((d) => !isInti(d))
          .map((divisi, index) => (
            <DivisionCardItem
              divisi={divisi}
              kepengurusan={kepengurusan}
              key={index}
            />
          ))}
      </Wrapper>
    </>
  );
}
