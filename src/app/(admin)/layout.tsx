import ClientGuard from '@/features/admin/client-guard';

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
