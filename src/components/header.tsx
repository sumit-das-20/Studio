
'use client';

import { Button } from './ui/button';
import { EarningsCounter } from './earnings-counter';
import { SidebarTrigger } from './ui/sidebar';
import { signOut } from '@/app/employee/actions';
import { Power } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isEmployee = pathname.startsWith('/employee');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        {isEmployee && <EarningsCounter />}
         <form action={signOut}>
          <Button variant="ghost" size="icon" type="submit" aria-label="Sign Out">
            <Power />
          </Button>
        </form>
      </div>
    </header>
  );
}
