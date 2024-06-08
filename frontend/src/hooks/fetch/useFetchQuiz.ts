import { useEffect, useState } from "react";
import { getRequest } from "../../services/api";
import { QUIZ_URL } from "../../services/endpoints";
import { useShowToast } from "../useShowToast";
import { useQuizStore } from "../../store/useQuizStore";
import { useAuthStore } from "../../store/useAuthStore";

export const useFetchQuiz = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const { setQuestions, setQuiz } = useQuizStore();
  const { isAuth } = useAuthStore();
  //getQuizData
  const getQuizData = async () => {
    try {
      setLoading(true);
      const quiz = await getRequest(QUIZ_URL);
      if (quiz) {
        setQuiz({
          title: quiz.title,
          description: quiz.description,
          instructions: quiz.instructions,
          timeLeft: quiz.timeLeft,
        });
        setQuestions(quiz.questions);
      }
    } catch (error: any) {
      showToast(error.response.data, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuth) getQuizData();
  }, [isAuth]);
  return { loading };
};
