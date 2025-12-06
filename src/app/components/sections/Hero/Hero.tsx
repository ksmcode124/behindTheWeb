import Image from 'next/image';
import { SocialMediaLink } from '../../ui/SocialMediaLink';
import ShadowedText from '../../ui/ShadowedText';

export default function HeroSection() {
  const socialMediaData = [
    {
      platform: 'instagram' as const,
      href: 'https://instagram.com/the.code124',
    },
    {
      platform: 'whatsapp' as const,
      href: 'https://wa.me/6285777700124',
    },
    {
      platform: 'email' as const,
      href: 'mailto:ksm.code124@gmail.com',
    },
    {
      platform: 'linkedin' as const,
      href: 'https://linkedin.com/in/code124',
    },
  ];
  return (
    <div className="font-display flex min-h-screen min-w-screen flex-col items-center justify-center gap-4 bg-[url('/assets/images/hero_bg.webp')] bg-cover bg-center px-11">
      <ShadowedText className="text-8xl">Code124</ShadowedText>
      <h3 className="h-12 -rotate-3 text-4xl">#TheFirstCommit</h3>
      <p className="border-b-secondary mx-auto max-w-5xl -rotate-3 border-b-4 pb-4 text-justify leading-relaxed [text-align-last:center]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem hic
        architecto explicabo quibusdam atque inventore fugit eos repellendus
        nihil eligendi? Cupiditate impedit vel culpa ratione quisquam
        reprehenderit id veniam ipsam. Possimus, quaerat autem ut molestias
        cumque numquam doloribus? Ea culpa sequi similique aspernatur iusto,
        obcaecati cum perspiciatis quaerat! Sequi incidunt cum vero cupiditate
        beatae laboriosam suscipit soluta laborum omnis esse? Nisi qui doloribus
        culpa consectetur ut totam rerum architecto! Culpa, dolorem odit
        corrupti recusandae doloremque sed alias fuga, quod doloribus ullam iste
        delectus veritatis. Nihil maiores soluta pariatur incidunt cumque?
      </p>
      <div className="mt-3 flex flex-col items-center gap-y-8 lg:w-5xl lg:flex-row-reverse lg:items-stretch lg:justify-between">
        <div className="flex -rotate-3 items-center justify-center gap-x-4">
          {socialMediaData.map((social) => (
            <SocialMediaLink
              key={social.platform}
              platform={social.platform}
              href={social.href}
              iconClassName="h-12 w-12 text-2xl bg-primary-600 text-black shadow-[4px_4px_0px_#393C45]"
            />
          ))}
        </div>
        <Image
          src="/assets/images/retro_pixel.webp"
          alt=""
          width={320}
          height={42}
          className="-rotate-3"
        />
      </div>
    </div>
  );
}
