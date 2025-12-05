import Logo from './Logo';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

export default function Navbar() {
  return (
    <nav className="fixed flex w-full flex-row items-center justify-between px-6 py-3 lg:px-20">
      <Logo />

      {/* Mobile Navigation Menu */}
      <MobileNavigation className="bg-primary-500 block border px-3 py-2 lg:hidden" />

      {/* Desktop Navigation Menu */}
      <DesktopNavigation className="hidden lg:block" />
    </nav>
  );
}
