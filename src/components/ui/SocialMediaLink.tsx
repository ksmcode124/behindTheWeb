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
      className={`text-secondary-300 inline-flex w-fit items-center transition-colors duration-300 ${className}`}
    >
      {/* Icon circle */}
      <span
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${iconClassName} ${withBorder ? 'border border-white text-white' : 'bg-primary-600 hover:bg-secondary-300 hover:text-primary-600 border border-transparent shadow-[4px_4px_0_var(--color-secondary-300)] hover:shadow-[4px_4px_0_var(--color-primary-600)]'}`}
      >
        <IconComponent size={iconSize} />
      </span>

      {/* Optional label */}
      {label && (
        <span className="text-secondary-400 ml-10 font-semibold">{label}</span>
      )}
    </Link>
  );
}
