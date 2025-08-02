import Link from 'next/link';
import { Button } from './ui/button';
import { EarningsCounter } from './earnings-counter';
import { SidebarTrigger } from './ui/sidebar';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <EarningsCounter />
        <Link href="/user/login">
            <Button>Login</Button>
        </Link>
      </div>
    </header>
  );
}
