
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
import { useState } from 'react';

// This is a representation of employee data fetched from the database.
const initialEmployees: AdminEmployee[] = [
  {
    id: 'EMP-001',
    email: 'john.doe@example.com',
    totalEarnings: 1250.75,
    withdrawalRequest: 500.00,
    createdAt: '2024-07-20',
  },
  {
    id: 'EMP-002',
    email: 'jane.smith@example.com',
    totalEarnings: 340.00,
    withdrawalRequest: null,
    createdAt: '2024-07-22',
  },
  {
    id: 'EMP-003',
    email: 'sam.wilson@email.com',
    totalEarnings: 5600.20,
    withdrawalRequest: 1500.00,
    createdAt: '2024-06-15',
  },
    {
    id: 'EMP-004',
    email: 'linda.ray@email.com',
    totalEarnings: 850.00,
    withdrawalRequest: null,
    createdAt: '2024-05-01',
  },
];

export function EmployeeManager() {
  const [employees, setEmployees] = useState<AdminEmployee[]>(initialEmployees);

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
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell className="text-right">{employee.totalEarnings.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {employee.withdrawalRequest ? (
                         <Badge variant="destructive">{employee.withdrawalRequest.toFixed(2)}</Badge>
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
              ))}
            </TableBody>
          </Table>
      </CardContent>
    </Card>
  );
}
