
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
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Banknote, Check, Hourglass, X } from 'lucide-react';
import type { AdminWithdrawalRequest } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// This is a representation of withdrawal requests fetched from the database.
const initialRequests: AdminWithdrawalRequest[] = [
  {
    id: 'WR-001',
    employeeId: 'EMP-001',
    employeeEmail: 'john.doe@example.com',
    amount: 500.0,
    method: 'UPI',
    status: 'Pending',
    createdAt: '2024-07-30',
  },
  {
    id: 'WR-002',
    employeeId: 'EMP-003',
    employeeEmail: 'sam.wilson@email.com',
    amount: 1500.0,
    method: 'Bank Transfer',
    status: 'Pending',
    createdAt: '2024-07-29',
  },
  {
    id: 'WR-003',
    employeeId: 'EMP-005',
    employeeEmail: 'emily.white@example.com',
    amount: 250.5,
    method: 'PayPal',
    status: 'Pending',
    createdAt: '2024-07-28',
  },
];

const statusConfig = {
    Pending: { variant: "default", icon: Hourglass, label: 'Pending' },
    Approved: { variant: "secondary", icon: Check, label: 'Approved' },
    'On Hold': { variant: "outline", icon: Hourglass, label: 'On Hold' },
    Cancelled: { variant: "destructive", icon: X, label: 'Cancelled' },
} as const;


export function WithdrawalRequestManager() {
  const [requests, setRequests] = useState<AdminWithdrawalRequest[]>(initialRequests);

  const handleUpdateStatus = (
    id: string,
    status: 'Approved' | 'On Hold' | 'Cancelled'
  ) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Requests</CardTitle>
        <CardDescription>
          Approve, hold, or cancel employee withdrawal requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Employee Email</TableHead>
                <TableHead className="text-right">Amount (INR)</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const isPending = request.status === 'Pending';
                const { variant, icon: Icon, label } = statusConfig[request.status];

                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.employeeEmail}</TableCell>
                    <TableCell className="text-right">
                      {request.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.method}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={variant as any}>
                        <Icon className="mr-1 h-3 w-3" />
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, 'Approved')}
                            className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, 'On Hold')}
                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-100 hover:text-yellow-700"
                          >
                            <Hourglass className="mr-1 h-4 w-4" />
                            Hold
                          </Button>
                           <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, 'Cancelled')}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Action Taken</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            <Banknote className="mx-auto h-12 w-12" />
            <p className="mt-4">No pending withdrawal requests.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
