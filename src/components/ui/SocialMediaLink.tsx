'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedinIn,
} from 'react-icons/fa';

interface SocialMediaProps {
  platform: string;
  href: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  withBorder?: boolean;
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
        className={`flex items-center justify-center rounded-full p-1 transition-all duration-300 ease-in-out md:p-2 ${iconClassName} ${
          withBorder
            ? 'hover:text-secondary-300 border border-white text-white hover:bg-white'
            : 'bg-primary-600 hover:bg-secondary-300 hover:text-primary-600 border border-transparent shadow-[4px_4px_0_var(--color-secondary-300)] hover:shadow-[4px_4px_0_var(--color-primary-600)]'
        } `}
      >
        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" />
      </span>

      {/* Optional label */}
      {label && (
        <span className="text-secondary-400 ml-2 text-sm font-semibold md:ml-3 md:text-base">
          {label}
        </span>
      )}
    </Link>
  );
}
