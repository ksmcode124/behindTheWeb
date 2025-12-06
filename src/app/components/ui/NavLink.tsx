'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  href: string;
  children?: React.ReactNode;
}

export function NavLink({ href, children }: NavProps) {
  const pathname = usePathname(); // Next.js App Router hook
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`pointer-events-auto relative border px-4 py-1 text-center text-2xl font-bold transition-colors duration-300 hover:bg-white ${
        isActive ? 'bg-white' : 'bg-primary-500'
      }`}
    >
      {children}
    </Link>
  );
}
