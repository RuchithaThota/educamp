import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Radio, RadioGroup, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useShowToast } from "../../hooks/useShowToast";
import { useQuizStore } from "../../store/useQuizStore";
import { usePreventBackButton } from "../../hooks/useNavigationGuard";
import { Question } from "../../types";
import Chip from "../common/Chip";
import Timer from "./Timer";
import PreventInteractionModal from "../model/PreventInteractionModal";
import QuizTimeupModal from "../model/QuizTimeupModal";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import { getCurrentTime } from "../../helpers/utils";
import { postRequest } from "../../services/api";
import { ATTEMPTED_QUESTION_URL } from "../../services/endpoints";


const ToastMessage = "You have already taken test or did suspicious activity like reload, back button press or tab close while taking test previously"

function Quiz() {
    const { questions, attemptedQuestions, setAttemptedQuestions, setStartTime, setEndTime } = useQuizStore();
    const [selectedOption, setSelectedOption] = useState('');
    const [questionItem, setQuestionItem] = useState(questions[0]);
    const [remainedQuestions, setRemainedQuestions] = useState<Question[]>([questions[0]]);
    const [count, setCount] = useState(1);
    const [hasChanged, setHasChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const noOfQuestions = questions.length;
    const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];
    //useEffect
    useEffect(() => {
        if (attemptedQuestions.length > 0 && !hasChanged) {
            showToast(ToastMessage, 'info');
            navigate('/dashboard/view-performance')
            setEndTime(getCurrentTime());
        } else {
            setStartTime(getCurrentTime())
        }
    }, [])
    //preventInteractions
    usePreventBackButton(onOpen);
    useBeforeUnload(React.useCallback((e) => {
        e.preventDefault();
        setHasChanged(true);
    }, []))
    // getNextDifficultyLevel
    const getNextDifficultyLevel = (isCorrect: boolean, currentDifficulty: string): string => {
        const currentQuestionLevelIndex = DIFFICULTY_LEVELS.indexOf(currentDifficulty);
        let finalDifficultyIndex = isCorrect ? currentQuestionLevelIndex + 1 : currentQuestionLevelIndex - 1;
        finalDifficultyIndex = Math.max(0, Math.min(2, finalDifficultyIndex));
        return DIFFICULTY_LEVELS[finalDifficultyIndex];
    }
    //getRemainingQuestions
    const getRemainingQuestions = (): Question[] => {
        return questions.filter(q => !remainedQuestions.includes(q));
    }
    //handleSubmitAnswer
    const handleSubmitAnswer = () => {
        if (!selectedOption) {
            showToast('please select an option', 'error')
            return;
        }
        if (count === 20 && remainedQuestions.length === 20) {
            setEndTime(getCurrentTime());
            navigate('/dashboard/view-performance');
        }
        setLoading(true);
        const rqs = getRemainingQuestions();
        const isCorrect = questionItem.answerIndex === parseInt(selectedOption);
        const difficultyLevel = getNextDifficultyLevel(isCorrect, questionItem.difficulty);
        let nextQuestion = rqs.find(rq => rq.difficulty === difficultyLevel);
        if (!nextQuestion) {
            const nextDiffLevel = getNextDifficultyLevel(isCorrect, difficultyLevel);
            const nextDiffLevelQuestion = rqs.find(rq => rq.difficulty === nextDiffLevel);
            nextQuestion = nextDiffLevelQuestion ? nextDiffLevelQuestion :
                rqs.find(rq => rq.difficulty !== difficultyLevel && rq.difficulty !== nextDiffLevel)
        }
        if (nextQuestion) {
            const requestBody = {
                questionId: questionItem._id,
                selectedAnswerIndex: parseInt(selectedOption),
            }
            storeAttemptedQuestion(requestBody, nextQuestion);
        }
    }
    // storeAttemptedQuestion
    const storeAttemptedQuestion = async (requestBody: {
        questionId: string, selectedAnswerIndex: number
    }, nextQuestion: Question) => {
        try {
            const newAttemptedQ = await postRequest(ATTEMPTED_QUESTION_URL, requestBody);
            if (newAttemptedQ) {
                setAttemptedQuestions([...attemptedQuestions, newAttemptedQ]);
                setQuestionItem(nextQuestion);
                setCount(count + 1);
                setSelectedOption('')
            }
        } catch (error: any) {
            showToast(error.response.data, 'error')
        } finally { setLoading(false) }
    }
    //useEffect
    useEffect(() => {
        if (questions[0]._id != questionItem._id) {
            setRemainedQuestions([...remainedQuestions, questionItem]);
        }
    }, [questionItem])
    //jsx
    return (
        <VStack spacing={'15px'} align={'stretch'}>
            <Timer />
            <Card
                width={'100%'}
                padding="20px">
                <CardHeader>
                    <Text fontSize={'sm'} fontWeight={'semibold'}>Question {count}/{noOfQuestions}</Text>
                </CardHeader>
                <CardBody>
                    <Box marginBottom={5}>
                        <Text fontSize={'md'} fontWeight={'medium'}>{questionItem.question}</Text>
                    </Box>
                    <HStack marginBottom={5}>
                        <Chip label={questionItem.tag} colorScheme="blue" />
                        <Chip label={questionItem.difficulty}
                            colorScheme={questionItem.difficulty === 'hard' ? "red" :
                                questionItem.difficulty === 'medium' ? "orange" : "green"} />
                    </HStack>
                    <RadioGroup
                        value={selectedOption || ''}
                        onChange={(value) => setSelectedOption(value)}>
                        <Stack spacing={5} direction='column'>
                            {questionItem.options.map((option, optIndex) => {
                                return <Box
                                    key={optIndex}
                                    padding='5px'
                                    _hover={{ bg: 'grey.200' }}
                                    borderRadius={'base'}>
                                    <Radio
                                        width={'100%'}
                                        size={'md'}
                                        key={optIndex}
                                        colorScheme={'green'}
                                        value={optIndex.toString()}>
                                        {option}
                                    </Radio>
                                </Box>
                            })}
                        </Stack>
                    </RadioGroup>
                </CardBody>
                <CardFooter>
                    <Button
                        variant={'outline'}
                        fontWeight={'medium'}
                        isLoading={loading}
                        onClick={handleSubmitAnswer}>
                        Submit Answer
                    </Button>
                </CardFooter>
                <PreventInteractionModal isOpen={isOpen} onClose={onClose} />
                <QuizTimeupModal />
            </Card>
        </VStack>
    )
}

export default Quiz;




