import { ArrowRight, Briefcase, Building, User, Coins, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

const portalLinks = [
    {
        href: '/employee/register',
        title: 'Join as Employee & Start Earning',
        description: 'Complete tasks and see your earnings.',
        icon: Coins,
        variant: 'default' as 'default',
    },
    {
        href: '/buyer/register',
        title: 'Join as a Buyer to Grow Your Social Media',
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
                   <Link href={portal.href} key={portal.title}>
                        <Button className="w-full h-24 text-xl flex flex-col" variant={portal.variant}>
                             <div className='flex items-center gap-3'>
                                <portal.icon className="h-8 w-8" />
                                <span>{portal.title}</span>
                            </div>
                        </Button>
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
