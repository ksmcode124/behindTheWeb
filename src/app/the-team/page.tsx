import Image from 'next/image';

import Navbar from '../../components/sections/Navigation/Navbar';
import Footer from '../../components/sections/Footer';
import OurPast from '../../components/sections/OurPast';

import Wrapper from '../../components/ui/Wrapper';
import Carousel from '../../components/ui/Carousel';
import ShadowedText from '../../components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '../../components/socialMedia';

import { TEAM } from '../components/data/team';

export default function TheTeam() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <div className="absolute inset-0 scale-y-[-1] bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-center" />
        <section className="text-secondary-400 relative flex h-[80vh] w-full flex-col items-center justify-center gap-10 px-6">
          {' '}
          {/* Title */}
          <div className="flex flex-col items-center text-right">
            <h1 className="text-secondary-400 -skew-3 text-6xl leading-none md:text-7xl lg:text-[10rem]">
              MEET OUR GREAT!
              <br />
              DEVELOPERS
            </h1>
          </div>
          {/* Subtitle + Social Links */}
          <div className="flex w-full max-w-6xl flex-col items-start justify-center gap-10 pl-10 lg:flex-row lg:items-center lg:pl-0">
            {/* Left: Title + Tagline */}
            <div className="space-y-5 text-center lg:text-left">
              <ShadowedText className="-skew-3 text-5xl lg:text-9xl">
                CODE124
              </ShadowedText>
              <h3 className="-skew-3 text-3xl text-[#e6e6e6] lg:text-7xl">
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
                    iconClassName="h-11 w-11 rounded-full text-black flex items-center justify-center transition-all duration-300 sm:h-12 sm:w-12 md:h-13 md:w-13"
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
              <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
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
