import { ArrowRight, Briefcase, Building, User } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

const portalLinks = [
    {
        href: '/user/login',
        title: 'Employee Portal',
        description: 'Complete tasks and see your earnings.',
        icon: User,
    },
    {
        href: '/buyer/login',
        title: 'Buyer Portal',
        description: 'Manage your ad campaigns.',
        icon: Building,
    },
]

export function Portals() {
    return (
        <section id="portals">
            <div className="mb-4 flex items-center gap-4">
                 <div>
                    <h2 className="text-2xl font-bold font-headline">Access Your Portal</h2>
                    <p className="text-muted-foreground">
                        Login or register to continue.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {portalLinks.map((portal) => (
                    <Card key={portal.title} className="flex flex-col justify-between transition-all hover:shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <portal.icon className="h-8 w-8 text-primary" />
                                <span>{portal.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{portal.description}</p>
                            <Link href={portal.href} className="w-full">
                                <Button className="w-full">
                                    <span>Go to Portal</span>
                                    <ArrowRight />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
