import { create } from "zustand";
import { Answer, Question, Quiz } from "../types";
import { devtools, persist } from "zustand/middleware";

interface QuizState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set) => ({
        loading: false,
        setLoading: (loading: boolean) => set({ loading }),
        questions: [],
        setQuestions: (questions: Question[]) => set({ questions }),
        answers: [],
        setAnswers: (answers: Answer[]) => set({ answers }),
        quiz: { title: "", description: "", instructions: [], timeLeft: "" },
        setQuiz: (quiz: Quiz) => set({ quiz }),
      }),
      {
        name: "quiz-storage",
        partialize: (state) => ({
          questions: state.questions,
          quiz: state.quiz,
          answers: state.answers,
        }),
      }
    )
  )
);
