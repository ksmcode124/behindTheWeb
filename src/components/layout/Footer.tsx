import React from 'react';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import Logo from '@/components/common/Logo';
import { Brand, SocialMedia } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-secondary-300 p font-body text-secondary-400 relative flex w-full items-center px-8 py-16 shadow-[inset_0_0_60px_rgba(0,0,0,1)] md:px-36">
      <div className="flex h-full w-full flex-col items-center gap-16 md:flex-row">
        <FooterBranding />
        <FooterSocialLinks />
      </div>
    </footer>
  );
}

function FooterBranding() {
  return (
    <div className="flex w-full flex-col items-start gap-4 pr-8">
      <Logo variant="white" />
      <h3 className="mb-2 text-xl font-bold">{Brand.tagline}</h3>
      <p className="text-md max-w-full text-left leading-relaxed text-gray-300 lg:max-w-[350px] lg:text-[14px]">
        {Brand.quote}
      </p>
    </div>
  );
}

function FooterSocialLinks() {
  return (
    <div className="flex w-full flex-col items-start gap-4 md:border-l md:ps-25">
      {SocialMedia.map((social) => (
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
  );
}
