

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
import { MoreHorizontal, User } from 'lucide-react';
import { type AdminEmployee } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

// This is a representation of employee data that would be fetched from your database.
const mockEmployees: AdminEmployee[] = [
  {
    id: 'EMP-001',
    email: 'john.doe@example.com',
    totalEarnings: 0,
    withdrawalRequest: null,
    createdAt: '2024-07-20',
  },
  {
    id: 'EMP-002',
    email: 'jane.smith@example.com',
    totalEarnings: 0,
    withdrawalRequest: null,
    createdAt: '2024-07-22',
  },
  {
    id: 'EMP-003',
    email: 'sam.wilson@email.com',
    totalEarnings: 0,
    withdrawalRequest: null,
    createdAt: '2024-06-15',
  },
    {
    id: 'EMP-004',
    email: 'linda.ray@email.com',
    totalEarnings: 0,
    withdrawalRequest: null,
    createdAt: '2024-05-01',
  },
];

export function EmployeeManager() {
  const [employees, setEmployees] = useState<AdminEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch data from your backend API here.
    // For demonstration, we're simulating a network request with a timeout.
    const fetchEmployees = async () => {
        setIsLoading(true);
        // Example: const response = await fetch('/api/admin/employees');
        // const data = await response.json();
        // setEmployees(data);
        setTimeout(() => {
            setEmployees(mockEmployees);
            setIsLoading(false);
        }, 1500); // Simulate a 1.5-second network delay
    };

    fetchEmployees();
  }, []);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>
            View and manage all registered employees.
          </CardDescription>
        </div>
         <Button variant="outline">View All Employees</Button>
      </CardHeader>
      <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Total Earnings (INR)</TableHead>
                <TableHead className="text-right">Withdrawal Request (INR)</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell>
                            <div className="flex items-center justify-center">
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))
              ) : (
                employees.map((employee) => (
                    <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell className="text-right">{employee.totalEarnings.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                        {employee.withdrawalRequest ? (
                            <Badge variant="destructive">{employee.withdrawalRequest.amount.toFixed(2)}</Badge>
                        ) : (
                            <span className="text-muted-foreground">-</span>
                        )}
                    </TableCell>
                    <TableCell>{employee.createdAt}</TableCell>
                    <TableCell>
                        <div className="flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </CardContent>
    </Card>
  );
}
