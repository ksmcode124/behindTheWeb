import React from 'react';
import { SocialMediaLink } from '../../ui/SocialMediaLink';
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

export default function Footer() {
  return (
    <footer className="bg-secondary-300 font-body relative min-h-[350px] w-full text-white shadow-[inset_7px_10px_20px_rgba(0,0,0,0.7)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-start px-6 pt-10 pb-10 lg:flex-row lg:justify-between lg:pt-[65px] lg:pr-8 lg:pb-0 lg:pl-[140px]">
        {/* Kolom Kiri: Logo dan Deskripsi */}
        <div className="flex w-full flex-col space-y-4 lg:w-1/2 lg:space-y-6">
          <div className="flex items-center space-x-3">
            <Logo variant="white" />
          </div>
          <div>
            <h3 className="mb-2 font-bold">#TheFirstCommit</h3>
            <p className="max-w-[300px] text-left text-[13px] leading-relaxed text-gray-300 lg:max-w-[350px] lg:text-[14px]">
              In Engineering We Trust, In Innovation We Rise. Designing Tomorrow
              Today. Powered By Knowledge, Driven By Innovation. Because Every
              Problem Has A Solution.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Social Media */}
        <div className="flex w-full flex-col items-start space-y-3 pt-8 lg:w-1/2 lg:space-y-4 lg:pt-0 lg:pl-5">
          {socialMediaData.map((social) => (
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

      {/* Garis Vertikal di Desktop */}
      <div className="absolute top-1/2 left-1/2 hidden h-[220px] -translate-x-1/2 -translate-y-1/2 border-r border-white lg:block" />
    </footer>
  );
}
