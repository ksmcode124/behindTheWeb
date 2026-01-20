import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/admin/AppSidebar';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider className="bg-white">
        <AppSidebar />
        <main className={cn('w-full p-8', montserrat.variable)}>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
