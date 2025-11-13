import React from "react";
import { SocialMediaLink } from "./SocialMediaLink";
import Image from "next/image";

const socialMediaData = [
  {
    platform: "instagram" as const,
    href: "https://instagram.com/the.code124",
    label: "the.code124",
  },
  {
    platform: "whatsapp" as const,
    href: "https://wa.me/6285777700124",
    label: "+6285-777-700-124",
  },
  {
    platform: "email" as const,
    href: "mailto:ksm.code124@gmail.com",
    label: "ksm.code124@gmail.com",
  },
  {
    platform: "linkedin" as const,
    href: "https://linkedin.com/in/code124",
    label: "code124",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#393C45] text-white h-[350px] relative">
      <div className="pt-[65px] pl-[140px] pr-8 flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto">
        <div className="flex flex-col md:w-1/2 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="relative w-[43px] h-[38px]">
              <Image 
                src="/logo_white.png" 
                alt="Logo Code124" 
                fill priority 
              />
            </div>
            <div className="font-semibold text-lg">CODE124</div>
          </div>
          <div>
            <h3 className="font-bold mb-2">#TheFirstCommit</h3>
            <p className="leading-relaxed text-[14px] text-gray-300 max-w-[350px]">
              In Engineering We Trust, In Innovation We Rise. Designing Tomorrow
              Today. Powered By Knowledge, Driven By Innovation. Because Every
              Problem Has A Solution.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col space-y-4 md:pl-5">
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
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-r border-white h-[220px]" />
    </footer>
  );
}

export default Footer;
