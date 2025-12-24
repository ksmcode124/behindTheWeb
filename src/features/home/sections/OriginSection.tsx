import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import VisiMisiCardContainer from '@/features/home/components/VisiMisiCards';
import CodeLens, { CodeLensSkeleton } from '@/components/common/CodeLens';
import TexturedSection from '@/components/ui/TexturedSection';
import { ActivityProps, TEXTURES } from '@/lib/constants';
import { CodeLensImages } from '@/lib/data';
import Content from '../data/home-content.json';

export default async function OriginSection() {
  const activities: ActivityProps[] = CodeLensImages[0]?.activities || [];
  return (
    <>
      <OriginIntro />
      <OriginBlock activities={activities} />
      <TexturedSection texture={TEXTURES.TEXTURE3}>
        <AccordionSection />
      </TexturedSection>
    </>
  );
}

function OriginIntro() {
  return (
    <div className="relative top-[-4vh] flex w-full items-center justify-between lg:top-[-8vh]">
      <Image
        src="/images/first_commit.webp"
        alt="The First Commit"
        width={300}
        height={200}
        className="h-[7vh] w-[55vw] sm:h-[8vh] sm:w-[50vw] lg:h-[15vh] lg:w-[40vw]"
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

function OriginImage() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center bg-[url('/images/origin_img_bg.webp')] bg-contain bg-center bg-no-repeat p-1.5 sm:p-3 md:max-w-xl md:p-6 lg:max-w-2xl">
      <Image
        src="/images/origin_first_commit.webp"
        alt="The Developers"
        fill
        className="scale-x-[0.86] scale-y-[0.9] object-contain"
        priority
      />
    </div>
  );
}

function OriginBlock({ activities }: { activities?: ActivityProps[] }) {
  if (!activities) {
    return <CodeLensSkeleton />;
  }

  return (
    <TexturedSection texture={TEXTURES.TEXTURE4}>
      <OriginStory />
      <CodeLens data={activities} />
    </TexturedSection>
  );
}

function OriginContent() {
  return (
    <div className="flex max-w-2xl flex-col justify-start space-y-6 text-white sm:space-y-8">
      <ShadowedText
        as="h2"
        className="-skew-3 text-3xl uppercase sm:text-5xl md:text-7xl lg:text-8xl"
      >
        {Content.origin.headline}
      </ShadowedText>

      <div className="text-secondary-400 space-y-5 text-xs leading-relaxed sm:text-base md:text-xl">
        {Content.origin.paragraphs.map((paragraph, index) => (
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
        className="h-[3vh] w-[32vw] sm:h-[4vh] sm:w-[38vw] lg:h-[10vh] lg:w-[25vw]"
      />
    </div>
  );
}

function OriginStory() {
  return (
    <section className="flex min-h-screen w-full flex-col gap-8 px-6 sm:gap-10 sm:py-8 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-12">
      <OriginImage />
      <OriginContent />
      <DecorativeLine />

      <h2 className="text-secondary-400 col-span-full mt-6 text-right text-2xl uppercase sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {Content.origin.subHeadline}
      </h2>
    </section>
  );
}

function AccordionHeader() {
  return (
    <div className="relative top-[clamp(1.75rem,4vw,3.75rem)] z-2 flex w-full justify-between">
      <ShadowedText
        className="pl-15 text-5xl sm:text-6xl lg:text-9xl"
        textShadow="6px 6px 0 #5EAA9E"
      >
        {Content.origin.decorativeText}
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

function AccordionSection() {
  return (
    <>
      <AccordionHeader />
      <section className="flex w-full items-center justify-center overflow-hidden px-[min(11vw,4rem)] py-[11vw] lg:mb-10">
        <div className="relative flex h-full w-full items-center justify-center bg-[url('/images/hero_bg.webp')] bg-cover bg-center p-[4vw] shadow-[0_0_0_4vw_var(--color-primary-200),0_0_0_8vw_#FEB863,0_0_0_12vw_#F2D3A5]">
          <div className="relative w-full max-w-[800px]">
            <VisiMisiCardContainer />

            {/* BOTTOM-LEFT BARS */}
          </div>
          <div className="absolute bottom-[-4vw] left-2 flex h-40 items-end gap-2 sm:gap-4 md:left-5 md:gap-5 lg:gap-6">
            <div className="bg-primary-500 h-[35%] w-4 rounded-md sm:w-6 md:h-[60%] lg:h-[120%] lg:w-16" />
            <div className="bg-primary-300 h-[25%] w-4 rounded-md sm:w-6 md:h-[45%] lg:h-[95%] lg:w-16" />
            <div className="bg-primary-200 h-[15%] w-4 rounded-md sm:w-6 md:h-[25%] lg:h-[75%] lg:w-16" />
          </div>

          {/* BOTTOM-RIGHT BARS (REVERSED) */}
          <div className="absolute right-2 bottom-[-4vw] flex h-40 items-end gap-2 sm:gap-4 md:right-5 md:gap-5 lg:gap-6">
            <div className="bg-primary-200 h-[15%] w-4 rounded-md sm:w-6 md:h-[25%] lg:h-[75%] lg:w-16" />
            <div className="bg-primary-300 h-[25%] w-4 rounded-md sm:w-6 md:h-[45%] lg:h-[95%] lg:w-16" />
            <div className="bg-primary-500 h-[35%] w-4 rounded-md sm:w-6 md:h-[60%] lg:h-[120%] lg:w-16" />
          </div>
        </div>
      </section>
    </>
  );
}
