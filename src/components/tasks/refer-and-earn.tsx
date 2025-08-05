
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const referralData = {
    referralCode: 'AB12CD34',
    referredUsers: [
        { id: 1, name: 'Alice', date: '2024-07-28', status: 'Completed', earnings: 50.00 },
        { id: 2, name: 'Bob', date: '2024-07-29', status: 'Pending', earnings: 0.00 },
        { id: 3, name: 'Charlie', date: '2024-07-30', status: 'Completed', earnings: 50.00 },
    ],
};

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
    const referralLink = `https://taskrabbit.com/register?ref=${referralData.referralCode}`;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
    };

    const totalReferralEarnings = referralData.referredUsers.reduce((acc, user) => acc + user.earnings, 0);

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
                        Share this link with your friends. You'll earn 50 INR for each friend who completes their first task.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Input readOnly value={referralLink} />
                        <Button variant="outline" size="icon" onClick={() => handleCopy(referralLink)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
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
                        <p className="text-sm text-muted-foreground">Total Referral Earnings</p>
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
                                <TableHead className="text-right">Earnings (INR)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {referralData.referredUsers.length > 0 ? (
                                referralData.referredUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(user.status) as any}>{user.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">{user.earnings.toFixed(2)}</TableCell>
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
