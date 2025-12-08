import Link from 'next/link';
import Logo from '../../ui/Logo';
import { MobileNav } from './Navigation.mobile';
import { DesktopNav } from './Navigation.desktop';

export default function Navbar() {
  return (
    <header className="bg-background/70 fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-20">
        {/* Logo */}
        <Link
          href="/"
          className="bg-primary-500 pointer-events-auto relative border px-4 py-1 text-2xl font-bold transition-colors hover:bg-white"
        >
          <Logo />
        </Link>

        {/* Mobile Navigation */}
        <MobileNav className="bg-primary-500 border px-3 py-2 lg:hidden" />

        {/* Desktop Navigation */}
        <DesktopNav className="hidden lg:flex lg:flex-1 lg:justify-end" />
      </nav>
    </header>
  );
}
