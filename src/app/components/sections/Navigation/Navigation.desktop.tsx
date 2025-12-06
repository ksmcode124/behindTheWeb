import { NavLink } from '../../ui/NavLink';

export function Navigation({ className }: { className: string }) {
  return (
    <div className={`flex gap-x-7 ${className}`}>
      <NavLink href="/">HOME</NavLink>
      <NavLink href="/the-team">THE TEAM</NavLink>
      <NavLink href="/our-past">OUR PAST</NavLink>
    </div>
  );
}
