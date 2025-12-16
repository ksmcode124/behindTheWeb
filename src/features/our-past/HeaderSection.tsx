import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { KSM_NAME, KSM_TAGLINE, SOCIAL_MEDIA } from '@/lib/constants';
import SocialMediaLinks from '@/components/common/SocialMediaLinks';
import PixelImage from '@/components/common/PixelImage';

export default function HeaderSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-start justify-center gap-4 overflow-hidden py-12 text-white sm:min-h-[75vh] sm:gap-6 sm:py-14 md:min-h-[80vh] md:gap-8 md:py-16 lg:min-h-[85vh] lg:gap-10 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 z-0 bg-[url('/images/header_meet_team.webp')] bg-[length:200%] bg-position-[right_20%_top] bg-no-repeat lg:bg-cover lg:bg-position-[left_top_15%]" />
        <div className="absolute inset-0 z-0 rotate-180 bg-[url('/images/header_meet_team1.webp')] bg-cover bg-center" />

        {/* Title */}
        <div className="relative z-20 flex w-full max-w-7xl flex-col items-start gap-2 px-4 sm:gap-3 md:gap-4 lg:px-8 lg:text-left xl:px-12">
          <ShadowedText
            className="-skew-3 text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-9xl"
            strokeWidth="1.5px sm:2px md:2.5px lg:2.87px"
          >
            {KSM_NAME}
          </ShadowedText>
          <h1 className="text-secondary-400 -skew-3 text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-9xl">
            PREVIOUS MEMBER
          </h1>
        </div>

        {/* Subtitle + Social + Pixel */}
        <div className="relative z-20 flex w-full max-w-7xl flex-col justify-center gap-6 px-4 sm:gap-7 md:gap-8 lg:flex-row lg:justify-between lg:px-8 xl:px-12">
          {/* MOBILE */}
          <div className="flex w-full flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:hidden">
            <div className="w-full">
              <ShadowedText
                as="h2"
                className="-skew-3 text-4xl sm:text-5xl md:text-6xl"
                textShadow="2px 2px 0 #FFF9E6"
                textColor="var(--color-primary-500)"
                strokeWidth="1px"
              >
                {KSM_TAGLINE}
              </ShadowedText>
            </div>
            <SocialMediaLinks />
            <PixelImage />
          </div>

          {/* DESKTOP */}
          <div className="hidden w-full flex-col items-start gap-4 lg:flex lg:flex-row lg:justify-between xl:gap-6">
            <div className="flex w-full max-w-5xl flex-col items-start gap-4 xl:gap-5">
              <div className="flex w-full items-center justify-between gap-6">
                <ShadowedText
                  as="h2"
                  className="-skew-3 text-4xl whitespace-nowrap xl:text-5xl 2xl:text-6xl"
                  textShadow="3px 3px 0 #FFF9E6"
                  textColor="var(--color-primary-500)"
                  strokeWidth="1.5px"
                >
                  {KSM_TAGLINE}
                </ShadowedText>
                <PixelImage />
              </div>
              <SocialMediaLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
