'use client';
import Link from 'next/link';
import Logo from '../common/Logo';
import { NavLink } from '@/components/common/NavLink';
import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
  return (
    <header className="bg-background/70 fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-20">
        {/* Logo */}
        <Link
          href="/"
          className="bg-primary-500 hover:bg-secondary-400 pointer-events-auto relative border px-4 py-1 text-2xl font-bold transition-colors"
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

export function DesktopNav({ className = '' }) {
  return (
    <nav className={`flex gap-x-7 ${className}`} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
export function MobileNav({ className }: { className: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} relative`}>
      {/* BUTTON */}
      <button
        className="bg-primary-500 relative z-25 flex flex-col space-y-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {/* Top bar */}
        <span
          className={`bg-secondary-300 block h-1 w-6 rounded-2xl transition-transform duration-300 ${
            open ? 'translate-y-3 rotate-45' : ''
          }`}
        />

        {/* Middle bar */}
        <span
          className={`bg-secondary-300 block h-1 w-6 rounded-2xl transition-opacity duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Bottom bar */}
        <span
          className={`bg-secondary-300 block h-1 w-6 rounded-2xl transition-transform duration-300 ${
            open ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* MENU */}
      <div
        className={`bg-secondary-300 absolute -top-5 -right-6 flex w-[40vw] flex-col items-start gap-4 p-5 pt-20 transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0'
        }`}
      >
        {/* Separator line */}
        <div className="bg-secondary-400 mb-2 h-[2px] w-full opacity-40" />

        <NavLink href="/">HOME</NavLink>
        <NavLink href="/the-team">THE TEAM</NavLink>
        <NavLink href="/our-past">OUR PAST</NavLink>
      </div>
    </div>
  );
}
