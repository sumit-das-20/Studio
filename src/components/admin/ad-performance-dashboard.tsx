
'use client';

import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
import { Badge } from '@/components/ui/badge';
import type { AdPerformance } from '@/lib/types';
import { IndianRupee } from 'lucide-react';

// This is a representation of ad performance data fetched from your ad provider (e.g., AdMob).
const adPerformanceData: AdPerformance[] = [
  {
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    type: 'Banner',
    impressions: 15234,
    earnings: 450.75,
  },
  {
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
    type: 'Rewarded Video',
    impressions: 8765,
    earnings: 1250.2,
  },
   {
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
    type: 'Banner',
    impressions: 18901,
    earnings: 620.1,
  },
  {
    adUnitId: 'ca-app-pub-3940256099942544/8691691433',
    type: 'Other',
    impressions: 5432,
    earnings: 210.5,
  },
];

const chartData = [
    { type: 'Banner', earnings: adPerformanceData.filter(d => d.type === 'Banner').reduce((acc, curr) => acc + curr.earnings, 0) },
    { type: 'Video', earnings: adPerformanceData.filter(d => d.type === 'Rewarded Video').reduce((acc, curr) => acc + curr.earnings, 0) },
    { type: 'Other', earnings: adPerformanceData.filter(d => d.type === 'Other').reduce((acc, curr) => acc + curr.earnings, 0) },
]

export function AdPerformanceDashboard() {
    const totalEarnings = adPerformanceData.reduce((acc, curr) => acc + curr.earnings, 0);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className='flex justify-between items-start'>
            <div>
                <CardTitle>Ad Performance & Revenue</CardTitle>
                <CardDescription>
                    Analytics of your AdMob ad units.
                </CardDescription>
            </div>
             <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold flex items-center justify-end">
                    <IndianRupee className="h-6 w-6 mr-1" />
                    {totalEarnings.toFixed(2)}
                </p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2">Earnings by Ad Type</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2">Detailed Ad Unit Statistics</h3>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Ad Unit ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Impressions</TableHead>
                    <TableHead className="text-right">Earnings (INR)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {adPerformanceData.map((ad) => (
                    <TableRow key={ad.adUnitId}>
                    <TableCell className="font-mono text-xs">{ad.adUnitId}</TableCell>
                    <TableCell>
                        <Badge variant={ad.type === 'Banner' ? 'secondary' : ad.type === 'Rewarded Video' ? 'default' : 'outline'}>
                            {ad.type}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">{ad.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">{ad.earnings.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
