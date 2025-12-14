import Image from 'next/image';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import ShadowedText from '@/components/ui/ShadowedText';
import { SOCIAL_MEDIA, TEXTURES } from '@/lib/constants';

const HERO_TEXT = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
ratione distinctio quae accusantium qui corporis est! Libero ipsa
nostrum quia dolorem error dolores repellendus modi ullam, quis
nesciunt perferendis iusto!`;

const ICON_STYLE =
  'h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]';

export default function Hero() {
  return (
    <>
      <section className="font-display relative flex min-h-[87vh] flex-col items-center justify-center gap-4 bg-cover bg-center px-11">
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
      <ShadowedText className="-skew-3 text-9xl uppercase">
        Code124
      </ShadowedText>
      <h3 className="h-12 -skew-3 text-5xl">#TheFirstCommit</h3>
    </>
  );
}

function DecorativeNumbers() {
  const numberStyle =
    'pointers-event-none text-primary-500 absolute -top-8 z-[-1] hidden text-6xl font-bold lg:block';

  return (
    <>
      <span className={`${numberStyle} -left-10`}>124</span>
      <span className={`${numberStyle} -right-10`}>124</span>
    </>
  );
}

function HeroDescription() {
  return (
    <div className="relative mx-auto max-w-5xl -skew-3">
      <DecorativeNumbers />
      <p className="border-b-secondary-600 border-b-4 pb-4 text-justify text-xl leading-relaxed [text-align-last:center]">
        {HERO_TEXT}
      </p>
    </div>
  );
}

function SocialMediaLinks() {
  return (
    <div className="flex -rotate-3 flex-wrap items-center justify-center gap-x-4">
      {SOCIAL_MEDIA.map((social) => (
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
