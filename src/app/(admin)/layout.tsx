import ClientGuard from '@/features/admin/ClientGuard';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientGuard>{children}</ClientGuard>
    </>
  );
}
