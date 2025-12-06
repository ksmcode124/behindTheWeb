import React from 'react';
import { SocialMediaLink } from '../../ui/SocialMediaLink';
import Image from 'next/image';
import Logo from '../../ui/Logo';

const socialMediaData = [
  {
    platform: 'instagram' as const,
    href: 'https://instagram.com/the.code124',
    label: 'the.code124',
  },
  {
    platform: 'whatsapp' as const,
    href: 'https://wa.me/6285777700124',
    label: '+6285-777-700-124',
  },
  {
    platform: 'email' as const,
    href: 'mailto:ksm.code124@gmail.com',
    label: 'ksm.code124@gmail.com',
  },
  {
    platform: 'linkedin' as const,
    href: 'https://linkedin.com/in/code124',
    label: 'code124',
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary-300 relative h-[350px] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between pt-[65px] pr-8 pl-[140px] md:flex-row md:items-center">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <div className="flex items-center space-x-3">
            <Logo variant="white" />
          </div>
          <div>
            <h3 className="mb-2 font-bold">#TheFirstCommit</h3>
            <p className="max-w-[350px] text-[14px] leading-relaxed text-gray-300">
              In Engineering We Trust, In Innovation We Rise. Designing Tomorrow
              Today. Powered By Knowledge, Driven By Innovation. Because Every
              Problem Has A Solution.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:w-1/2 md:pl-5">
          {socialMediaData.map((social) => (
            <SocialMediaLink
              key={social.platform}
              platform={social.platform}
              href={social.href}
              label={social.label}
              withBorder
            />
          ))}
        </div>
      </div>

      {/* garis vertikal di tengah */}
      <div className="absolute top-1/2 left-1/2 hidden h-[220px] -translate-x-1/2 -translate-y-1/2 border-r border-white md:block" />
    </footer>
  );
}

export default Footer;
