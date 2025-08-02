
import { Coins, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const portalLinks = [
    {
        href: '/employee/register',
        title: 'join Employee Start income',
        description: 'Complete tasks and see your earnings.',
        icon: Coins,
        variant: 'default' as 'default',
    },
    {
        href: '/buyer/register',
        title: 'join as a buyer to grow you social media accounts',
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
                   <Button key={portal.title} asChild className="w-full h-24 text-xl" variant={portal.variant}>
                        <Link href={portal.href}>
                             <div className='flex items-center gap-3 text-center'>
                                <portal.icon className="h-8 w-8" />
                                <span>{portal.title}</span>
                            </div>
                        </Link>
                    </Button>
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
