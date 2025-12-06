import Logo from '../../ui/Logo';
import { Navigation as Mobile } from './Navigation.mobile';
import { Navigation as Desktop } from './Navigation.desktop';
import { NavLink } from '../../ui/NavLink';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="font-display fixed flex w-full flex-row items-center justify-between px-6 py-3 lg:px-20">
      <Link
        href="/"
        className="bg-primary-500 pointer-events-auto relative border px-4 py-1 text-center text-2xl font-bold transition-colors duration-300 hover:bg-white"
      >
        <Logo />
      </Link>

      {/* Mobile Navigation Menu */}
      <Mobile className="bg-primary-500 block border px-3 py-2 lg:hidden" />

      {/* Desktop Navigation Menu */}
      <Desktop className="lg:flex-end hidden lg:flex lg:w-full lg:justify-end" />
    </nav>
  );
}
