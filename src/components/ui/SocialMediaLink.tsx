import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedinIn,
} from 'react-icons/fa';

interface SocialMediaProps {
  platform: 'instagram' | 'linkedin' | 'whatsapp' | 'email';
  href: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  withBorder?: boolean;
  iconSize?: number; // optional improvement
}

const iconMap: Record<SocialMediaProps['platform'], React.ElementType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

export function SocialMediaLink({
  platform,
  href,
  label,
  className = '',
  iconClassName = '',
  withBorder = false,
  iconSize = 24, // default icon size
}: SocialMediaProps) {
  const IconComponent = iconMap[platform];

  if (!IconComponent) return null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center transition-colors duration-300 ${className}`}
    >
      {/* Icon circle */}
      <span
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${iconClassName} ${withBorder ? 'border border-white' : 'border border-transparent'} hover:border-white hover:bg-white hover:text-black`}
      >
        <IconComponent size={iconSize} />
      </span>

      {/* Optional label */}
      {label && <span className="ml-10 font-semibold">{label}</span>}
    </Link>
  );
}
