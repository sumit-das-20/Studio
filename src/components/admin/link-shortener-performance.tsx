
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { LinkPerformance } from '@/lib/types';
import { IndianRupee, Link as LinkIcon, MousePointerClick } from 'lucide-react';

// This is a representation of link shortener performance data.
// In a real app, this data would be calculated from user actions in your database.
const linkPerformanceData: LinkPerformance[] = [
  {
    linkId: 'LNK-001',
    url: 'https://short.link/example1',
    clicks: 1243,
    earnings: 124.30,
  },
  {
    linkId: 'LNK-002',
    url: 'https://short.link/example2',
    clicks: 987,
    earnings: 98.70,
  },
   {
    linkId: 'LNK-003',
    url: 'https://short.link/example3',
    clicks: 1228,
    earnings: 122.80,
  },
];

export function LinkShortenerPerformance() {
    const totalEarnings = linkPerformanceData.reduce((acc, curr) => acc + curr.earnings, 0);
    const totalClicks = linkPerformanceData.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-wrap justify-between items-start gap-4'>
            <div className='flex items-center gap-3'>
                <LinkIcon className='h-6 w-6 text-primary' />
                <div>
                    <CardTitle>Link Shortener Performance</CardTitle>
                    <CardDescription>
                        Analytics of your link shortening tasks.
                    </CardDescription>
                </div>
            </div>
             <div className="flex gap-6 text-right">
                <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                        <MousePointerClick className='h-4 w-4' />
                        Total Clicks
                    </p>
                    <p className="text-2xl font-bold">
                        {totalClicks.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                        <IndianRupee className='h-4 w-4' />
                        Total Revenue
                    </p>
                    <p className="text-2xl font-bold">
                        {totalEarnings.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2">Detailed Link Statistics</h3>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Link URL</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Earnings (INR)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {linkPerformanceData.map((link) => (
                    <TableRow key={link.linkId}>
                    <TableCell className="font-mono text-xs">{link.url}</TableCell>
                    <TableCell className="text-right">{link.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">{link.earnings.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
