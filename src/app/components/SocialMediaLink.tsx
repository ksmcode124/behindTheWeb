import React from "react";
import Link from "next/link";
import {FaInstagram,FaLinkedin,FaWhatsapp,FaEnvelope,
} from "react-icons/fa";

interface SocialMediaProps {
  platform: "instagram" | "linkedin" | "whatsapp" | "email";
  href: string;
  label?: string;
  className?: string;
  withBorder?: boolean;
}

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

export function SocialMediaLink({platform, href, label, className, withBorder = false}: SocialMediaProps) {
  const IconComponent = iconMap[platform];

  if (!IconComponent) {
    return null;
  }

  const borderClass = withBorder
    ? "border border-white"
    : "border border-transparent";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center gap-10 transition-colors duration-300 ${
        className || ""}
      `}
    >
      {/* Lingkaran ikon */}
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#393C45] text-white transition-all duration-300 ease-in-out 
          ${borderClass} hover:bg-white hover:text-black hover:border-white text-xl whitespace-nowrap`}
      >
        <IconComponent />
      </span>

      {/* Label text di kanan ikon (opsional) */}
      {label && <span className="text-white font-semibold">{label}</span>}
    </Link>
  );
}