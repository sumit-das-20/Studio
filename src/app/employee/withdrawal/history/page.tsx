
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowLeft, History, Trophy } from 'lucide-react';
import Link from 'next/link';

const withdrawalHistory = [
  {
    date: '2024-07-28',
    amount: 500.0,
    method: 'UPI',
    status: 'Completed',
  },
  {
    date: '2024-07-21',
    amount: 1200.0,
    method: 'Bank Transfer',
    status: 'Completed',
  },
  {
    date: '2024-07-15',
    amount: 250.0,
    method: 'PayPal',
    status: 'Completed',
  },
  {
    date: '2024-07-10',
    amount: 3000.0,
    method: 'Bank Transfer',
    status: 'Pending',
  },
    {
    date: '2024-07-05',
    amount: 150.0,
    method: 'UPI',
    status: 'Failed',
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function WithdrawalHistoryPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">
              TaskRabbit
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
                <Link href="/employee/withdrawal" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Withdrawal
                </Link>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <History className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl font-bold font-headline">
                      Withdrawal History
                    </CardTitle>
                    <CardDescription>
                      A record of all your past withdrawal requests.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount (INR)</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.date}</TableCell>
                        <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(item.status) as any}>{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
