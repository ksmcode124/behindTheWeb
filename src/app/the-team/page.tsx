import Image from 'next/image';

import Navbar from '../../components/sections/Navigation/Navbar';
import Footer from '../../components/sections/Footer';
import OurPast from '../../components/sections/OurPast';

import Wrapper from '../../components/ui/Wrapper';
import Carousel from '../../components/ui/Carousel';
import ShadowedText from '../../components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '../../components/data/socialMedia';

import { TEAM } from '../components/data/team';

export default function TheTeam() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <section className="text-secondary-400 flex h-[80vh] w-full flex-col items-center justify-center gap-10 bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-center px-6">
          {/* Title */}
          <div className="flex flex-col items-center text-right">
            <h1 className="text-secondary-400 -rotate-3 text-6xl leading-none md:text-7xl lg:text-[10rem]">
              MEET OUR GREAT!
              <br />
              DEVELOPERS
            </h1>
          </div>

          {/* Subtitle + Social Links */}
          <div className="flex w-full max-w-6xl flex-col items-start justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Title + Tagline */}
            <div className="space-y-5 text-center lg:text-left">
              <ShadowedText className="-rotate-3 text-5xl lg:text-9xl">
                Code124
              </ShadowedText>
              <h3 className="-rotate-3 text-3xl text-[#e6e6e6] lg:text-7xl">
                #TheFirstCommit
              </h3>
            </div>

            {/* Right: Social + Pixel Art */}
            <div className="flex flex-col items-center gap-y-8">
              <Image
                src="/assets/images/retro_pixel.webp"
                alt="retro pixel art"
                width={320}
                height={42}
                className="hidden -rotate-3 lg:block"
              />

              <div className="border-primary-500 flex max-w-xs -rotate-3 justify-center gap-x-4 border-t-2 pt-5">
                {SOCIAL_MEDIA.map((social) => (
                  <SocialMediaLink
                    key={social.platform}
                    platform={social.platform}
                    href={social.href}
                    iconClassName="
              h-12 w-12 bg-primary-600 text-2xl text-secondary-400
              shadow-[4px_4px_0px_#393C45]
            "
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Wrapper>
          {[
            {
              title: 'UI/UX Designer',
              members: TEAM,
              rotation: '-rotate-2 sm:-rotate-3 md:-rotate-4',
            },
            {
              title: 'Frontend Developer',
              members: TEAM,
              rotation: 'rotate-2 sm:rotate-3 md:rotate-4',
            },
            {
              title: 'Backend Developer',
              members: TEAM,
              rotation: '-rotate-1 sm:-rotate-2 md:-rotate-3',
            },
          ].map((section, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
            >
              <h3
                className={`text-primary-500 mb-4 -rotate-3 text-3xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1.5px] sm:mb-5 sm:text-4xl sm:[-webkit-text-stroke-width:2px] md:mb-6 md:text-5xl md:[-webkit-text-stroke-width:2.5px] lg:text-6xl xl:text-7xl`}
              >
                {section.title}
              </h3>
              <Carousel members={section.members} />
            </div>
          ))}
        </Wrapper>

        <OurPast />
      </main>

      <Footer />
    </>
  );
}
