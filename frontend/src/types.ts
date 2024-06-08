export type SignupData = {
  name: string;
  email: string;
  password: string;
};
export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  username: string;
  googleId: string;
  profileUrl: string;
};

export interface RawUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  googleId?: string;
  username?: string;
  profileUrl?: string;
  token: string;
}
export type UserResponse = {
  msg: string;
  user: RawUser;
};

export type Quiz = {
  timeLeft: string;
  title: string;
  description: string;
  instructions: string[];
};

export type QuestionOption = {
  _id: string;
  questionId: string;
  option: string;
  isCorrect: boolean;
};
export interface Question {
  _id: string;
  text: string;
  tag: string;
  difficulty: string;
  points: string;
  options: QuestionOption[];
  correct_option: QuestionOption;
  answerIndex: number;
}

export type Answer = {
  _id: string;
  questionId: string;
  isCorrect: boolean;
  selectedOption: string;
};

export enum DIFFICULTY {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export enum PERFORMANCE {
  EXCELLENT = "Excellent",
  AVERAGE = "Average",
  PASSED = "Test Passed",
  FAILED = "Test Failed",
}

export enum COLORS {
  EXCELLENT = "#008000",
  PASSED = "#FFA500",
  AVERAGE = "#FFB74D",
  FAILED = "red",
}

export enum MESSAGES {
  EXCELLENT = "Congratulations! You passed the test with flying colors.",
  PASSED = "Good effort! You have passed the test.",
  AVERAGE = "You have passed the test, but there's room for improvement.",
  FAILED = "Unfortunately your score was too low to pass the test.",
}

export enum LEVEL_COLORS {
  EASY = "blue",
  MEDIUM = "orange",
  HARD = "red",
}

export type ResultType = {
  percentage: number;
  totalScore: number;
  userScore: number;
  createdAt: string;
  updatedAt: string;
};
