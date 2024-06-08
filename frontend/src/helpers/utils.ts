import { DIFFICULTY_LEVELS } from "../constants";
import { COLORS, MESSAGES, PERFORMANCE } from "../types";

export const getCurrentTime = () => {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

export const getPercentage = (val1: number, val2: number): number => {
  return (val1 / val2) * 100 || 0;
};

const toSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};
const toTimeFormat = (seconds: any) => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  seconds = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
export const getTimeDifference = (startTime: string, endTime: string) => {
  const startSeconds = toSeconds(startTime);
  const endSeconds = toSeconds(endTime);
  let difference = endSeconds - startSeconds;
  return toTimeFormat(difference);
};

export const getTimePercentage = (t1: string, t2: string) => {
  const t1InSecs = toSeconds(t1);
  const t2InSecs = toSeconds(t2);
  return (t1InSecs / t2InSecs) * 100;
};

export const checkPropertiesExist = (obj: any, properties: string[]) => {
  return properties.every((prop) => !(prop in obj));
};

// getNextDifficultyLevel;
export const getNextDifficultyLevel = (
  isCorrect: boolean,
  currentDifficulty: string
): string => {
  const currentQuestionLevelIndex =
    DIFFICULTY_LEVELS.indexOf(currentDifficulty);
  let finalDifficultyIndex = isCorrect
    ? currentQuestionLevelIndex + 1
    : currentQuestionLevelIndex - 1;
  finalDifficultyIndex = Math.max(0, Math.min(2, finalDifficultyIndex));
  return DIFFICULTY_LEVELS[finalDifficultyIndex];
};

//getPerformanceMessage
export const getPerformanceMessage = (percentage: number) => {
  if (percentage >= 80) {
    return {
      message: MESSAGES.EXCELLENT,
      title: PERFORMANCE.EXCELLENT,
      color: COLORS.EXCELLENT,
    };
  } else if (percentage >= 60) {
    return {
      message: MESSAGES.PASSED,
      title: PERFORMANCE.PASSED,
      color: COLORS.PASSED,
    };
  } else if (percentage >= 35) {
    return {
      message: MESSAGES.AVERAGE,
      title: PERFORMANCE.AVERAGE,
      color: COLORS.AVERAGE,
    };
  } else {
    return {
      message: MESSAGES.FAILED,
      title: PERFORMANCE.FAILED,
      color: COLORS.FAILED,
    };
  }
};
