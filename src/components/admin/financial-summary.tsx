
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
import type { AdminBuyer, AdminCampaign, AdPerformance, LinkPerformance, AdminWithdrawalRequest } from '@/lib/types';


// --- Mock Data Imports ---
// In a real application, this data would come from API calls, not mock imports.
// This is done for demonstration purposes to build the detailed CSV export.

// Ad Revenue Data
const adPerformanceData: AdPerformance[] = [
  { adUnitId: 'ca-app-pub-3940256099942544/6300978111', type: 'Banner', impressions: 12543, earnings: 450.75 },
  { adUnitId: 'ca-app-pub-3940256099942544/5224354917', type: 'Rewarded Video', impressions: 8765, earnings: 1230.50 },
  { adUnitId: 'ca-app-pub-3940256099942544/1033173712', type: 'Banner', impressions: 9876, earnings: 320.10 },
  { adUnitId: 'ca-app-pub-3940256099942544/8691691433', type: 'Other', impressions: 2345, earnings: 150.00 },
];

// Link Shortener Data
const linkPerformanceData: LinkPerformance[] = [
  { linkId: 'LNK-001', url: 'https://short.link/example1', clicks: 1243, earnings: 124.30 },
  { linkId: 'LNK-002', url: 'https://short.link/example2', clicks: 987, earnings: 98.70 },
  { linkId: 'LNK-003', url: 'https://short.link/example3', clicks: 1228, earnings: 122.80 },
];

// Buyer Data
const buyersData: AdminBuyer[] = [
  { id: 'BUYER-001', companyName: 'Tech Gadgets Inc.', email: 'contact@techgadgets.com', createdAt: '2024-07-28', totalSpent: 150.00, campaigns: [] },
  { id: 'BUYER-002', companyName: 'Fashion Forward', email: 'style@fashionforward.co', createdAt: '2024-07-25', totalSpent: 250.00, campaigns: [] },
];

// Employee Payout Data
const employeePayoutsData: AdminWithdrawalRequest[] = [
    { id: 'WR-001', transactionId: 'T20240730A', employeeId: 'EMP-001', employeeEmail: 'john.doe@example.com', amount: 500.0, method: 'UPI', status: 'Paid', createdAt: '2024-07-30', upiId: 'john.doe@okhdfcbank' },
    { id: 'WR-002', transactionId: 'T20240729B', employeeId: 'EMP-003', employeeEmail: 'sam.wilson@email.com', amount: 1500.0, method: 'Bank Transfer', status: 'Paid', createdAt: '2024-07-29', bankDetails: { accountHolderName: 'Sam Wilson', bankName: 'State Bank of India', accountNumber: '12345678901', ifscCode: 'SBIN0001234' } },
    { id: 'WR-004', transactionId: 'T20240727C', employeeId: 'EMP-002', employeeEmail: 'jane.smith@example.com', amount: 250.50, method: 'PayPal', status: 'Paid', createdAt: '2024-07-27', paypalEmail: 'jane.s@paypal.com' },
];

// --- Calculations ---
const adRevenue = adPerformanceData.reduce((acc, ad) => acc + ad.earnings, 0);
const linkRevenue = linkPerformanceData.reduce((acc, link) => acc + link.earnings, 0);
const buyerRevenue = buyersData.reduce((acc, buyer) => acc + buyer.totalSpent, 0);
const totalEmployeePayouts = employeePayoutsData.reduce((acc, req) => acc + req.amount, 0);

const totalRevenue = adRevenue + linkRevenue + buyerRevenue;
const totalExpenses = totalEmployeePayouts;
const netProfit = totalRevenue - totalExpenses;

const financialData = {
  revenue: { total: totalRevenue, sources: [
    { name: 'Ad Revenue', amount: adRevenue, icon: RadioTower },
    { name: 'Link Shortener Revenue', amount: linkRevenue, icon: LinkIcon },
    { name: 'Buyer Campaigns', amount: buyerRevenue, icon: ShoppingBag },
  ]},
  expenses: { total: totalExpenses, sources: [{ name: 'Employee Payouts', amount: totalEmployeePayouts, icon: TrendingUp }] },
  net: { total: netProfit, isProfit: netProfit >= 0 },
};

export function FinancialSummary() {

  const handleExport = () => {
    // Helper to escape commas in strings for CSV
    const escapeCsv = (str: string | number | undefined) => `"${String(str || '').replace(/"/g, '""')}"`;
    
    let csvContent = "";
    
    // Section 1: Employee Payouts
    csvContent += "Employee Payouts\n";
    const payoutHeaders = ["Payment Date", "Transaction ID", "Employee Email", "Amount (INR)", "Payment Method", "Payment Details"];
    csvContent += payoutHeaders.map(escapeCsv).join(',') + '\n';
    employeePayoutsData.forEach(p => {
        let details = '';
        if (p.method === 'UPI') details = p.upiId || '';
        if (p.method === 'PayPal') details = p.paypalEmail || '';
        if (p.method === 'Bank Transfer' && p.bankDetails) {
            details = `Name: ${p.bankDetails.accountHolderName}, Bank: ${p.bankDetails.bankName}, Acc: ${p.bankDetails.accountNumber}, IFSC: ${p.bankDetails.ifscCode}`;
        }
        const row = [p.createdAt, p.transactionId, p.employeeEmail, p.amount.toFixed(2), p.method, details];
        csvContent += row.map(escapeCsv).join(',') + '\n';
    });
    csvContent += "\n"; // Add a blank line for separation

    // Section 2: Ad Revenue
    csvContent += "Ad Revenue\n";
    const adHeaders = ["Ad Unit ID", "Type", "Impressions", "Earnings (INR)"];
    csvContent += adHeaders.map(escapeCsv).join(',') + '\n';
    adPerformanceData.forEach(ad => {
        const row = [ad.adUnitId, ad.type, ad.impressions, ad.earnings.toFixed(2)];
        csvContent += row.map(escapeCsv).join(',') + '\n';
    });
    csvContent += "\n";

    // Section 3: Link Shortener Revenue
    csvContent += "Link Shortener Revenue\n";
    const linkHeaders = ["Link URL", "Clicks", "Earnings (INR)"];
    csvContent += linkHeaders.map(escapeCsv).join(',') + '\n';
    linkPerformanceData.forEach(link => {
        const row = [link.url, link.clicks, link.earnings.toFixed(2)];
        csvContent += row.map(escapeCsv).join(',') + '\n';
    });
    csvContent += "\n";

    // Section 4: Buyer Payments
    csvContent += "Buyer Payments\n";
    const buyerHeaders = ["Company Name", "Email", "Total Spent (INR)"];
    csvContent += buyerHeaders.map(escapeCsv).join(',') + '\n';
    buyersData.forEach(buyer => {
        const row = [buyer.companyName, buyer.email, buyer.totalSpent.toFixed(2)];
        csvContent += row.map(escapeCsv).join(',') + '\n';
    });

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "detailed_financial_report.csv");
    link.style.visibility = 'hidden';
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
          Export Detailed Report (CSV)
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
