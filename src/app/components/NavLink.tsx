'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';

interface NavProps {
  href: string;
  children?: React.ReactNode;
}

export function NavLink({ href, children }: NavProps) {
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const newHash = `#${visible.target.id}`;
          setActiveHash(newHash);
          history.replaceState(null, '', newHash);
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', href);
    setActiveHash(href);
  };

  const isActive = activeHash === href;

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`pointer-events-auto relative border px-4 py-1 text-center text-2xl font-bold transition-colors duration-300 hover:bg-white ${
        isActive ? 'bg-white' : 'bg-primary-500'
      }`}
    >
      {children}
    </Link>
  );
}
