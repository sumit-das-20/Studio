
'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  Settings,
  Wallet,
  CheckSquare,
  Clapperboard,
  Link as LinkIcon,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


export function SidebarNav() {
  const pathname = usePathname();
  const [isTasksOpen, setIsTasksOpen] = useState(pathname.startsWith('/employee/tasks'));

  const menuItems = [
    {
      href: '/employee/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/employee/withdrawal',
      label: 'Withdrawals',
      icon: Wallet,
    },
  ];

   const taskItems = [
    { href: '/employee/tasks/click-and-earn', label: 'Click & Earn', icon: CheckSquare },
    { href: '/employee/tasks/watch-and-earn', label: 'Watch & Earn', icon: Clapperboard },
    { href: '/employee/tasks/link-shortener', label: 'Link Shortener', icon: LinkIcon },
    { href: '/employee/tasks/quiz', label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setIsTasksOpen(!isTasksOpen)}
          isActive={pathname.startsWith('/employee/tasks')}
          tooltip="Tasks"
        >
          <Briefcase />
          <span>Tasks</span>
          <ChevronDown
            className={`ml-auto h-4 w-4 transition-transform ${isTasksOpen ? 'rotate-180' : ''}`}
          />
        </SidebarMenuButton>
        {isTasksOpen && (
          <SidebarMenuSub>
            {taskItems.map((item) => (
              <SidebarMenuSubItem key={item.href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === item.href}
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
      <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith('/settings')}
            tooltip={'Settings'}
          >
            <a href="#">
              <Settings />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
