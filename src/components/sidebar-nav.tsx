
'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/employee/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/marketplace',
      label: 'Marketplace',
      icon: ShoppingBag,
    },
    {
      href: '/gigs',
      label: 'My Gigs',
      icon: Briefcase,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            // A simple way to check for active route
            isActive={pathname.startsWith(item.href)}
            tooltip={item.label}
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
