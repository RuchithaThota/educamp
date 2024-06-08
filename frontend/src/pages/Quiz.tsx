import { useEffect, useState } from "react";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import Timer from "../components/quiz/Timer";
import Chip from "../components/common/Chip";
import RadioQuestionOption from "../components/quiz/RadioQuestionOption";
import { useQuizStore } from "../store/useQuizStore";
import { DIFFICULTY, LEVEL_COLORS, Question } from "../types";
import { useShowToast } from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";
import { getNextDifficultyLevel } from "../helpers/utils";
import { postRequest } from "../services/api";
import { USER_ANSWER_URL } from "../services/endpoints";


function Quiz() {
    const { questions, answers, setAnswers } = useQuizStore();
    const showToast = useShowToast();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>(questions[0]);
    const [remainedQuestions, setRemainedQuestions] = useState<Question[]>([questions[0]]);
    const [count, setCount] = useState(1);
    const [selectedOptionId, setSelectedOptionId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (answers.length > 0) {
            navigate("/dashboard/view-performance")
        }
    }, [])
    //changeSelectedOptionId
    const changeSelectedOptionId = (value: string) => {
        setSelectedOptionId(value)
    }
    //getRemainingQuestions
    const getRemainingQuestions = (): Question[] => {
        return questions.filter(q => remainedQuestions.every(rq => rq._id !== q._id));
    }
    // handleSubmitAnswer
    const handleSubmitAnswer = () => {
        if (!selectedOptionId) { return showToast('please select an option', 'warning'); }
        if (count === questions.length) { return navigate('/dashboard/view-performance'); }
        setIsLoading(true)
        const rqs = getRemainingQuestions();
        const isCorrect = question.correct_option._id === selectedOptionId || false;
        const difficulty = getNextDifficultyLevel(isCorrect, question.difficulty);
        //nextQuestion
        let nextQuestion = rqs.find(rq => rq.difficulty === difficulty);
        if (!nextQuestion) {
            const nextDiff = getNextDifficultyLevel(isCorrect, difficulty);
            const nextDiffQuestion = rqs.find(rq => rq.difficulty === nextDiff);
            nextQuestion = nextDiffQuestion ? nextDiffQuestion :
                rqs.find(rq => rq.difficulty !== difficulty && rq.difficulty !== nextDiff)
        }
        if (nextQuestion) storeUserAnswer(nextQuestion);
    }
    //storeUserAnswer
    const storeUserAnswer = async (nextQuestion: Question) => {
        try {
            const requestBody = {
                questionId: question._id,
                selectedOption: selectedOptionId
            }
            const data = await postRequest(USER_ANSWER_URL, requestBody);
            if (data) {
                console.log(data);
                setQuestion(nextQuestion);
                setCount(count + 1);
                setSelectedOptionId('');
                setAnswers([...answers, data])
            }
        } catch (error: any) {
            console.log(error);
            showToast(error.response.data, 'error')
        } finally { setIsLoading(false) }
    }
    //useEffect
    useEffect(() => {
        if (questions[0]._id != question._id) {
            setRemainedQuestions([...remainedQuestions, question]);
        }
    }, [question])
    //JSX
    return (
        <VStack spacing={'15px'} align={'stretch'}>
            <Timer />
            <Card
                width={'100%'}
                padding="20px">
                <CardHeader>
                    <Heading fontSize={'md'} fontWeight={'medium'}>Question {count}/{questions.length}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={5}>
                        <Box>
                            <Text fontSize={'md'} fontWeight={'medium'}>{question.text}</Text>
                        </Box>
                        <HStack>
                            <Chip label={question.tag} colorScheme="green" />
                            <Chip label={question.difficulty}
                                colorScheme={question.difficulty === DIFFICULTY.HARD ? LEVEL_COLORS.HARD :
                                    question.difficulty === DIFFICULTY.MEDIUM ? LEVEL_COLORS.MEDIUM :
                                        LEVEL_COLORS.EASY} />
                        </HStack>
                        <RadioQuestionOption options={question.options}
                            selectedOptionId={selectedOptionId}
                            changeSelectedOptionId={changeSelectedOptionId} />
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Button
                        variant={'outline'}
                        color={'primary.500'}
                        outlineColor={'primary.500'}
                        _hover={{ bg: "primary.500", color: 'white' }}
                        fontWeight={'medium'}
                        isLoading={isLoading}
                        onClick={handleSubmitAnswer}>
                        Submit Answer
                    </Button>
                </CardFooter>
            </Card>
        </VStack>
    )
}

export default Quiz;







