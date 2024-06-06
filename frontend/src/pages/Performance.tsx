import { Navigate } from "react-router-dom";
import { useQuizStore } from "../store/useQuizStore"
import { Stack, VStack } from "@chakra-ui/react";
import TotalTime from "../components/performance/TotalTime";
import Result from "../components/performance/Result";
import QuestionsAccordion from "../components/performance/QuestionsAccordion";
import Respondent from "../components/performance/Respondent";
import Summary from "../components/performance/Summary";
import { COLORS, MESSAGES, PERFORMANCE } from "../types";

function Performance() {
    const { attemptedQuestions, questions, totalPoints } = useQuizStore();
    //getPercentage
    const totalPts = totalPoints();
    const questionsMap = new Map(questions.map((question) => [question._id, question.points]))
    const attemptedPts = attemptedQuestions.reduce((totalUserScore, attemptedQ) => {
        if (attemptedQ.isCorrect) {
            return totalUserScore + (questionsMap.get(attemptedQ.questionId) || 0);
        }
        return totalUserScore;
    }, 0)
    const percentage = parseInt(((attemptedPts / totalPts) * 100).toFixed(2));
    //getPerformanceMessage
    const getPerformanceMessage = () => {
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
                color: COLORS.PASSED
            };
        } else if (percentage >= 35) {
            return {
                message: MESSAGES.AVERAGE,
                title: PERFORMANCE.AVERAGE,
                color: COLORS.AVERAGE
            };
        }
        else {
            return {
                message: MESSAGES.FAILED,
                title: PERFORMANCE.FAILED,
                color: COLORS.FAILED
            }
        }
    }
    const { message, title, color } = getPerformanceMessage();
    //JSX
    if (attemptedQuestions.length === 0) {
        return <Navigate to="/dashboard" />
    }
    return (
        <VStack spacing={'15px'}>
            <Respondent />
            <Summary message={message} />
            <Stack spacing={'15px'} width={'100%'} direction={{ base: 'column', md: 'row' }}>
                <Result percentage={percentage} points={attemptedPts}
                    color={color}
                    title={title} />
                <TotalTime />
            </Stack>
            <QuestionsAccordion />
        </VStack>
    )
}

export default Performance;


