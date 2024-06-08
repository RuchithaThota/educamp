import { useEffect, useState } from "react";
import { postRequest } from "../../services/api";
import { QUIZ_SUBMIT_URL } from "../../services/endpoints";
import { useQuizStore } from "../../store/useQuizStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useFetchResultSubmit = (shouldFetchSubmitResult: boolean) => {
  const [loading, setLoading] = useState(false);
  const { answers, questions, setQuiz, setAnswers } = useQuizStore();
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();
  //getTotalScore
  const getTotalScore = () => {
    return questions.reduce((totalScore, question) => {
      return totalScore + parseInt(question?.points) || 0;
    }, 0);
  };
  //getUserScore
  const getUserScore = () => {
    return answers.reduce((userScore, answer) => {
      if (!answer.isCorrect) return userScore;
      const question = questions.find((q) => q._id === answer.questionId);
      const points = question ? parseInt(question.points) : 0;
      return userScore + points;
    }, 0);
  };
  //getQuizData
  const submitResult = async () => {
    const totalScore = getTotalScore();
    const userScore = getUserScore();
    const percentage = parseInt(((userScore / totalScore) * 100).toFixed(1));
    try {
      setLoading(true);
      const requestBody = {
        totalScore,
        userScore,
        percentage,
      };
      const data = await postRequest(QUIZ_SUBMIT_URL, requestBody);
      if (data) {
        navigate("/dashboard/view-performance");
        setLoading(false);
        console.log(data,"resultsubmitted");
        
      }
    } catch (error: any) {
      console.log(error.response.data, "error");
      if (error.response.status === 400) {
        setQuiz({ title: "", description: "", timeLeft: "", instructions: [] });
        setAnswers([]);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (isAuth && shouldFetchSubmitResult) submitResult();
  }, [isAuth, shouldFetchSubmitResult]);
  return { loading };
};
