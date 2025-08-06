

import { AdPerformanceDashboard } from "@/components/admin/ad-performance-dashboard";
import { FinancialSummary } from "@/components/admin/financial-summary";
import { LinkShortenerPerformance } from "@/components/admin/link-shortener-performance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, CircleDollarSign, CreditCard, ClipboardList, ShoppingBag, LandPlot, Tags, Bell } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <FinancialSummary />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
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
            <div className="text-2xl font-bold">2</div>
             <p className="text-xs text-muted-foreground">
              with active campaigns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2250.50</div>
            <p className="text-xs text-muted-foreground">
              processed this month
            </p>
          </CardContent>
        </Card>
      </div>

      <AdPerformanceDashboard />
      <LinkShortenerPerformance />

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Tags className="h-6 w-6 text-primary" />
                      <span>Service Management</span>
                  </CardTitle>
                  <CardDescription>Manage pricing for all social media services offered to buyers.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/services">Manage Services</Link>
                  </Button>
              </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-6 w-6 text-primary" />
                      <span>Ad Networks</span>
                  </CardTitle>
                  <CardDescription>Manage ad units from all monetization platforms.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/ad-networks">Manage Ad Networks</Link>
                  </Button>
              </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <LandPlot className="h-6 w-6 text-primary" />
                      <span>Payment Gateways</span>
                  </CardTitle>
                  <CardDescription>Configure and manage payment processing services.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/payment-gateways">Manage Gateways</Link>
                  </Button>
              </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Bell className="h-6 w-6 text-primary" />
                      <span>Push Notifications</span>
                  </CardTitle>
                  <CardDescription>Send notifications directly to all employees.</CardDescription>
              </CardHeader>
              <CardContent>
                   <Button asChild>
                      <Link href="/admin/push-notifications">Send Notifications</Link>
                  </Button>
              </CardContent>
          </Card>
      </div>
    </main>
  );
}
