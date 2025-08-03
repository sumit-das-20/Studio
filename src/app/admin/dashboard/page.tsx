

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, CircleDollarSign, Wallet, BarChart4, CreditCard, ClipboardList, ShoppingBag } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              registered in the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Buyers
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
             <p className="text-xs text-muted-foreground">
              with active campaigns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              currently running tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              earned this month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              processed this month
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      <span>Employee Management</span>
                  </CardTitle>
                  <CardDescription>View, manage, and monitor all employee accounts and their activities.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild>
                      <Link href="/admin/employees">Manage Employees</Link>
                  </Button>
              </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                      <span>Buyer Management</span>
                  </CardTitle>
                  <CardDescription>View all buyers, their campaigns, and manage their tasks.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild>
                      <Link href="/admin/buyers">Manage Buyers</Link>
                  </Button>
              </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span>Withdrawal Requests</span>
                  </CardTitle>
                  <CardDescription>Approve, hold, or decline withdrawal requests from employees.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/withdrawals">Manage Withdrawals</Link>
                  </Button>
              </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-6 w-6 text-primary" />
                      <span>Task Management</span>
                  </CardTitle>
                  <CardDescription>Create, edit, and manage all tasks available on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/tasks">Manage Tasks</Link>
                  </Button>
              </CardContent>
          </Card>
      </div>
    </main>
  );
}
