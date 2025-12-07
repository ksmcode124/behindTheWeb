'use client';
import { useState } from 'react';
import { NavLink } from '../../ui/NavLink';

export function Navigation({ className }: { className: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} relative`}>
      {/* BUTTON */}
      <button
        className="bg-primary-500 relative z-25 flex flex-col items-center justify-center space-y-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {/* Top bar */}
        <span
          className={`block h-1 w-6 rounded-2xl bg-black transition-transform duration-300 ${
            open ? 'translate-y-3 rotate-45' : ''
          }`}
        />

        {/* Middle bar */}
        <span
          className={`block h-1 w-6 rounded-2xl bg-black transition-opacity duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Bottom bar */}
        <span
          className={`block h-1 w-6 rounded-2xl bg-black transition-transform duration-300 ${
            open ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* MENU */}
      <div
        className={`bg-secondary-300 absolute -top-5 -right-6 flex w-[50vw] flex-col gap-4 p-5 pt-20 transition-all duration-300 ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'} `}
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
