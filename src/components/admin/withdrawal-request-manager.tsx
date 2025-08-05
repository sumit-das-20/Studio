

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
import { Banknote, Check, Hourglass, X, Eye, Loader2, Send } from 'lucide-react';
import type { AdminWithdrawalRequest } from '@/lib/types';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useMockData } from '@/hooks/use-mock-data';

const statusConfig = {
    Pending: { variant: "default", icon: Hourglass, label: 'Pending' },
    Processing: { variant: "secondary", icon: Loader2, label: 'Processing', className: 'animate-spin' },
    Approved: { variant: "secondary", icon: Check, label: 'Approved' }, // Kept for existing data, but new flow skips this state.
    'On Hold': { variant: "outline", icon: Hourglass, label: 'On Hold' },
    Cancelled: { variant: "destructive", icon: X, label: 'Cancelled' },
    Paid: { variant: "default", icon: Send, label: 'Paid', className: 'bg-green-600 text-white' },
} as const;


export function WithdrawalRequestManager() {
  const { withdrawalRequests, updateWithdrawalRequest } = useMockData();
  const [processingPayout, setProcessingPayout] = useState<Set<string>>(new Set());
  const { toast } = useToast();

 const handleApproveAndPay = (id: string) => {
    setProcessingPayout(prev => new Set(prev).add(id));
    updateWithdrawalRequest(id, { status: 'Processing' });
    
    // Simulate API call to payment gateway
    setTimeout(() => {
        const transactionId = `T${Date.now()}`;
        updateWithdrawalRequest(id, { status: 'Paid', transactionId });
        
        setProcessingPayout(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });

        toast({
            title: 'Payout Processed!',
            description: `Payout for request ${id} is complete. TXN ID: ${transactionId}`
        });
    }, 2000);
  }

  const handleUpdateStatus = (
    id: string,
    status: 'On Hold' | 'Cancelled'
  ) => {
    updateWithdrawalRequest(id, { status });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Requests</CardTitle>
        <CardDescription>
          Approve, hold, or cancel employee withdrawal requests. Approved requests are paid out automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {withdrawalRequests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Employee Email</TableHead>
                <TableHead className="text-right">Amount (USD)</TableHead>
                <TableHead>Payment Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests.map((request) => {
                const { variant, icon: Icon, label, className } = statusConfig[request.status as keyof typeof statusConfig] || statusConfig['Pending'];
                const isProcessing = processingPayout.has(request.id);

                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.employeeEmail}</TableCell>
                    <TableCell className="text-right">
                      ${request.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                           <Button variant="outline" size="sm" className="flex items-center gap-2">
                             <Eye className="h-4 w-4" />
                             <span>{request.method}</span>
                           </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                               <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Payment Details</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Details for the {request.method} withdrawal method.
                                    </p>
                                </div>
                                <div className="grid gap-2 text-sm">
                                    {request.transactionId && (
                                        <div className="grid grid-cols-[1fr_2fr] items-center">
                                            <span className="font-semibold">Transaction ID</span>
                                            <span className="font-mono text-xs">{request.transactionId}</span>
                                        </div>
                                    )}
                                    {request.method === 'UPI' && request.upiId && (
                                        <div className="grid grid-cols-[1fr_2fr] items-center">
                                            <span className="font-semibold">UPI ID</span>
                                            <span>{request.upiId}</span>
                                        </div>
                                    )}
                                     {request.method === 'PayPal' && request.paypalEmail && (
                                        <div className="grid grid-cols-[1fr_2fr] items-center">
                                            <span className="font-semibold">PayPal Email</span>
                                            <span>{request.paypalEmail}</span>
                                        </div>
                                    )}
                                     {request.method === 'Bank Transfer' && request.bankDetails && (
                                        <>
                                            <div className="grid grid-cols-[1fr_2fr] items-center">
                                                <span className="font-semibold">Holder Name</span>
                                                <span>{request.bankDetails.accountHolderName}</span>
                                            </div>
                                             <div className="grid grid-cols-[1fr_2fr] items-center">
                                                <span className="font-semibold">Bank Name</span>
                                                <span>{request.bankDetails.bankName}</span>
                                            </div>
                                             <div className="grid grid-cols-[1fr_2fr] items-center">
                                                <span className="font-semibold">Account No.</span>
                                                <span>{request.bankDetails.accountNumber}</span>
                                            </div>
                                             <div className="grid grid-cols-[1fr_2fr] items-center">
                                                <span className="font-semibold">IFSC Code</span>
                                                <span>{request.bankDetails.ifscCode}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Badge variant={variant as any} className={request.status === 'Processing' ? '' : className}>
                        <Icon className={`mr-1 h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} />
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {request.status === 'Pending' && (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveAndPay(request.id)}
                            disabled={isProcessing}
                            className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve & Pay
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, 'On Hold')}
                            disabled={isProcessing}
                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-100 hover:text-yellow-700"
                          >
                            <Hourglass className="mr-1 h-4 w-4" />
                            Hold
                          </Button>
                           <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, 'Cancelled')}
                            disabled={isProcessing}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      )}
                      {(request.status === 'Cancelled' || request.status === 'Paid' || request.status === 'On Hold' || request.status === "Approved" || request.status === "Processing") && !isProcessing && (
                         <span className="text-xs text-muted-foreground">Action Taken</span>
                       )}
                       {isProcessing && (
                           <div className="flex items-center justify-center text-xs text-muted-foreground">
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                               Processing...
                           </div>
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
