'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  href: string;
  children?: React.ReactNode;
}

export function NavLink({ href, children }: NavProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`pointer-events-auto relative border px-4 py-1 text-center text-2xl font-bold shadow-[0_3px_3px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-white lg:px-6 ${
        isActive ? 'bg-white' : 'bg-primary-500'
      }`}
    >
      {children}
    </Link>
  );
}
