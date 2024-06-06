import { create } from "zustand";
import { AttemptedQuestion, DIFFICULTY, Question } from "../types";
import { devtools, persist } from "zustand/middleware";
import { DIFFICULTY_LEVELS } from "../constants";

interface QuizState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  timeup: boolean;
  setTimeup: (timeup: boolean) => void;
  attemptedQuestions: AttemptedQuestion[];
  setAttemptedQuestions: (attemptedQuestions: AttemptedQuestion[]) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  endTime: string;
  setEndTime: (endTime: string) => void;
  totalPoints: () => number;
  getPointByLevel: () => number[];
  getTotalPointsByLevel: () => {
    easy: number;
    medium: number;
    hard: number;
  };
  getAttemptedPointsByLevel: () => {
    easy: number;
    medium: number;
    hard: number;
  };
}

export const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        setQuestions: (questions: Question[]) => set({ questions }),
        timeup: false,
        setTimeup: (timeup: boolean) => set({ timeup }),
        attemptedQuestions: [],
        setAttemptedQuestions: (attemptedQuestions: AttemptedQuestion[]) =>
          set({ attemptedQuestions }),
        startTime: "",
        endTime: "",
        setStartTime: (time: string) => set({ startTime: time }),
        setEndTime: (time: string) => set({ endTime: time }),
        // totalPoints
        totalPoints: () => {
          return get().questions.reduce((total, question) => {
            return (total += question.points);
          }, 0);
        },
        // totalPointsByLevel
        getTotalPointsByLevel: () => {
          return get().questions.reduce(
            (obj, q) => {
              switch (q.difficulty) {
                case DIFFICULTY.EASY:
                  obj.easy += q.points || 0;
                  break;
                case DIFFICULTY.MEDIUM:
                  obj.medium += q.points || 0;
                  break;
                case DIFFICULTY.HARD:
                  obj.hard += q.points || 0;
                  break;
                default:
                  break;
              }
              return obj;
            },
            { easy: 0, medium: 0, hard: 0 }
          );
        },
        getPointByLevel: () => {
          return DIFFICULTY_LEVELS.map((level) => {
            return (
              get().questions.find((q) => q.difficulty == level)?.points || 0
            );
          });
        },
        // attemptedPointsByLevel
        getAttemptedPointsByLevel: () => {
          const pt = get().getPointByLevel();
          return get().attemptedQuestions.reduce(
            (obj, tq) => {
              if (!tq.isCorrect) return obj;
              switch (tq.difficulty) {
                case DIFFICULTY.EASY:
                  obj.easy += pt[0] || 0;
                  break;
                case DIFFICULTY.MEDIUM:
                  obj.medium += pt[1] || 0;
                  break;
                case DIFFICULTY.HARD:
                  obj.hard += pt[2] || 0;
                  break;
                default:
                  break;
              }
              return obj;
            },
            { easy: 0, medium: 0, hard: 0 }
          );
        },
      }),
      {
        name: "quiz-storage",
        partialize: (state) => ({
          questions: state.questions,
          attemptedQuestions: state.attemptedQuestions,
          startTime: state.startTime,
          endTime: state.endTime,
        }),
      }
    )
  )
);
