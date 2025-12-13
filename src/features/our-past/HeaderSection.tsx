import Image from 'next/image';
import ShadowedText from '@/components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '@/lib/constants';

export default function HeaderSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 py-12 text-white sm:min-h-[75vh] sm:gap-6 sm:py-14 md:min-h-[80vh] md:gap-8 md:py-16 lg:min-h-[85vh] lg:gap-10 lg:py-20">
      <div className="bg-top-[10%] absolute inset-0 z-0 bg-[url('/images/header_meet_team.webp')] bg-cover bg-position-[left_top_15%]" />
      <div className="absolute inset-0 z-0 rotate-180 bg-[url('/images/header_meet_team1.webp')] bg-cover bg-center" />

      {/* Title */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col gap-2 px-4 text-center sm:gap-3 md:gap-4 lg:items-start lg:px-8 lg:text-left xl:px-12">
        <ShadowedText
          className="-skew-1 text-3xl font-bold sm:text-4xl md:-skew-2 md:text-5xl lg:-skew-3 lg:text-7xl xl:text-8xl 2xl:text-9xl"
          strokeWidth="1.5px sm:2px md:2.5px lg:2.87px"
        >
          CODE124
        </ShadowedText>
        <h1 className="text-secondary-400 -skew-1 text-4xl leading-tight sm:text-5xl md:-skew-2 md:text-6xl lg:-skew-3 lg:text-8xl xl:text-[9rem] 2xl:text-[10rem]">
          PREVIOUS MEMBER
        </h1>
      </div>

      {/* Subtitle + Social + Pixel */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:gap-7 md:gap-8 lg:flex-row lg:justify-between lg:px-8 xl:px-12">
        {/* MOBILE */}
        <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:hidden">
          <div className="w-full text-center">
            <ShadowedText
              as="h2"
              className="-skew-1 text-3xl sm:text-4xl md:-skew-2 md:text-5xl"
              textShadow="2px 2px 0 #FFF9E6"
              textColor="var(--color-primary-500)"
              strokeWidth="1px"
            >
              #TheFirstCommit
            </ShadowedText>
          </div>
          <div className="border-primary-500 flex w-full max-w-[300px] -skew-1 flex-wrap justify-center gap-3 border-t-2 pt-3 sm:max-w-[360px] sm:gap-4 sm:pt-4 md:max-w-[420px] md:-skew-2">
            {SOCIAL_MEDIA.map((social) => (
              <SocialMediaLink
                key={social.platform}
                platform={social.platform}
                href={social.href}
                iconClassName="h-11 w-11 bg-primary-600 text-xl text-black shadow-[3px_3px_0px_#393C45] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#393C45] sm:h-12 sm:w-12 sm:text-2xl md:h-13 md:w-13"
              />
            ))}
          </div>
          <Image
            src="/images/retro_pixel.webp"
            alt="retro pixel art"
            width={320}
            height={42}
            className="h-auto w-full max-w-[300px] -skew-1 sm:max-w-[360px] md:max-w-[420px] md:-skew-2"
            sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 420px"
          />
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
                #TheFirstCommit
              </ShadowedText>
              <Image
                src="/images/retro_pixel.webp"
                alt="retro pixel art"
                width={320}
                height={42}
                className="h-auto w-full max-w-[350px] -rotate-3 xl:max-w-[400px]"
                sizes="(max-width: 1280px) 350px, 400px"
              />
            </div>
            <div className="border-primary-500 flex w-full -rotate-3 flex-wrap gap-4 border-t-2 pt-4">
              {SOCIAL_MEDIA.map((social) => (
                <SocialMediaLink
                  key={social.platform}
                  platform={social.platform}
                  href={social.href}
                  iconClassName="h-12 w-12 bg-primary-600 text-2xl text-black shadow-[4px_4px_0px_#393C45] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#393C45] xl:h-14 xl:w-14"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
