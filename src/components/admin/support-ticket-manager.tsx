
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LifeBuoy, MoreHorizontal } from 'lucide-react';
import type { SupportTicket } from '@/lib/types';
import { useMockData } from '@/hooks/use-mock-data';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

const statusConfig = {
    Open: { variant: "default", label: 'Open', className: 'bg-red-600' },
    'In Progress': { variant: "secondary", label: 'In Progress' },
    Resolved: { variant: "default", label: 'Resolved', className: 'bg-green-600' },
} as const;

export function SupportTicketManager() {
    const { supportTickets, updateSupportTicket, isLoading } = useMockData();

    const handleUpdateStatus = (id: string, status: SupportTicket['status']) => {
        updateSupportTicket(id, { status });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LifeBuoy className="h-6 w-6" />
                    <span>Support Ticket Management</span>
                </CardTitle>
                <CardDescription>
                    View and manage all support tickets submitted by users.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-20 mt-1" />
                                    </TableCell>
                                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : supportTickets.length > 0 ? (
                            supportTickets.map((ticket) => {
                                const { variant, label, className } = statusConfig[ticket.status];
                                return (
                                    <TableRow key={ticket.id}>
                                        <TableCell>
                                            <div className="font-medium">{ticket.userEmail}</div>
                                            <div className="text-sm text-muted-foreground">{ticket.userRole}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold">{ticket.title}</div>
                                            <div className="text-xs text-muted-foreground truncate max-w-xs">{ticket.description}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{ticket.category}</Badge></TableCell>
                                        <TableCell>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</TableCell>
                                        <TableCell>
                                            <Badge variant={variant as any} className={cn(className)}>{label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, 'In Progress')}>
                                                        In Progress
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, 'Resolved')}>
                                                        Resolved
                                                    </DropdownMenuItem>
                                                     <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, 'Open')}>
                                                        Re-Open
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No support tickets found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
