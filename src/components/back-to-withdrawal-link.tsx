
'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export function BackToWithdrawalLink() {
    return (
        <Link href="/employee/withdrawal" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Back to Withdrawal
        </Link>
    )
}
