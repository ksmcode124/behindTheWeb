import Image from 'next/image';
import ShadowedText from '../../ui/ShadowedText';

export default function Origin() {
  return (
    <>
      <div className="flex h-screen w-full flex-col gap-6 px-6 lg:grid lg:h-screen lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex justify-center">
          <Image
            src="/assets/images/logo_white.png"
            width={400}
            height={300}
            className="rounded-md"
            alt="The Developers"
          />
        </div>

        <div className="flex max-w-2xl flex-none flex-col justify-start text-white">
          <div className="space-y-8 lg:space-y-10">
            <ShadowedText as="h2" className="text-6xl">
              THE ORIGIN
            </ShadowedText>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              facilis, est adipisci expedita recusandae architecto facere aut
              eligendi non consectetur nulla tempore inventore, aperiam fugiat
              vitae? Magni aliquid ut assumenda? Nam laudantium placeat soluta
              obcaecati at sed, consequatur repellat velit optio a. Ad
              repudiandae eaque iure similique, praesentium fugit aperiam alias
              et blanditiis commodi officia placeat ex distinctio vitae labore.
              Aliquam voluptate unde nemo sed rerum expedita dignissimos
              architecto, incidunt iste perspiciatis illum ex eius distinctio,
              commodi at tempore magnam explicabo? Rerum, dolorum? Vel provident
              porro voluptatum adipisci sunt sapiente? Delectus vero ullam, id
              earum nostrum corrupti? Iure reiciendis facere placeat, quasi
              magnam a saepe soluta corrupti nobis excepturi repellat, tenetur
              libero. Natus nostrum ducimus saepe quam sint! Enim, eaque! Culpa
              deserunt illo eius perferendis quas laudantium modi vero doloribus
              ipsa hic blanditiis quis alias expedita, quia ab doloremque nihil,
              quidem necessitatibus pariatur. Harum itaque dignissimos
              praesentium nobis, rerum eos.
            </p>
          </div>
        </div>

        <h2 className="text-secondary-400 w-full text-right text-3xl lg:col-span-2">
          THROUGH THE LENS OF US...
        </h2>
      </div>

      <div className="bg-primary-300 flex h-96 w-screen items-center justify-center text-center text-9xl">
        Sliding Carousel
      </div>

      <div className="flex h-screen w-screen items-center justify-center px-[15vw] py-[15vw]">
        <div className="pointer-events-none h-full w-full bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center shadow-[0_0_0_5vw_#5EAA9E,0_0_0_10vw_#FEB863,0_0_0_15vw_#F2D3A5]"></div>
      </div>
    </>
  );
}
