
import { Coins, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const portalLinks = [
    {
        href: '/employee/register',
        title: 'Join as an Employee and Earn Money',
        icon: Coins,
        variant: 'default' as 'default',
    },
    {
        href: '/buyer/register',
        title: 'Join as a buyer to grow your social media accounts',
        icon: TrendingUp,
        variant: 'outline' as 'outline',
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
                           "h-24 text-xl flex-col"
                        )}
                    >
                        <portal.icon className="h-8 w-8 mb-2" />
                        <span>{portal.title}</span>
                    </Link>
                ))}
            </div>
             <div className="mt-8 text-center text-sm">
                Already have an account?{' '}
                <Link href="/employee/login" className="underline font-semibold">
                    Employee Login
                </Link>
                {' or '}
                <Link href="/buyer/login" className="underline font-semibold">
                    Buyer Login
                </Link>
            </div>
        </section>
    )
}
