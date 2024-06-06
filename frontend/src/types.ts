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

export interface Question {
  _id: string;
  question: string;
  options: string[];
  answerIndex: number;
  tag: string;
  difficulty: string;
  points: number;
}

export type AttemptedQuestion = {
  _id: string;
  questionId: string;
  selectedAnswerIndex: number;
  isCorrect: boolean;
  difficulty: string;
};

export enum DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
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
export type UserResponse = { msg: string; user: RawUser };
