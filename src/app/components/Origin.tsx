import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import AccordionParent from './Accordion';
import InfiniteCarousel, { ScrollingBoxes } from './InfiniteCarousel';

export default function Origin() {
  return (
    <>
      {/* ORIGIN INTRO */}
      <div className="relative top-[-5vh] flex w-full items-center justify-between lg:top-[-8vh]">
        <Image
          src="/assets/images/first_commit.webp"
          alt="The First Commit"
          width={300}
          height={200}
          className="h-[10vh] w-[60vw] lg:h-[15vh] lg:w-[40vw]"
        />
        <Image
          src="/assets/images/line_brow_white.webp"
          alt="The First Commit"
          width={200}
          height={100}
          className="lg:w-[15vw} h-[3vh] w-[25vw] lg:h-[5vh]"
        />
      </div>

      <section className="flex min-h-screen w-full flex-col gap-10 px-6 py-12 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Image block */}
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center bg-[url('/assets/images/origin_img_bg.webp')] bg-contain bg-center bg-no-repeat p-5">
          <Image
            src="/assets/images/logo_black.webp"
            width={350}
            height={320}
            alt="The Developers"
            className="max-h-[55%] max-w-[95%] object-contain"
          />
        </div>

        {/* Text block */}
        <div className="flex max-w-2xl flex-col justify-start space-y-8 text-white">
          <ShadowedText as="h2" className="-skew-3 text-8xl">
            THE ORIGIN
          </ShadowedText>

          <div className="text-secondary-400space-y-6 text-xl leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              facilis, est adipisci expedita recusandae architecto facere aut
              eligendi non consectetur nulla tempore inventore, aperiam fugiat
              vitae? Magni aliquid ut assumenda?
            </p>
            <p>
              Nam laudantium placeat soluta obcaecati at sed, consequatur
              repellat velit optio a. Ad repudiandae eaque iure similique,
              praesentium fugit aperiam alias et blanditiis commodi officia
              placeat ex distinctio vitae labore.
            </p>
            <p>
              Aliquam voluptate unde nemo sed rerum expedita dignissimos
              architecto, incidunt iste perspiciatis illum ex eius distinctio,
              commodi at tempore magnam explicabo?
            </p>
          </div>
        </div>
        <div className="relative left-[-5vw] flex w-full">
          <Image
            src="/assets/images/line_brow_black2.webp"
            alt="Decorative line"
            width={300}
            height={200}
            className="h-[5vh] w-[40vw] lg:h-[10vh] lg:w-[25vw]"
          />
        </div>
        {/* Section subtitle */}
        <h2 className="text-secondary-400 col-span-full mt-6 text-right text-4xl lg:text-5xl">
          THROUGH THE LENS OF US...
        </h2>
      </section>

      {/* CAROUSEL SECTION */}
      <section className="mb-[5vh] flex w-full flex-col gap-6 bg-[#27292D] px-4 py-6">
        <ScrollingBoxes speed={45} />
        <InfiniteCarousel
          images={[
            { src: '/assets/images/logo_white.png' },
            { src: '/assets/images/logo_black.png' },
            { src: '/assets/images/first_commit.webp' },
          ]}
          speed={45}
        />
        <ScrollingBoxes speed={45} />
      </section>

      {/* ACCORDION SECTION */}
      <div className="relative top-11 z-2 flex w-full justify-between lg:top-16">
        <ShadowedText
          className="pl-15 text-7xl lg:text-9xl"
          textShadow="6px 6px 0 #5EAA9E"
        >
          124
        </ShadowedText>
        <Image
          src="/assets/images/pixel_border.webp"
          alt="The First Commit"
          width={200}
          height={100}
          className="h-[4vh] w-[60vw] lg:h-[8vh] lg:w-[40vw]"
        />
      </div>
      <section className="flex w-full items-center justify-center px-[11vw] py-[11vw] lg:mb-10">
        <div className="relative flex h-full w-full items-center justify-center bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center p-[4vw] shadow-[0_0_0_4vw_var(--color-primary-200),0_0_0_8vw_#FEB863,0_0_0_12vw_#F2D3A5]">
          <div className="relative w-full max-w-[800px]">
            <AccordionParent />

            {/* BOTTOM-LEFT BARS */}
          </div>
          <div className="absolute bottom-[-4vw] left-5 flex h-40 items-end gap-3">
            <div className="bg-primary-500 h-[60%] w-8 rounded-md lg:h-[120%] lg:w-16" />
            <div className="bg-primary-300 h-[45%] w-8 rounded-md lg:h-[95%] lg:w-16" />
            <div className="bg-primary-200 h-[25%] w-8 rounded-md lg:h-[75%] lg:w-16" />
          </div>

          {/* BOTTOM-RIGHT BARS (REVERSED) */}
          <div className="absolute right-5 bottom-[-4vw] flex h-40 items-end gap-3">
            <div className="bg-primary-200 h-[25%] w-8 rounded-md lg:h-[75%] lg:w-16" />
            <div className="bg-primary-300 h-[45%] w-8 rounded-md lg:h-[95%] lg:w-16" />
            <div className="bg-primary-500 h-[60%] w-8 rounded-md lg:h-[120%] lg:w-16" />
          </div>
        </div>
      </section>
    </>
  );
}
