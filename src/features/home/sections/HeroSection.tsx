import Image from 'next/image';
import { SocialMediaLink, ShadowedText } from '@/components/ui/';
import Content from '../data/home-content.json';
import { Brand, SocialMedia } from '@/lib/data/';

const ICON_STYLE =
  'h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]';

export default function HeroSection() {
  return (
    <>
      <section className="font-display relative flex min-h-[87vh] flex-col items-center justify-center gap-4 bg-cover bg-center px-11 sm:gap-6">
        <HeroTitle />
        <HeroDescription />
        <HeroFooter />
      </section>
    </>
  );
}

function HeroTitle() {
  return (
    <>
      <ShadowedText className="-skew-3 text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        {Brand.name}
      </ShadowedText>
      <h3 className="h-12 -skew-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {Brand.tagline}
      </h3>
    </>
  );
}

function DecorativeNumbers() {
  const numberStyle =
    'pointers-event-none text-primary-500 absolute -top-8 z-[-1] hidden text-6xl font-bold lg:block';

  return (
    <>
      <span className={`${numberStyle} -left-10`}>
        {Content.hero.decorativeText}
      </span>
      <span className={`${numberStyle} -right-10`}>
        {Content.hero.decorativeText}
      </span>
    </>
  );
}

function HeroDescription() {
  return (
    <div className="relative mx-auto max-w-5xl -skew-3">
      <DecorativeNumbers />
      <p className="border-b-secondary-600 border-b-4 pb-4 text-justify text-base leading-relaxed [text-align-last:center] sm:text-lg md:text-xl">
        {Content.hero.description}
      </p>
    </div>
  );
}

function SocialMediaLinks() {
  return (
    <div className="flex -rotate-3 flex-wrap items-center justify-center gap-x-4">
      {SocialMedia.map((social) => (
        <SocialMediaLink
          key={social.platform}
          platform={social.platform}
          href={social.href}
          iconClassName={ICON_STYLE}
        />
      ))}
    </div>
  );
}

function PixelImage() {
  return (
    <Image
      src="/images/retro_pixel.webp"
      alt="Decorative pixel art"
      width={320}
      height={42}
      className="-rotate-3"
      priority
    />
  );
}

function HeroFooter() {
  return (
    <div className="mt-3 flex flex-col items-center gap-y-8 lg:w-5xl lg:flex-row-reverse lg:items-center lg:justify-between">
      <SocialMediaLinks />
      <PixelImage />
    </div>
  );
}
