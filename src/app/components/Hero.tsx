import Image from 'next/image';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import ShadowedText from '@/components/ui/ShadowedText';
import { SOCIAL_MEDIA } from '../../components/socialMedia';

export default function HeroSection() {
  return (
    <section className="font-display flex min-h-[87vh] flex-col items-center justify-center gap-4 bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center px-11">
      <ShadowedText className="-skew-3 text-9xl">Code124</ShadowedText>

      <h3 className="h-12 -skew-3 text-5xl">#TheFirstCommit</h3>

      <div className="mx-auto max-w-5xl -skew-3">
        {/* Kiri atas */}
        <span className="pointers-event-none text-primary-500 absolute -top-8 -left-10 z-[-1] hidden text-6xl font-bold lg:block">
          124
        </span>
        {/* Kanan atas */}
        <span className="pointers-event-none text-primary-500 absolute -top-8 -right-10 z-[-1] hidden text-6xl font-bold lg:block">
          124
        </span>

        <p className="border-b-secondary border-b-4 pb-4 text-justify text-xl leading-relaxed [text-align-last:center]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          ratione distinctio quae accusantium qui corporis est! Libero ipsa
          nostrum quia dolorem error dolores repellendus modi ullam, quis
          nesciunt perferendis iusto! Culpa praesentium commodi veniam vel, modi
          amet recusandae doloribus, ipsum perspiciatis fugiat assumenda ut
          labore quaerat molestias aperiam consequuntur quo tempora voluptas
          ullam reprehenderit? Modi voluptatibus molestias maxime eos. Ipsam.
        </p>
      </div>

      <div className="mt-3 flex flex-col items-center gap-y-8 lg:w-5xl lg:flex-row-reverse lg:items-center lg:justify-between">
        {/* Social icons */}
        <div className="flex -rotate-3 flex-wrap items-center justify-center gap-x-4">
          {SOCIAL_MEDIA.map((social) => (
            <SocialMediaLink
              key={social.platform}
              platform={social.platform}
              href={social.href}
              iconClassName="h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]"
            />
          ))}
        </div>

        {/* Pixel image */}
        <Image
          src="/assets/images/retro_pixel.webp"
          alt=""
          width={320}
          height={42}
          className="-rotate-3"
          priority
        />
      </div>
    </section>
  );
}
