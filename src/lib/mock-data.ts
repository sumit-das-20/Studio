

import { AdminBuyer, SocialTask, AdminTask, AdminEmployee, AdminWithdrawalRequest, AdminCampaign } from "./types";

// --- Buyers Data ---
export let initialBuyers: AdminBuyer[] = [
  {
    id: 'BUYER-001',
    companyName: 'Tech Gadgets Inc.',
    email: 'contact@techgadgets.com',
    createdAt: '2024-07-28',
    totalSpent: 150.00,
    campaigns: [
      {
        id: 'CAMP-001',
        serviceType: 'YouTube Subscribers',
        targetLink: 'https://youtube.com/channel/example1',
        tasksCreated: false,
        tasksCompleted: 0,
        totalTasks: 2,
        createdAt: '2024-07-29',
      },
       {
        id: 'CAMP-002',
        serviceType: 'Instagram Followers',
        targetLink: 'https://instagram.com/techgadgets',
        tasksCreated: false,
        tasksCompleted: 0,
        totalTasks: 5,
        createdAt: '2024-07-30',
      },
    ],
  },
  {
    id: 'BUYER-002',
    companyName: 'Fashion Forward',
    email: 'style@fashionforward.co',
    createdAt: '2024-07-25',
    totalSpent: 250.00,
    campaigns: [
      {
        id: 'CAMP-003',
        serviceType: 'Facebook Page Likes',
        targetLink: 'https://facebook.com/fashionforward',
        tasksCreated: false,
        tasksCompleted: 0,
        totalTasks: 3,
        createdAt: '2024-07-26',
      },
    ],
  },
];


// --- All Tasks for Admin Panel & Employee Pages ---
export let initialAllTasks: AdminTask[] = [
  {
    id: 'TASK-001',
    type: 'Click and Earn',
    question: 'What is your primary hobby?',
    reward: 0.25,
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    createdAt: '2024-07-30',
  },
  {
    id: 'TASK-002',
    type: 'Watch and Earn',
    question: 'What brand of phone do you use?',
    reward: 0.75,
    adUnitId: 'ca-app-pub-3940256099942544/2247696110',
    createdAt: '2024-07-29',
  },
   {
    id: 'TASK-005',
    type: 'Link Shortener',
    link: 'https://short.url/promo-xyz',
    reward: 0.15,
    createdAt: '2024-07-26',
  },
  {
    id: 'TASK-003',
    type: 'Quiz',
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
    reward: 1.50,
    createdAt: '2024-07-28',
  },
  {
    id: 'TASK-004',
    type: 'Social Media',
    platform: 'YouTube',
    socialTaskType: 'Subscribe',
    title: 'Subscribe to our YouTube Channel',
    link: 'https://youtube.com/example',
    reward: 2.00,
    createdAt: '2024-07-27',
  }
];

// This is a representation of tasks generated from a buyer's campaign.
export let initialSocialTasks: SocialTask[] = [];


// --- Employee Data ---
export let initialEmployees: AdminEmployee[] = [
  {
    id: 'EMP-001',
    email: 'john.doe@example.com',
    totalEarnings: 1250.75,
    withdrawalRequest: null,
    createdAt: '2024-07-20',
  },
  {
    id: 'EMP-002',
    email: 'jane.smith@example.com',
    totalEarnings: 750.00,
    withdrawalRequest: null,
    createdAt: '2024-07-22',
  },
  {
    id: 'EMP-003',
    email: 'sam.wilson@email.com',
    totalEarnings: 2800.00,
    withdrawalRequest: null,
    createdAt: '2024-06-15',
  },
    {
    id: 'EMP-004',
    email: 'linda.ray@email.com',
    totalEarnings: 50.25,
    withdrawalRequest: null,
    createdAt: '2024-05-01',
  },
];


// --- Withdrawal Requests ---
export let initialWithdrawalRequests: AdminWithdrawalRequest[] = [
  {
    id: 'WR-001',
    employeeId: 'EMP-001',
    employeeEmail: 'john.doe@example.com',
    amount: 500.0,
    method: 'UPI',
    status: 'Pending',
    createdAt: '2024-07-30',
    upiId: 'john.doe@okhdfcbank',
  },
  {
    id: 'WR-002',
    employeeId: 'EMP-003',
    employeeEmail: 'sam.wilson@email.com',
    amount: 1500.0,
    method: 'Bank Transfer',
    status: 'Pending',
    createdAt: '2024-07-29',
    bankDetails: {
        accountHolderName: 'Sam Wilson',
        bankName: 'State Bank of India',
        accountNumber: '12345678901',
        ifscCode: 'SBIN0001234'
    }
  },
];


// --- Functions to Mutate Mock Data ---

export function addAdminTask(newTask: AdminTask) {
    initialAllTasks.unshift(newTask);
}

export function updateAdminTask(updatedTask: AdminTask) {
    initialAllTasks = initialAllTasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
}

export function deleteAdminTask(taskId: string) {
    initialAllTasks = initialAllTasks.filter(task => task.id !== taskId);
}

export function addSocialTasks(newTasks: SocialTask[]) {
    initialSocialTasks.unshift(...newTasks);

    const newAdminTasks: AdminTask[] = newTasks.map(task => ({
        id: `SOCIAL-${task.id}`,
        type: 'Social Media',
        reward: task.reward || 0,
        createdAt: new Date().toISOString().split('T')[0],
        platform: task.platform,
        socialTaskType: task.type,
        title: task.title,
        link: task.link,
    }));
    // Add to the main task list as well
    initialAllTasks.unshift(...newAdminTasks);
}

export function completeSocialTask(taskId: number, campaignId: string) {
    let campaignCompleted = false;

    initialBuyers = initialBuyers.map(buyer => {
        const campaign = buyer.campaigns.find(c => c.id === campaignId);
        if (campaign) {
            campaign.tasksCompleted += 1; 

            if (campaign.tasksCompleted >= campaign.totalTasks) {
                campaignCompleted = true;
            }
        }
        return buyer;
    });

    if (campaignCompleted) {
        initialSocialTasks = initialSocialTasks.filter(task => task.campaignId !== campaignId);
        console.log(`Campaign ${campaignId} completed. Associated tasks removed.`);
    }
}

export function updateEmployee(employeeId: string, updates: Partial<AdminEmployee>) {
    initialEmployees = initialEmployees.map(emp => emp.id === employeeId ? { ...emp, ...updates } : emp);
}

export function addWithdrawalRequest(request: AdminWithdrawalRequest) {
    initialWithdrawalRequests.unshift(request);
    updateEmployee(request.employeeId, { withdrawalRequest: request });
}

export function updateWithdrawalRequest(requestId: string, updates: Partial<AdminWithdrawalRequest>) {
    let employeeIdToUpdate: string | null = null;
    initialWithdrawalRequests = initialWithdrawalRequests.map(req => {
        if (req.id === requestId) {
            employeeIdToUpdate = req.employeeId;
            return { ...req, ...updates };
        }
        return req;
    });

    if (employeeIdToUpdate) {
        if (updates.status && updates.status !== 'Pending') {
            updateEmployee(employeeIdToUpdate, { withdrawalRequest: null });
        }
    }
}

export function updateCampaign(buyerId: string, campaignId: string, updates: Partial<AdminCampaign>) {
    initialBuyers = initialBuyers.map(b => {
        if (b.id === buyerId) {
            return {
                ...b,
                campaigns: b.campaigns.map(c => {
                    if (c.id === campaignId) {
                        return { ...c, ...updates };
                    }
                    return c;
                })
            };
        }
        return b;
    });
}
