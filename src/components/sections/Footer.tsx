import React from 'react';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import Logo from '@/components/ui/Logo';
import { SOCIAL_MEDIA } from '../socialMedia';

export default function Footer() {
  return (
    <footer className="flex bg-secondary-300 p items-center font-body text-secondary-400 relative py-16 px-8 md:px-36   w-full shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
      <div className="flex w-full items-center h-full gap-16 md:flex-row flex-col">

        <div className="flex w-full flex-col items-start gap-4 pr-8">
          <Logo variant='white' />
          <h3 className="mb-2 font-bold">#TheFirstCommit</h3>
          <p className="max-w-full text-left text-xl leading-relaxed text-gray-300 lg:max-w-[350px] lg:text-[14px]">
            In Engineering We Trust, In Innovation We Rise. Designing Tomorrow
            Today. Powered By Knowledge, Driven By Innovation. Because Every
            Problem Has A Solution.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 md:ps-25 md:border-l">
          {SOCIAL_MEDIA.map((social) => (
            <SocialMediaLink
              key={social.platform}
              platform={social.platform}
              href={social.href}
              label={social.label}
              iconClassName="h-12 w-12 text-2xl"
              withBorder
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
