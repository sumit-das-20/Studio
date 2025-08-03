
import { AdminBuyer, SocialTask } from "./types";

// This is a representation of buyer data fetched from the database.
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
        totalTasks: 2, // Reduced for easier testing
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
        totalTasks: 3, // Reduced for easier testing
        createdAt: '2024-07-26',
      },
    ],
  },
];


// This is a representation of tasks generated from a buyer's campaign.
// In a real app, this data would be fetched from a database.
export let socialTasks: SocialTask[] = [
    // YouTube
    ...Array.from({ length: 4 }, (_, i) => ({
        id: 100 + i,
        type: "Subscribe",
        title: `Subscribe to: Tech Reviews ${i+1}`,
        link: "https://youtube.com/channel/example",
        reward: 2.00,
        platform: 'YouTube' as const,
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
        id: 200 + i,
        type: "Like & Comment",
        title: `Like Video: "My New Setup Tour 2024"`,
        link: "https://youtube.com/watch?v=example",
        reward: 0.50,
        platform: 'YouTube' as const,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
        id: 300 + i,
        type: "Watch Video",
        title: `Watch Video: "Summer Fashion Lookbook"`,
        link: "https://youtube.com/watch?v=example",
        reward: 1.00,
        platform: 'YouTube' as const,
    })),
    // Facebook
    ...Array.from({ length: 2 }, (_, i) => ({
        id: 400 + i,
        type: "Follow Page",
        title: `Follow Page: Gadget Gurus`,
        link: "https://facebook.com/example",
        reward: 1.00,
        platform: 'Facebook' as const,
    })),
    // Instagram
    ...Array.from({ length: 5 }, (_, i) => ({
        id: 500 + i,
        type: "Follow Account",
        title: `Follow Account: @TravelVibes`,
        link: "https://instagram.com/example",
        reward: 1.50,
        platform: 'Instagram' as const,
    })),
];

// Function to add new tasks to the list.
// In a real app, this would be an API call.
export function addSocialTasks(newTasks: SocialTask[]) {
    socialTasks = [...newTasks, ...socialTasks];
}

// Function to handle task completion and campaign progress
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
        // If campaign is complete, filter out all tasks associated with it
        socialTasks = socialTasks.filter(task => task.campaignId !== campaignId);
        console.log(`Campaign ${campaignId} completed. Associated tasks removed.`);
    } else {
        // Optionally, remove just the one completed task
        // socialTasks = socialTasks.filter(task => task.id !== taskId);
    }
}
