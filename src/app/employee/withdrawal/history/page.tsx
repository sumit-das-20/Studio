
'use client';

import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Badge } from '@/components/ui/badge';
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
import { History, Trophy } from 'lucide-react';
import { BackToWithdrawalLink } from '@/components/back-to-withdrawal-link';
import { useMockData } from '@/hooks/use-mock-data';
import { Skeleton } from '@/components/ui/skeleton';

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Paid':
    case 'Completed': // Keep for backward compatibility of old mock data
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Failed':
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function WithdrawalHistoryPage() {
  const { withdrawalRequests, isLoading } = useMockData();
  const history = withdrawalRequests.filter(req => req.employeeId === 'EMP-001' || req.employeeId === 'EMP-002' || req.employeeId === 'EMP-003');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">
              Taskbatao
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
                <BackToWithdrawalLink />
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
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                        </TableRow>
                      ))
                    ) : history.length > 0 ? (
                      history.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.createdAt}</TableCell>
                          <TableCell className="text-right">₹{item.amount.toFixed(2)}</TableCell>
                          <TableCell>{item.method}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(item.status) as any}>{item.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                       <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No withdrawal history found.
                          </TableCell>
                       </TableRow>
                    )}
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
