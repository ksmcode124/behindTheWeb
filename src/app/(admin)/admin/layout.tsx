import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/admin/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ClientGuard from '@/features/admin/client-guard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-display antialiased`}>
        <ClientGuard>
          <SidebarProvider>
            {/* <AppSidebar /> */}
            {/* <main className="w-full p-8"> */}
            <main className="w-full">
              {/* <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Home</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
              {children}
            </main>
          </SidebarProvider>
        </ClientGuard>
      </body>
    </html>
  );
}
