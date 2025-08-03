

import type { LucideIcon } from "lucide-react";

export type SimpleTaskType = {
  id: number;
  question: string;
  reward?: number;
  adUnitId?: string;
};

export type LinkTask = {
  id: number;
  url: string;
  reward?: number;
};

export type QuizTask = {
  id: number;
  question: string;
  options: string[];
  reward?: number;
};

export type SocialTask = {
  id: number;
  type: string;
  title: string;
  reward?: number;
  link: string;
}

export type AdminTask = {
    id: string;
    type: 'Click and Earn' | 'Watch and Earn' | 'Link Shortener' | 'Quiz' | 'Social Media';
    reward: number;
    createdAt: string;
    
    // Simple & Quiz
    question?: string;
    
    // Simple Tasks
    adUnitId?: string;

    // Quiz
    options?: string[];

    // Social Media & Link Shortener
    link?: string;

    // Social Media
    platform?: 'YouTube' | 'Facebook' | 'Instagram';
    socialTaskType?: string; // e.g., 'Subscribe', 'Like & Comment'
    title?: string;
};


export type AdminEmployee = {
  id: string;
  email: string;
  totalEarnings: number;
  withdrawalRequest: AdminWithdrawalRequest | null;
  createdAt: string;
};


export type AdminWithdrawalRequest = {
  id: string;
  employeeId: string;
  employeeEmail: string;
  amount: number;
  method: 'UPI' | 'Bank Transfer' | 'PayPal';
  status: 'Pending' | 'Approved' | 'On Hold' | 'Cancelled' | 'Paid' | 'Processing';
  createdAt: string;
  transactionId?: string;
  upiId?: string;
  paypalEmail?: string;
  bankDetails?: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
};

export type AdminCampaign = {
    id: string;
    serviceType: string;
    targetLink: string;
    tasksCreated: number;
    totalTasks: number;
    createdAt: string;
}

export type AdminBuyer = {
    id: string;
    companyName: string;
    email: string;
    campaigns: AdminCampaign[];
    createdAt: string;
    totalSpent: number;
}

export type AdPerformance = {
    adUnitId: string;
    type: 'Banner' | 'Rewarded Video' | 'Other';
    impressions: number;
    earnings: number;
}

export type AdUnit = {
    id: string;
    name: string;
    unitId: string;
    type: 'Banner' | 'Rewarded Video' | 'Interstitial' | 'Other';
    network: 'AdMob' | 'AppLovin' | 'Unity Ads' | 'StartApp' | 'IronSource' | 'Chartboost' | 'InMobi' | 'Facebook';
};

export type AdNetwork = {
    name: AdUnit['network'];
    icon?: React.ComponentType<{ className?: string }>;
    adUnits: AdUnit[];
};

export type LinkPerformance = {
    linkId: string;
    url: string;
    clicks: number;
    earnings: number;
}

export type PaymentGateway = {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    isEnabled: boolean;
    apiKey?: string;
    apiSecret?: string;
};
