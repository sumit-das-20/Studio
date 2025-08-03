

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
    question: string;
    reward: number;
    adUnitId: string;
    type: 'Click and Earn' | 'Watch and Earn';
    createdAt: string;
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
  status: 'Pending' | 'Approved' | 'On Hold' | 'Cancelled';
  createdAt: string;
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
}
