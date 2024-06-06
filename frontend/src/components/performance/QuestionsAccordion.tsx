import React from 'react';
import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, HStack, Stack,
    Text
} from "@chakra-ui/react";
import { useQuizStore } from "../../store/useQuizStore";
import { Question } from "../../types";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import BoxTitle from "./BoxTitle";
import Chip from '../common/Chip';

function QuestionsAccordion() {
    const { questions, attemptedQuestions } = useQuizStore();
    const getSelectedAnswerIndex = (question: Question) => {
        return attemptedQuestions.find(aq => aq.questionId === question._id)?.selectedAnswerIndex;
    };
    //renderedQuestions
    const renderedQuestions = questions.map((question, index) => {
        const selectedAnswerIdx = getSelectedAnswerIndex(question);
        const score = question.answerIndex === selectedAnswerIdx ? question.points : 0;
        //JSX
        return (
            <AccordionItem key={question._id}>
                <h2>
                    <AccordionButton
                        paddingBlock='15px'>
                        <Box
                            fontSize={'sm'}
                            fontWeight="medium"
                            flex="1"
                            textAlign="left">
                            {index + 1}. {question.question}
                        </Box>
                        <Box display={{ base: 'none', md: 'flex' }} marginRight={'10px'}>
                            <Score selectedAnswerIdx={selectedAnswerIdx}
                                score={score}
                                questionPoints={question.points} />
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <Box display={{ base: 'flex', md: 'none' }}
                        paddingLeft={'10px'}
                        marginBlock={'15px'}>
                        <Score selectedAnswerIdx={selectedAnswerIdx}
                            score={score}
                            questionPoints={question.points} />
                    </Box>
                </h2>
                <AccordionPanel>
                    <Stack spacing={5} direction="column">
                        {question.options.map((option, optIndex) => (
                            <Box display="flex" alignItems="center" key={optIndex}>
                                {optIndex === question.answerIndex ? (
                                    <CheckIcon color="green" />
                                ) : optIndex === selectedAnswerIdx ? (
                                    <CloseIcon color="red" />
                                ) : null}
                                <Checkbox
                                    ml="10px"
                                    px="15px"
                                    py="5px"
                                    borderRadius="base"
                                    size="md"
                                    colorScheme="green"
                                    bg={optIndex === question.answerIndex ? 'primary.400' : 'white'}
                                    isChecked={
                                        optIndex === question.answerIndex ||
                                        optIndex === selectedAnswerIdx
                                    }
                                    isDisabled={
                                        optIndex === question.answerIndex ||
                                        optIndex === selectedAnswerIdx
                                    }
                                >
                                    {option}
                                </Checkbox>
                            </Box>
                        ))}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        );
    });
    //JSX
    return (
        <Box bg="white" boxShadow="base" w="100%" p="15px">
            <Box pb="20px" pl="15px">
                <BoxTitle title="Question & Answers" />
            </Box>
            <Accordion width={'100%'} defaultIndex={[0]} allowMultiple >
                {renderedQuestions}
            </Accordion>
        </Box>
    );
}

export default React.memo(QuestionsAccordion);

//Score
const Score = ({ selectedAnswerIdx, questionPoints, score }: {
    selectedAnswerIdx: number | undefined,
    questionPoints: number,
    score: number
}) => {
    return <HStack
        display={'flex'} alignItems={'center'}>
        {selectedAnswerIdx === undefined &&
            <Chip label='Not Attempted' colorScheme={undefined} />}
        <Text fontSize={'sm'}>score:</Text>
        <Text
            fontWeight={'semibold'}
            fontSize={'sm'}
            color={score ? 'primary.500' : 'red'}>{score}/{questionPoints}</Text>
    </HStack>
}