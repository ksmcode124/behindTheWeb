import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import AccordionParent from './Accordion';
import InfiniteCarousel from './InfiniteCarousel';

export default function Origin() {
  return (
    <>
      {/* ORIGIN INTRO */}
      <section className="flex min-h-screen w-full flex-col gap-10 px-6 py-12 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Image block */}
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center bg-[url('/assets/images/origin_img_bg.webp')] bg-contain bg-center bg-no-repeat p-5">
          <Image
            src="/assets/images/logo_white.png"
            width={200}
            height={150}
            className="rounded-md"
            alt="The Developers"
          />
        </div>

        {/* Text block */}
        <div className="text-secondary-400 flex max-w-2xl flex-col justify-start space-y-8">
          <ShadowedText as="h2" className="-rotate-3 text-6xl">
            THE ORIGIN
          </ShadowedText>

          <div className="space-y-6 text-lg leading-relaxed">
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

        {/* Section subtitle */}
        <h2 className="text-secondary-400 col-span-full mt-6 text-right text-3xl">
          THROUGH THE LENS OF US...
        </h2>
      </section>

      {/* CAROUSEL SECTION */}
      <section className="mb-[5vh] flex h-96 w-full items-center justify-center">
        <InfiniteCarousel
          images={[
            { src: '/assets/images/logo_white.png' },
            { src: '/assets/images/logo_white.png' },
            { src: '/assets/images/logo_white.png' },
          ]}
          speed={50} // adjust speed
          direction="left" // or "right"
        />
      </section>

      {/* ACCORDION SECTION */}
      <section className="flex h-screen w-full items-center justify-center px-[11vw] py-[11vw]">
        <div className="flex h-full w-full items-center justify-center bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center p-[4vw] shadow-[0_0_0_4vw_#5EAA9E,0_0_0_8vw_#FEB863,0_0_0_12vw_#F2D3A5]">
          {' '}
          {/* <-- Add padding here */}
          <div className="w-full max-w-[800px]">
            <AccordionParent />
          </div>
        </div>
      </section>
    </>
  );
}
