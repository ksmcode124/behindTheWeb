'use client';

import ShadowedText from '@/components/ui/ShadowedText';
import PixelImage from '@/components/common/PixelImage';
import SocialMediaLinks from '@/components/common/SocialMediaLinks';
import { KSM_NAME, KSM_TAGLINE } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="text-secondary-400 relative flex min-h-[85vh] w-full flex-col items-center justify-center gap-10 px-6 py-36">
      {/* Background */}
      <div className="absolute inset-0 scale-y-[-1] bg-[url('/images/header_meet_team1.webp')] bg-cover bg-center" />

      {/* Title */}
      <div className="z-10 flex flex-col items-center text-right">
        <h1 className="text-secondary-400 -skew-3 text-6xl leading-none md:text-7xl lg:text-[10rem]">
          MEET OUR GREAT!
          <br />
          DEVELOPERS
        </h1>
      </div>

      {/* Tagline + socials */}
      <div className="z-10 flex w-full max-w-6xl flex-col items-start justify-center gap-5 pl-10 lg:flex-row lg:items-center lg:pl-0">
        {/* Left */}
        <div className="space-y-5 text-left">
          <ShadowedText className="-skew-3 text-5xl lg:text-9xl">
            {KSM_NAME}
          </ShadowedText>
          <h3 className="-skew-3 text-4xl text-[#e6e6e6] lg:text-7xl">
            {KSM_TAGLINE}
          </h3>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-y-8">
          <PixelImage />
          <SocialMediaLinks />
        </div>
      </div>
    </section>
  );
}
