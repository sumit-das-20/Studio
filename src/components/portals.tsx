import { Coins, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const portalLinks = [
    {
        href: '/employee/login',
        title: 'Employee Login & Earn Money',
        icon: Coins,
        variant: 'default' as 'default',
    },
    {
        href: '/buyer/login',
        title: 'Join as a buyer to grow your social media accounts',
        icon: TrendingUp,
        variant: 'accent' as 'accent',
    },
]

export function Portals() {
    return (
        <section id="portals">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-headline">Welcome to TaskRabbit</h2>
                <p className="text-muted-foreground mt-2">
                    Choose your path below to get started.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {portalLinks.map((portal) => (
                    <Link
                        key={portal.title}
                        href={portal.href}
                        className={cn(
                            buttonVariants({ variant: portal.variant, size: 'lg' }),
                           "h-24 text-xl"
                        )}
                    >
                        <div className='flex flex-col justify-center items-center text-center gap-2'>
                             <portal.icon className="h-8 w-8" />
                            <span>{portal.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
             <div className="mt-8 text-center text-sm">
                New user?{' '}
                <Link href="/employee/register" className="underline font-semibold">
                    Create an Employee Account
                </Link>
                {' or '}
                <Link href="/buyer/register" className="underline font-semibold">
                    Create a Buyer Account
                </Link>
            </div>
        </section>
    )
}
