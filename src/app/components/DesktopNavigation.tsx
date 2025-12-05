import { NavLink } from './NavLink';

export default function DesktopNavigation({
  className,
}: {
  className: string;
}) {
  return (
    <div className={`flex gap-x-7 ${className}`}>
      <NavLink href="#tentang">TENTANG</NavLink>
      <NavLink href="#sejarah">SEJARAH</NavLink>
      <NavLink href="#visimisi">VISI & MISI</NavLink>
      <NavLink href="#departemen">DEPARTEMEN</NavLink>
    </div>
  );
}
