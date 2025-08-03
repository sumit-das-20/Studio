
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  ArrowUp,
  Download,
  IndianRupee,
  Link as LinkIcon,
  RadioTower,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

// --- Mock Data Fetching ---
// In a real application, this data would come from a combination of database queries and API calls.
// For demonstration, we are re-using the mock data from other components.

// Revenue Sources
const adRevenue = 2151.35; // from AdPerformanceDashboard
const linkRevenue = 345.80; // from LinkShortenerPerformance
const buyerRevenue = 400.00; // from BuyerManager (totalSpent)

// Expense Sources
const employeePayouts = 2250.50; // from WithdrawalRequestManager

const totalRevenue = adRevenue + linkRevenue + buyerRevenue;
const totalExpenses = employeePayouts;
const netProfit = totalRevenue - totalExpenses;

const financialData = {
  revenue: {
    total: totalRevenue,
    sources: [
      { name: 'Ad Revenue', amount: adRevenue, icon: RadioTower },
      { name: 'Link Shortener Revenue', amount: linkRevenue, icon: LinkIcon },
      { name: 'Buyer Campaigns', amount: buyerRevenue, icon: ShoppingBag },
    ],
  },
  expenses: {
    total: totalExpenses,
    sources: [{ name: 'Employee Payouts', amount: employeePayouts, icon: TrendingUp }],
  },
  net: {
    total: netProfit,
    isProfit: netProfit >= 0,
  },
};

export function FinancialSummary() {

  const handleExport = () => {
    const headers = ["Category", "Item", "Amount (INR)"];
    
    const rows = [
        ...financialData.revenue.sources.map(s => ['Revenue', s.name, s.amount.toFixed(2)]),
        ['Revenue', 'Total Revenue', financialData.revenue.total.toFixed(2)],
        [], // Empty row for separation
        ...financialData.expenses.sources.map(s => ['Expenses', s.name, s.amount.toFixed(2)]),
        ['Expenses', 'Total Expenses', financialData.expenses.total.toFixed(2)],
        [], // Empty row
        ['Summary', 'Net Profit/Loss', financialData.net.total.toFixed(2)],
    ];

    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "financial_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>
            An overview of the platform's revenue, expenses, and net profit.
          </CardDescription>
        </div>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Column */}
        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span>Total Revenue</span>
          </h3>
          <p className="text-3xl font-bold flex items-center">
             <IndianRupee className="h-7 w-7 mr-1" />
             {financialData.revenue.total.toFixed(2)}
          </p>
          <div className="space-y-2 text-sm">
            {financialData.revenue.sources.map(source => (
                <div key={source.name} className="flex justify-between items-center text-muted-foreground">
                    <span className="flex items-center gap-2"><source.icon className="h-4 w-4" /> {source.name}</span>
                    <span className="font-medium text-foreground">{source.amount.toFixed(2)}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Expenses Column */}
        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
            <TrendingDown className="h-5 w-5" />
            <span>Total Expenses</span>
          </h3>
          <p className="text-3xl font-bold flex items-center">
            <IndianRupee className="h-7 w-7 mr-1" />
            {financialData.expenses.total.toFixed(2)}
          </p>
           <div className="space-y-2 text-sm">
            {financialData.expenses.sources.map(source => (
                <div key={source.name} className="flex justify-between items-center text-muted-foreground">
                    <span className="flex items-center gap-2"><source.icon className="h-4 w-4" /> {source.name}</span>
                    <span className="font-medium text-foreground">{source.amount.toFixed(2)}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Net Profit Column */}
        <div className={`space-y-4 rounded-lg p-4 ${financialData.net.isProfit ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
          <h3 className={`flex items-center gap-2 text-lg font-semibold ${financialData.net.isProfit ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
             {financialData.net.isProfit ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
            <span>Net {financialData.net.isProfit ? 'Profit' : 'Loss'}</span>
          </h3>
          <p className={`text-3xl font-bold flex items-center ${financialData.net.isProfit ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
            <IndianRupee className="h-7 w-7 mr-1" />
            {financialData.net.total.toFixed(2)}
          </p>
          <p className={`text-sm ${financialData.net.isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            This is the calculated difference between total revenue and total expenses.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
