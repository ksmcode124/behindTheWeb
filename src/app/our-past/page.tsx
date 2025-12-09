import Image from 'next/image';

import Navbar from '@/components/sections/Navigation/Navbar';
import Footer from '@/components/sections/Footer';
import OurPast from '@/components/sections/OurPast';

import Wrapper from '../../components/ui/Wrapper';
import Carousel from '../../components/ui/Carousel';
import ShadowedText from '../../components/ui/ShadowedText';
import { SocialMediaLink } from '../../components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '../../components/socialMedia';
import { TEAM, BOARD } from '../components/data/team';
import { FlipCard } from '../../components/ui/FlipCard';

export default function TheTeam() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <section className="text-secondary-400 mb-10 flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 py-12 sm:min-h-[85vh] sm:gap-6 sm:py-14 md:min-h-[80vh] md:gap-8 md:py-16 lg:min-h-[75vh] lg:gap-10 lg:py-20">
          {/* Background Images */}
          <div className="absolute inset-0 z-0 bg-[url('/assets/images/header_meet_team.webp')] bg-cover bg-[right_15%_top_15%] bg-no-repeat sm:bg-cover sm:bg-[right_30%_top_30%] md:bg-contain md:bg-[right_25%_top_25%] lg:bg-cover lg:bg-[right_15%_top_15%]" />

          <div className="absolute inset-0 z-0 rotate-180 bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-[center_top_30%] bg-no-repeat sm:bg-contain sm:bg-[center_top_40%] md:bg-contain md:bg-[center_top_35%] lg:bg-cover lg:bg-[center_top_30%]" />

          {/* TV Image - responsive position */}
          <div className="absolute top-[45%] right-[3%] z-10 w-[45%] max-w-3xl sm:top-[46%] sm:right-[4%] md:top-[47%] md:right-[5%] lg:top-[48%] lg:right-[6%] xl:top-[49%] xl:right-[7%]">
            <Image
              src="/assets/images/tv.webp"
              alt="TV"
              width={500}
              height={500}
              className="h-auto w-full -rotate-[18deg] drop-shadow-2xl"
              sizes="(max-width: 1280px) 40vw, 500px"
              priority
            />
          </div>

          {/* Title Section */}
          <div className="relative z-20 flex w-full max-w-7xl flex-col gap-2 px-4 sm:gap-3 md:gap-4 lg:items-start lg:px-8 lg:text-left xl:px-12">
            <ShadowedText
              className="-skew-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              strokeWidth="1.5px sm:2px md:2.5px lg:2.87px"
            >
              CODE124
            </ShadowedText>
            <h1 className="text-secondary-400 -skew-3 text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] 2xl:text-[10rem]">
              PREVIOUS MEMBER
            </h1>
          </div>

          {/* Subtitle + Social + Pixel Section */}
          <div className="relative z-20 flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:gap-7 md:gap-8 lg:flex-row lg:justify-between lg:px-8 xl:px-12">
            {/* MOBILE LAYOUT (< lg) */}
            <div className="flex w-full flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:hidden">
              <div className="w-full">
                <ShadowedText
                  as="h2"
                  className="-skew-3 text-4xl sm:text-5xl md:text-6xl"
                  textShadow="4px 0 0 #FFF9E6"
                  textColor="var(--color-primary-500)"
                  strokeWidth="1px"
                >
                  #TheFirstCommit
                </ShadowedText>
              </div>

              {/* Social Links */}
              <div className="border-primary-500 flex w-full max-w-[300px] -skew-3 flex-wrap gap-3 border-t-2 pt-3 sm:max-w-[360px] sm:gap-4 sm:pt-4 md:max-w-[420px]">
                {SOCIAL_MEDIA.map((social) => (
                  <SocialMediaLink
                    key={social.platform}
                    platform={social.platform}
                    href={social.href}
                    iconClassName="h-11 w-11 rounded-full text-black flex items-center justify-center transition-all duration-300 sm:h-12 sm:w-12 md:h-13 md:w-13"
                  />
                ))}
              </div>

              {/* Pixel Art */}
              <Image
                src="/assets/images/retro_pixel.webp"
                alt="retro pixel art"
                width={320}
                height={42}
                className="h-auto w-full max-w-[200px] -rotate-1 sm:max-w-[260px] md:max-w-[320px] md:-rotate-2"
                sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 420px"
              />
            </div>

            {/* DESKTOP LAYOUT (lg+) */}
            <div className="hidden w-full flex-col items-start gap-4 lg:flex lg:flex-row lg:justify-between xl:gap-6">
              <div className="flex w-full max-w-5xl flex-col items-start gap-4 xl:gap-5">
                {/* Subtitle + Pixel Art in one row */}
                <div className="flex w-full items-center justify-between gap-6">
                  <ShadowedText
                    as="h2"
                    className="-skew-3 text-4xl sm:text-5xl md:text-6xl"
                    textShadow="4px 0 0 #FFF9E6"
                    textColor="var(--color-primary-500)"
                    strokeWidth="1px"
                  >
                    #TheFirstCommit
                  </ShadowedText>

                  <Image
                    src="/assets/images/retro_pixel.webp"
                    alt="retro pixel art"
                    width={320}
                    height={42}
                    className="h-auto w-full max-w-[350px] -rotate-3 xl:max-w-[400px]"
                    sizes="(max-width: 1280px) 350px, 400px"
                  />
                </div>

                {/* Social Links */}
                <div className="border-primary-500 flex w-full -rotate-3 flex-wrap gap-4 border-t-2 pt-4">
                  {SOCIAL_MEDIA.map((social) => (
                    <SocialMediaLink
                      key={social.platform}
                      platform={social.platform}
                      href={social.href}
                      iconClassName="h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Sections */}
        <Wrapper>
          {/* Ketua & Wakil  */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12">
            {BOARD.map(({ nama, image, ig, linkedIn, role }) => (
              <div key={nama} className="flex flex-col items-center gap-4">
                <FlipCard
                  key={nama}
                  size={1}
                  nama={nama}
                  role={role}
                  imageSrc={image}
                  ig={ig}
                  linkedIn={linkedIn}
                />
              </div>
            ))}
          </div>

          {/* Developer Carousel */}
          {[
            {
              title: 'UI/UX Designer',
              members: TEAM,
              rotation: '-skew-3',
            },
            {
              title: 'Frontend Developer',
              members: TEAM,
              rotation: '-skew-3',
            },
            {
              title: 'Backend Developer',
              members: TEAM,
              rotation: '-skew-3',
            },
          ].map((section, index) => (
            <div
              key={index}
              className="relative z-10 flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
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
