import { Box, Button, Card, CardBody, CardFooter, Divider, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { getRequest } from "../../services/api"
import { ALL_ATTEMPTED_QUESTIONS_URL, ALL_QUESTIONS_URL } from "../../services/endpoints"
import { AttemptedQuestion, Question } from "../../types"
import { useShowToast } from "../../hooks/useShowToast"
import { useNavigate } from "react-router-dom"
import { useQuizStore } from "../../store/useQuizStore"


const instructions = [
    "You have 40 minutes to answer all 20 questions. A timer will be displayed on your screen.",
    "Questions will be presented one at a time. Use the Next and Previous buttons to navigate.",
    "Each question will have four options, select the best possible answer by clicking on the option.",
    "Your answers will be saved on clicking Submit Answer button.",
    "Each question will have varying weightage depending on difficulty.",
    "At the end, You will receive immediate feedback of your performance.",
    "The quiz may be monitored, and any suspicious activity can lead to disqualification."
]

function Instructions() {
    const { setQuestions, setAttemptedQuestions } = useQuizStore();
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const navigate = useNavigate();
    //handleStartQuiz
    const handleStartQuiz = async () => {
        setLoading(true);
        try {
            const questions: Question[] = await getRequest(ALL_QUESTIONS_URL);
            if (questions.length > 0) {
                const attemptedQuestions: AttemptedQuestion[] = await getAttemptedQuestions();
                setQuestions(questions);
                setAttemptedQuestions(attemptedQuestions);
                navigate('/dashboard/take-quiz');
            } else {
                showToast('No questions available.', 'error');
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data || 'An error occurred while starting the quiz';
            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };
    // getAttemptedQuestions
    const getAttemptedQuestions = async () => {
        console.log('here');
        
        try {
            const data: AttemptedQuestion[] = await getRequest(ALL_ATTEMPTED_QUESTIONS_URL);
            return data;
        } catch (error: any) {
            const errorMessage = error?.response?.data || 'An error occurred while fetching attempted questions';
            showToast(errorMessage, 'error');
            return [];
        }
    };
    //jsx
    return (
        <Card>
            <CardBody>
                <Text fontSize={'18px'} fontWeight={'semibold'}>Mathematics Test</Text>
                <Stack spacing='1'>
                    <Box>
                        <Text pt='2' fontSize='sm'>
                            Welcome to the Quiz! Please read the following instructions carefully before you begin:
                        </Text>
                    </Box>
                    <Divider pt='2' />
                    <Box>
                        {instructions.map((instruction, index) =>
                            <Text key={index} pt='2' fontSize='sm'>{index + 1}.  {instruction}</Text>)}
                        <Text pt='2' fontSize='sm'>
                            Good Luck!!
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button bg={'secondary.500'}
                    _hover={{ bg: 'secondary.600' }}
                    color="white"
                    onClick={handleStartQuiz}
                    isLoading={loading}>
                    Start Quiz
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Instructions