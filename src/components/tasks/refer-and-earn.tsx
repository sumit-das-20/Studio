

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMockData } from '@/hooks/use-mock-data';
import { Skeleton } from '../ui/skeleton';


const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'default';
        case 'Pending':
            return 'secondary';
        default:
            return 'outline';
    }
};

export function ReferAndEarn() {
    const { toast } = useToast();
    const { employees, isLoading } = useMockData();

    // For this example, we'll assume the logged in user is EMP-001
    const currentUser = employees.find(e => e.id === 'EMP-001');
    const referralCode = currentUser?.referralCode || '';
    const referralLink = referralCode ? `https://taskrabbit.com/register?ref=${referralCode}`: '';

    const referredUsers = employees.filter(e => e.referredBy === currentUser?.id);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
    };

    const totalReferralEarnings = referredUsers.length * 50; // Example calculation

    return (
        <section id="refer-and-earn" className="space-y-8">
            <div className="flex items-center gap-4">
                <Gift className="h-8 w-8 text-primary" />
                <div>
                    <h2 className="text-2xl font-bold font-headline">Refer & Earn</h2>
                    <p className="text-muted-foreground">
                        Share your referral link and earn rewards for every new user who signs up.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Referral Link</CardTitle>
                    <CardDescription>
                        Share this link with your friends. You'll earn 50 INR for each friend who completes their first task, plus 0.10% of their lifetime withdrawals.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-10 flex-grow" />
                           <Skeleton className="h-10 w-10" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Input readOnly value={referralLink} />
                            <Button variant="outline" size="icon" onClick={() => handleCopy(referralLink)} disabled={!referralLink}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            <span>Your Referrals</span>
                        </CardTitle>
                        <CardDescription>A list of users you've referred.</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Initial Referral Earnings</p>
                        <p className="text-2xl font-bold text-primary">{totalReferralEarnings.toFixed(2)} INR</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                 Array.from({length: 2}).map((_, i) => (
                                     <TableRow key={i}>
                                         <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                         <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                         <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                     </TableRow>
                                 ))
                            ) : referredUsers.length > 0 ? (
                                referredUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.createdAt}</TableCell>
                                        <TableCell>
                                            {/* In a real app, this status would be dynamic */}
                                            <Badge variant={getStatusVariant('Completed') as any}>Active</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        You haven't referred anyone yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    );
}
