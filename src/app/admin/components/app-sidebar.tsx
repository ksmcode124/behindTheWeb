import { Building, Calendar, Home, Inbox, Search, Settings, Star, UserIcon, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/components/ui/Logo"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Kepengurusan",
    url: "/admin/kepengurusan",
    icon: Building,
  },
  {
    title: "Divisi",
    url: "/admin/divisi",
    icon: Users,
  },
  {
    title: "Anggota",
    url: "/admin/anggota",
    icon: UserIcon,
  },
  {
    title: "Jabatan",
    url: "/admin/jabatan",
    icon: Star,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo text="DASHBOARD"/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton>
            Logout
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}