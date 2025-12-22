import SiteFooter from '@/components/layout/SiteFooter';
import SiteNavbar from '@/components/layout/SiteNavbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNavbar />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
