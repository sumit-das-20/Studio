export type SimpleTaskType = {
  id: number;
  question: string;
  reward?: number;
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
