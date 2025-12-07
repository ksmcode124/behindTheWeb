import { NAV_ITEMS } from '@/app/components/data/navItems';
import { NavLink } from '../../ui/NavLink';

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
