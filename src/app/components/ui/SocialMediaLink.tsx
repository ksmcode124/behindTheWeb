import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
} from 'react-icons/fa';

interface SocialMediaProps {
  platform: 'instagram' | 'linkedin' | 'whatsapp' | 'email';
  href: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  withBorder?: boolean;
}

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

export function SocialMediaLink({
  platform,
  href,
  label,
  className,
  iconClassName,
  withBorder = false,
}: SocialMediaProps) {
  const IconComponent = iconMap[platform];

  if (!IconComponent) {
    return null;
  }

  const borderClass = withBorder
    ? 'border border-white'
    : 'border border-transparent';

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center gap-10 transition-colors duration-300 ${
        className || ''
      } `}
    >
      {/* Lingkaran ikon */}
      <span
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${iconClassName} ${borderClass} whitespace-nowrap hover:border-white hover:bg-white hover:text-black`}
      >
        <IconComponent />
      </span>

      {/* Label text di kanan ikon (opsional) */}
      {label && <span className="font-semibold">{label}</span>}
    </Link>
  );
}
