import Footer from '../components/sections/Footer/Footer';
import Navbar from '../components/sections/Navigation/Navbar';
import Carousel from '../components/ui/Carousel';
import ShadowedText from '../components/ui/ShadowedText';
import { SocialMediaLink } from '../components/ui/SocialMediaLink';
import Wrapper from '../components/ui/Wrapper';
import Image from 'next/image';

export default function OurPastPage() {
  const socialMediaData = [
    {
      platform: 'instagram' as const,
      href: 'https://instagram.com/the.code124',
    },
    {
      platform: 'whatsapp' as const,
      href: 'https://wa.me/6285777700124',
    },
    {
      platform: 'email' as const,
      href: 'mailto:ksm.code124@gmail.com',
    },
    {
      platform: 'linkedin' as const,
      href: 'https://linkedin.com/in/code124',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        {/* Slicing untuk Section dan Carousel */}
        {/* Section */}
        <div className="flex h-[80vh] w-full flex-col items-start justify-center gap-6 bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-center px-6 text-white lg:items-center">
          <h1 className="text-secondary-400 -rotate-3 text-right text-6xl md:text-7xl lg:text-[10rem]">
            MEET OUR GREAT!
            <br />
            DEVELOPERS
          </h1>
          <div className="justify-cente flex max-w-full flex-col items-start justify-start lg:w-full lg:flex-row lg:justify-between">
            <div className="mx-auto max-w-5xl space-y-5">
              <ShadowedText className="-rotate-3 text-5xl lg:text-9xl">
                Code124
              </ShadowedText>
              <h3 className="h-12 -rotate-3 text-3xl text-[#e6e6e6] lg:text-7xl">
                #TheFirstCommit
              </h3>
            </div>
            <div className="mt-3 flex flex-col gap-y-8 lg:w-5xl">
              <Image
                src="/assets/images/retro_pixel.webp"
                alt=""
                width={320}
                height={42}
                className="hidden -rotate-3 lg:block"
              />
              <div className="border-primary-500 flex max-w-xs -rotate-3 justify-center gap-x-4 border-t-2 pt-5">
                {socialMediaData.map((social) => (
                  <SocialMediaLink
                    key={social.platform}
                    platform={social.platform}
                    href={social.href}
                    iconClassName="h-12 w-12 text-2xl bg-primary-600 text-black shadow-[4px_4px_0px_#393C45]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Wrapper>
          <div className="flex w-full flex-col items-center">
            <h3 className="text-primary-500 mb-6 -rotate-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px]">
              UI/UX Designer
            </h3>
          </div>
          <Carousel />
        </Wrapper>
      </main>

      <Footer />
    </>
  );
}
