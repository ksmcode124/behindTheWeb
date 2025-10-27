
import React from "react";
import Link from "next/link";
import {FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope,
} from "react-icons/fa";

interface SocialMediaProps {
  platform: "instagram" | "linkedin" | "whatsapp" | "email";
  href: string;
  className?: string;
}

const iconMap = {
  instagram: <FaInstagram size={25} />,
  linkedin: <FaLinkedin size={25} />,
  whatsapp: <FaWhatsapp size={25} />,
  email: <FaEnvelope size={25} />
};

export function SocialMediaLink({platform, href, className}: SocialMediaProps) {
  const icon = iconMap[platform];

  if (!icon) {
    return null;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white
        ${className || ""} 
      `}
    >
      {icon}
    </Link>
  );
}
