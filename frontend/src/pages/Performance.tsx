import { Stack, VStack } from "@chakra-ui/react";
import Respondent from "../components/performance/Respondent";
import Summary from "../components/performance/Summary";
import { useQuizStore } from "../store/useQuizStore";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../services/api";
import { QUIZ_RESULT_URL } from "../services/endpoints";
import FallbackSpinner from "../components/common/FallbackSpinner";
import { ResultType } from "../types";
import Result from "../components/performance/Result";
import TotalTime from "../components/performance/TotalTime";
import QuestionsAccordion from "../components/performance/QuestionsAccordion";


function Performance() {
    const { answers } = useQuizStore();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResultType | null>(null)
    const navigate = useNavigate();
    //getQuizResult
    const getQuizResult = async () => {
        try {
            setLoading(true);
            const data = await getRequest(QUIZ_RESULT_URL);
            console.log(data);
            if (data) {
                setResult(data);
            } else {
                navigate('/')
            }
        } catch (error: any) {
            console.log(error.response.data);
        } finally { setLoading(false) }
    }
    useEffect(() => {
        getQuizResult();
    }, [])
    if (answers.length === 0) return <Navigate to="/" />
    if (loading) return <FallbackSpinner />
    if (result)
        return (
            <VStack spacing={'15px'}>
                <Respondent />
                <Summary percentage={result.percentage} />
                <Stack spacing={'15px'} width={'100%'} direction={{ base: 'column', md: 'row' }}>
                    <Result percentage={result.percentage}
                        score={result.userScore}
                        totalScore={result.totalScore} />
                    <TotalTime createdAt={result.createdAt} updatedAt={result.updatedAt} />
                </Stack>
                <QuestionsAccordion />
            </VStack>
        )
}

export default Performance;


