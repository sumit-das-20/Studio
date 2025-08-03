
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, CreditCard, ClipboardList, Shield, ShoppingBag, RadioTower, LandPlot } from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/employees',
      label: 'Employees',
      icon: Users,
    },
    {
      href: '/admin/buyers',
      label: 'Buyers',
      icon: ShoppingBag,
    },
    {
      href: '/admin/withdrawals',
      label: 'Withdrawals',
      icon: CreditCard,
    },
    {
      href: '/admin/tasks',
      label: 'Tasks',
      icon: ClipboardList,
    },
    {
      href: '/admin/ad-networks',
      label: 'Ad Networks',
      icon: RadioTower
    },
    {
      href: '/admin/payment-gateways',
      label: 'Payment Gateways',
      icon: LandPlot
    }
  ];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">TaskRabbit</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
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
            </SidebarContent>
        </Sidebar>
    )
}
