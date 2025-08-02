
import { Coins, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const portalLinks = [
    {
        href: '/employee/register',
        title: 'Join as an Employee and Earn Money',
        description: 'Complete tasks and see your earnings.',
        icon: Coins,
        variant: 'default' as 'default',
    },
    {
        href: '/buyer/register',
        title: 'Join as a buyer to grow your social media accounts',
        description: 'Buy services to grow your YouTube, Facebook, and Instagram channels.',
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
                            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                            "w-full h-24 text-xl",
                             portal.variant === 'default' ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                         <div className='flex items-center gap-3 text-center'>
                            <portal.icon className="h-8 w-8" />
                            <span>{portal.title}</span>
                        </div>
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
