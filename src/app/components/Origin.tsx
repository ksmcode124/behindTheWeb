import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import AccordionParent from './Accordion';
import InfiniteCarousel from './InfiniteCarousel';

export default function Origin() {
  return (
    <>
      {/* ORIGIN INTRO */}
      <div className="relative top-[-5vh] flex w-full items-center justify-between lg:top-[-10vh]">
        <Image
          src="/assets/images/first_commit.webp"
          alt="The First Commit"
          width={300}
          height={200}
          className="lg:w-[40vw} h-[10vh] w-[60vw] lg:h-[20vh]"
        />
        <Image
          src="/assets/images/line_brow_white.webp"
          alt="The First Commit"
          width={200}
          height={100}
          className="lg:w-[20vw} h-[5vh] w-[25vw] lg:h-[10vh]"
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
            className="max-h-[55%] max-w-[95%] border-5 border-black object-contain"
          />
        </div>

        {/* Text block */}
        <div className="flex max-w-2xl flex-col justify-start space-y-8 text-white">
          <ShadowedText as="h2" className="-rotate-3 text-6xl">
            THE ORIGIN
          </ShadowedText>

          <div className="text-secondary-400space-y-6 text-lg leading-relaxed">
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
      <section className="mb-[5vh] flex h-96 w-full flex-col space-y-5 bg-[#27292D] shadow-[0_0_50px_rgb(0,0,0,0.8)]">
        <div className="flex w-full items-center justify-center gap-x-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`bg-secondary-400 h-8 w-8 rounded-sm`} />
          ))}
        </div>
        <InfiniteCarousel
          images={[
            { src: '/assets/images/logo_white.png' },
            { src: '/assets/images/logo_white.png' },
            { src: '/assets/images/logo_white.png' },
          ]}
          speed={50} // adjust speed
          direction="left" // or "right"
        />
        <div className="flex w-full items-center justify-center gap-x-10">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className={`bg-secondary-400 h-8 w-8 rounded-sm`} />
          ))}
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="flex h-screen w-full items-center justify-center px-[11vw] py-[11vw]">
        <div className="flex h-full w-full items-center justify-center bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center p-[4vw] shadow-[0_0_0_4vw_#5EAA9E,0_0_0_8vw_#FEB863,0_0_0_12vw_#F2D3A5]">
          {/* <-- Add padding here */}
          <div className="w-full max-w-[800px]">
            <AccordionParent />
          </div>
        </div>
      </section>
    </>
  );
}
