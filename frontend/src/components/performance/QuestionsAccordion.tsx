import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, HStack, Stack, Text } from "@chakra-ui/react";
import BoxTitle from "./BoxTitle";
import { useQuizStore } from "../../store/useQuizStore";
import Chip from "../common/Chip";
import { Question } from "../../types";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";


function QuestionsAccordion() {
    const { questions, answers } = useQuizStore();
    const getSelectedOption = (question: Question) => {
        return answers.find(a => a.questionId === question._id)?.selectedOption;
    }
    //JSX
    return (
        <Box bg="white" boxShadow="base" w="100%" p="15px">
            <Box pb="20px">
                <BoxTitle title="Question & Answers" />
            </Box>
            <Accordion width={'100%'} defaultIndex={[0]} allowMultiple >
                {questions.map((question, index) => {
                    return <AccordionItem key={question._id}>
                        <h2>
                            <AccordionButton paddingBlock={'15px'}>
                                <Box
                                    fontSize={'sm'}
                                    fontWeight="medium"
                                    flex="1"
                                    textAlign="left">
                                    {index + 1}. {question.text}
                                </Box>
                                <Box display={{ base: 'none', md: 'flex' }} marginRight={'10px'}>
                                    <Score question={question} selectedOption={getSelectedOption(question)} />
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <Box display={{ base: 'flex', md: 'none' }}
                                paddingLeft={'10px'}
                                marginBlock={'15px'}>
                                <Score question={question} selectedOption={getSelectedOption(question)} />
                            </Box>
                        </h2>
                        <AccordionPanel>
                            <Options question={question} selectedOption={getSelectedOption(question)} />
                        </AccordionPanel>
                    </AccordionItem>
                })}
            </Accordion>
        </Box>
    );
}

export default QuestionsAccordion;

type Props = {
    question: Question,
    selectedOption: string | undefined
}

//Score
const Score = ({ question, selectedOption }: Props) => {
    const score = question.correct_option._id === selectedOption ? question.points : 0;
    //JSX
    return <HStack display={'flex'} alignItems={'center'}>
        {!selectedOption && <Chip label='Not Attempted' colorScheme={undefined} />}
        <Text fontSize={'sm'}>score:</Text>
        <Text fontWeight={'semibold'} fontSize={'sm'}
            color={score ? 'primary.500' : 'red'}>{score}/{question.points}</Text>
    </HStack>
}

//Options
const Options = ({ question, selectedOption }: Props) => {
    return (
        <Stack spacing={5} direction="column">
            {question.options.map((option) => (
                <Box display="flex" alignItems="center" key={option._id}>
                    {option._id === question.correct_option._id ? (
                        <CheckIcon color="green" />
                    ) : option._id === selectedOption ? (
                        <CloseIcon color="red" />
                    ) : null}
                    <Checkbox
                        ml="10px"
                        px="15px"
                        py="5px"
                        borderRadius="base"
                        size="md"
                        colorScheme="green"
                        bg={option._id === question.correct_option._id ? 'primary.400' : 'white'}
                        isChecked={
                            option._id === question.correct_option._id ||
                            option._id === selectedOption
                        }
                        isDisabled={
                            option._id === question.correct_option._id ||
                            option._id === selectedOption
                        }
                    >
                        {option.option}
                    </Checkbox>
                </Box>
            ))}
        </Stack>
    )
}