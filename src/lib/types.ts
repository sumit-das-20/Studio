

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
  withdrawalRequest: number | null;
  createdAt: string;
};
