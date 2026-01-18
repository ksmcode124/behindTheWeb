'use client';
import { useRouter } from 'next/navigation';

import { Building, Home, LogOut, Star, UserIcon, Users } from 'lucide-react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/Logo';
import { IMAGES } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Kepengurusan',
    url: '/admin/kepengurusan',
    icon: Building,
  },
  {
    title: 'Divisi',
    url: '/admin/divisi',
    icon: Users,
  },
  {
    title: 'Anggota',
    url: '/admin/anggota',
    icon: UserIcon,
  },
  {
    title: 'Jabatan',
    url: '/admin/jabatan',
    icon: Star,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      router.replace('/login');
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        console.error('[LOGOUT] Failed');
        return;
      }
    } catch (err) {
      console.error('[LOGOUT] Error', err);
    }
  };

  return (
    <Sidebar className="flex h-screen flex-col bg-[#102F41] text-white">
      <SidebarHeader className="bg-[#102F41]">
        <div className="flex items-center justify-center gap-x-3">
          <div className="relative aspect-square h-10">
            <Image priority fill src={IMAGES.LOGO_WHITE} alt={''} />
          </div>
          <p className="text-2xl font-bold italic">DASHBOARD</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#102F41] px-5 py-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex h-full flex-col gap-y-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#102F41] px-5 py-20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 text-xl"
            >
              <LogOut />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
