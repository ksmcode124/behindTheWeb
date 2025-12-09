'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  href: string;
  children?: React.ReactNode;
}

export function NavLink({ href, children }: NavProps) {
  return (
    <Link
      href={href}
      className={`font-display hover:bg-secondary-400 bg-primary-500 pointer-events-auto relative border px-4 py-1 text-center text-2xl font-bold shadow-[0_3px_3px_rgba(0,0,0,0.25)] transition-colors duration-300 lg:px-6`}
    >
      {children}
    </Link>
  );
}
