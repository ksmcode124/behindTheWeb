import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import AccordionParent from './Accordion';
import InfiniteCarousel, {
  ScrollingBoxes,
} from '../../components/common/InfiniteCarousel';
import { Divisi, KepengurusanResponse } from '@/lib/btw/interfaces/btw';
import { apiGet } from '@/lib/btw/api';

const ORIGIN_DESCRIPTION = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio facilis, est adipisci expedita recusandae architecto facere aut eligendi non consectetur nulla tempore inventore, aperiam fugiat vitae? Magni aliquid ut assumenda?',
  'Nam laudantium placeat soluta obcaecati at sed, consequatur repellat velit optio a. Ad repudiandae eaque iure similique, praesentium fugit aperiam alias et blanditiis commodi officia placeat ex distinctio vitae labore.',
  'Aliquam voluptate unde nemo sed rerum expedita dignissimos architecto, incidunt iste perspiciatis illum ex eius distinctio, commodi at tempore magnam explicabo?',
];

export default async function Origin() {
  const res = await apiGet<KepengurusanResponse>('/api/display/btw');
  const data = res.data;

  return (
    <>
      <OriginIntro />
      <OriginStory />
      <DivisionCarousel divisions={data.divisi} />
      <AccordionSection />
    </>
  );
}

function OriginIntro() {
  return (
    <div className="relative top-[-5vh] flex w-full items-center justify-between lg:top-[-8vh]">
      <Image
        src="/images/first_commit.webp"
        alt="The First Commit"
        width={300}
        height={200}
        className="h-[10vh] w-[60vw] lg:h-[15vh] lg:w-[40vw]"
      />
      <Image
        src="/images/line_brow_white.webp"
        alt="Decorative line"
        width={200}
        height={100}
        className="lg:w-[15vw} h-[3vh] w-[25vw] lg:h-[5vh]"
      />
    </div>
  );
}

// ==================== ORIGIN STORY SECTION ====================

function OriginImage() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center bg-[url('/images/origin_img_bg.webp')] bg-contain bg-center bg-no-repeat p-5">
      <Image
        src="/images/origin_first_commit.webp"
        width={350}
        height={320}
        alt="The Developers"
        className="max-h-[55%] max-w-[95%] object-contain"
      />
    </div>
  );
}

function OriginContent() {
  return (
    <div className="flex max-w-2xl flex-col justify-start space-y-8 text-white">
      <ShadowedText as="h2" className="-skew-3 text-8xl">
        THE ORIGIN
      </ShadowedText>

      <div className="text-secondary-400 space-y-6 text-xl leading-relaxed">
        {ORIGIN_DESCRIPTION.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function DecorativeLine() {
  return (
    <div className="relative left-[-5vw] flex w-full">
      <Image
        src="/images/line_brow_black2.webp"
        alt="Decorative line"
        width={300}
        height={200}
        className="h-[5vh] w-[40vw] lg:h-[10vh] lg:w-[25vw]"
      />
    </div>
  );
}

function OriginStory() {
  return (
    <section className="flex min-h-screen w-full flex-col gap-10 px-6 py-12 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-12">
      <OriginImage />
      <OriginContent />
      <DecorativeLine />

      <h2 className="text-secondary-400 col-span-full mt-6 text-right text-4xl lg:text-6xl">
        THROUGH THE LENS OF US...
      </h2>
    </section>
  );
}

function DivisionCarousel({ divisions }: { divisions: Divisi[] }) {
  const carouselImages = divisions.map((division) => ({
    src: division.foto_divisi ?? '/images/origin_first_commit.webp',
  }));

  return (
    <section className="bg-secondary-300 mb-[5vh] flex w-full flex-col gap-6 px-4 py-6">
      <ScrollingBoxes speed={45} />
      <InfiniteCarousel images={carouselImages} speed={45} />
      <ScrollingBoxes speed={45} />
    </section>
  );
}

function AccordionHeader() {
  return (
    <div className="relative top-11 z-2 flex w-full justify-between lg:top-15">
      <ShadowedText
        className="pl-15 text-7xl lg:text-9xl"
        textShadow="6px 6px 0 var(--color-primary-300)"
      >
        124
      </ShadowedText>
      <Image
        src="/images/pixel_border.webp"
        alt="Decorative border"
        width={200}
        height={100}
        className="h-[4vh] w-[60vw] lg:h-[8vh] lg:w-[40vw]"
      />
    </div>
  );
}

interface DecorativeBarsProps {
  position: 'left' | 'right';
}

function DecorativeBars({ position }: DecorativeBarsProps) {
  const bars =
    position === 'left'
      ? [
          { height: '60%', lgHeight: '120%', color: 'bg-primary-500' },
          { height: '45%', lgHeight: '95%', color: 'bg-primary-300' },
          { height: '25%', lgHeight: '75%', color: 'bg-primary-200' },
        ]
      : [
          { height: '25%', lgHeight: '75%', color: 'bg-primary-200' },
          { height: '45%', lgHeight: '95%', color: 'bg-primary-300' },
          { height: '60%', lgHeight: '120%', color: 'bg-primary-500' },
        ];

  return (
    <div
      className={`absolute bottom-[-4vw] ${position}-5 flex h-40 items-end gap-3`}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`${bar.color} w-8 rounded-md lg:w-16 lg:h-[${bar.lgHeight}] h-[${bar.height}]`}
        />
      ))}
    </div>
  );
}

function AccordionSection() {
  return (
    <>
      <AccordionHeader />
      <section className="flex w-full items-center justify-center px-[11vw] py-[11vw] lg:mb-10">
        <div className="relative flex h-full w-full items-center justify-center bg-[url('/images/hero_bg.webp')] bg-cover bg-center p-[4vw] shadow-[0_0_0_4vw_var(--color-primary-200),0_0_0_8vw_var(--color-primary-500),0_0_0_12vw_var(--color-primary-400)]">
          <div className="relative w-full max-w-[800px]">
            <AccordionParent />
          </div>

          <DecorativeBars position="left" />
          <DecorativeBars position="right" />
        </div>
      </section>
    </>
  );
}
