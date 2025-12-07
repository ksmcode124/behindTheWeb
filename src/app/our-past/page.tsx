import Image from 'next/image';

import Navbar from '../components/sections/Navigation/Navbar';
import Footer from '../components/sections/Footer/Footer';
import OurPast from '../components/sections/OurPast/OurPast';

import Wrapper from '../components/ui/Wrapper';
import Carousel from '../components/ui/Carousel';
import ShadowedText from '../components/ui/ShadowedText';
import { SocialMediaLink } from '../components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '../components/data/socialMedia';
import { TEAM } from '../components/data/team';

export default function TheTeam() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-10 px-6 text-white">
          {/* Background */}
          <div
            className="absolute inset-0 bg-[url('/assets/images/header_meet_team.webp')] bg-cover bg-no-repeat"
            style={{
              backgroundPosition: 'center top 25%',
              zIndex: 0,
            }}
          />

          {/* TV Image - responsive */}
          <div className="absolute right-0 bottom-0 z-5 w-[60%] max-w-[500px] overflow-hidden lg:right-10 lg:bottom-10 lg:w-[500px]">
            <Image
              src="/assets/images/tv.webp"
              alt="TV"
              width={500}
              height={500}
              className="h-auto w-full -rotate-25"
            />
          </div>

          {/* Title */}
          <div className="relative z-20 flex flex-col items-start">
            <ShadowedText className="-rotate-3 text-5xl lg:text-9xl">
              Code124
            </ShadowedText>
            <h1 className="text-secondary-400 -rotate-3 text-6xl leading-none md:text-7xl lg:text-[10rem]">
              PREVIOUS MEMBER
            </h1>
          </div>

          {/* Subtitle + Social + Pixel */}
          <div className="relative z-20 flex w-full max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Subtitle */}
            <div className="flex flex-col items-center space-y-5 text-center lg:items-start lg:text-left">
              <ShadowedText
                className="-rotate-3 text-4xl lg:text-7xl"
                textShadow="4px 2px 0 #FFF9E6"
                textColor="var(--color-primary-500)"
              >
                #TheFirstCommit
              </ShadowedText>
            </div>

            {/* Right: Social + Pixel Art */}
            <div className="flex w-full flex-col items-center gap-4 lg:w-auto">
              <div className="flex flex-col items-center gap-4 lg:flex-col lg:flex-col-reverse">
                <div className="border-primary-500 flex w-full -rotate-3 justify-around gap-x-4 border-t-2 pt-5 lg:max-w-xs lg:justify-center">
                  {SOCIAL_MEDIA.map((social) => (
                    <SocialMediaLink
                      key={social.platform}
                      platform={social.platform}
                      href={social.href}
                      iconClassName="h-12 w-12 bg-primary-600 text-2xl text-black shadow-[4px_4px_0px_#393C45]"
                    />
                  ))}
                </div>

                <Image
                  src="/assets/images/retro_pixel.webp"
                  alt="retro pixel art"
                  width={320}
                  height={42}
                  className="-rotate-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CAROUSEL SECTION
        ========================== */}
        <Wrapper>
          <div className="flex w-full flex-col items-center">
            <h3 className="text-primary-500 mb-6 -rotate-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px]">
              UI/UX Designer
            </h3>
          </div>

          <Carousel members={TEAM} />
        </Wrapper>

        {/* =========================
            OUR PAST SECTION
        ========================== */}
        <OurPast />
      </main>

      <Footer />
    </>
  );
}
