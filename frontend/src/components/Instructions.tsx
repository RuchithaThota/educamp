import { Box, Button, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from "@chakra-ui/react"
import { useQuizStore } from "../store/useQuizStore"
import { useState } from "react"
import { postRequest } from "../services/api";
import { QUIZ_START_URL } from "../services/endpoints";
import { useShowToast } from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

const Message = 'You have already taken test or did suspicious activity like reload, back button or close tab press';

function Instructions() {
    const { quiz, setAnswers } = useQuizStore();
    const { title, description, instructions } = quiz;
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const navigate = useNavigate();
    //handleStartQuiz
    const handleStartQuiz = async () => {
        try {
            setLoading(true);
            const data = await postRequest(QUIZ_START_URL, {})
            if (data) {
                if (data.answers.length > 0) {
                    setAnswers(data.answers)
                    showToast(Message, 'info')
                    navigate('/dashboard/view-performance')
                } else {
                    navigate('/dashboard/take-quiz');
                }
            }
        } catch (error: any) {
            showToast(error.response.data, 'error');
        } finally { setLoading(false) }
    }
    //jsx
    return (
        <Card>
            <CardBody>
                <Heading size={'md'}>{title}</Heading>
                <Stack spacing='1'>
                    <Box>
                        <Text pt='2' fontSize='sm'>
                            {description}
                        </Text>
                    </Box>
                    <Divider pt='2' />
                    <Box>
                        {instructions.map((instruction, index) =>
                            <Text key={index} pt='2' fontSize='sm'>{index + 1}.  {instruction}</Text>
                        )}
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