import { Box, CircularProgress, CircularProgressLabel, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from "@chakra-ui/react"
import BoxTitle from "./BoxTitle"
import { useQuizStore } from "../../store/useQuizStore";
import { DIFFICULTY, LEVEL_COLORS } from "../../types";
import Chip from "../common/Chip";

type ResultsProps = {
    percentage: number;
    points: number;
    title: string;
    color: string
}

function Result({ percentage, points, title, color }: ResultsProps) {
    const { totalPoints, questions, attemptedQuestions, getTotalPointsByLevel,
        getAttemptedPointsByLevel }
        = useQuizStore();
    const totalPts = totalPoints();
    // countAndPercentageByDifficulty
    const countAndPercentageByDifficulty = () => {
        const counts = [
            { level: 'Easy', total: 0, attempted: 0, percentage: 0, color: LEVEL_COLORS.EASY, score: 0 },
            { level: 'Medium', total: 0, attempted: 0, percentage: 0, color: LEVEL_COLORS.MEDIUM, score: 0 },
            { level: 'Hard', total: 0, attempted: 0, percentage: 0, color: LEVEL_COLORS.HARD, score: 0 }
        ]
        questions.forEach(q => {
            if (q.difficulty === DIFFICULTY.EASY) {
                counts[0].total++;
            } else if (q.difficulty === DIFFICULTY.MEDIUM) {
                counts[1].total++;
            } else if (q.difficulty === DIFFICULTY.HARD) {
                counts[2].total++;
            }
        })
        attemptedQuestions.forEach(aq => {
            if (aq.difficulty === DIFFICULTY.EASY) counts[0].attempted++;
            else if (aq.difficulty === DIFFICULTY.MEDIUM) counts[1].attempted++;
            else if (aq.difficulty === DIFFICULTY.HARD) counts[2].attempted++;
        });
        counts[0].percentage = (counts[0].attempted / counts[1].total) * 100 || 0;
        counts[1].percentage = (counts[1].attempted / counts[1].total) * 100 || 0;
        counts[2].percentage = (counts[2].attempted / counts[2].total) * 100 || 0;
        return counts;
    }
    const counts = countAndPercentageByDifficulty();
    const levelPts = getTotalPointsByLevel();
    const attemptedLevelpts = getAttemptedPointsByLevel();
    //JSX
    return (
        <VStack bg="white"
            align={'stretch'}
            boxShadow={'base'}
            w={'100%'}
            spacing={'15px'}
            padding={'15px'}>
            <BoxTitle title="Result" />
            <div style={{ width: '40px' }}>
                <Chip label={title} color={color} colorScheme={undefined} />
            </div>
            <div>
                <Text
                    display={'flex'}
                    color={'grey.500'}
                    marginBottom={'10px'}
                    fontSize={{ base: '12px', md: '14px' }}>
                    Points scored by difficulty :
                </Text>
                <HStack spacing={'15px'}>
                    <HStack>
                        <Dot bg={LEVEL_COLORS.EASY} />
                        <ResultText text={`${attemptedLevelpts.easy}/${levelPts.easy} P`} color="primary.500" />
                    </HStack>
                    <HStack>
                        <Dot bg={LEVEL_COLORS.MEDIUM} />
                        <ResultText text={`${attemptedLevelpts.medium}/${levelPts.medium} P`} color="primary.500" />
                    </HStack>
                    <HStack>
                        <Dot bg={LEVEL_COLORS.HARD} />
                        <ResultText text={`${attemptedLevelpts.hard}/${levelPts.hard} P`} color="primary.500" />
                    </HStack>
                </HStack>
            </div>
            <HStack>
                <Box flex={1}>
                    <Text
                        display={'flex'}
                        marginBottom={'10px'}
                        color={'grey.500'}
                        fontSize={{ base: '12px', md: '14px' }}>
                        Questions answered by difficulty :
                    </Text>
                    {counts.map((count, idx) => {
                        return <Box marginBottom={'10px'} key={idx}>
                            <HStack>
                                <ResultText color="black" text={count.level} />
                                <ResultText color="grey.500" text={`${count.attempted}/${count.total}`} />
                            </HStack>
                            <Slider
                                aria-label='time-taken-slider'
                                focusThumbOnChange={false}
                                value={count.percentage}>
                                <SliderTrack
                                    borderRadius={'full'}
                                    height={'10px'}>
                                    <SliderFilledTrack bg={count.color} />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
                    })}
                </Box>
                <CircularProgress
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    size={'150px'}
                    value={percentage} color={color}>
                    <CircularProgressLabel>
                        {percentage}%
                        <ResultText color="primary.500" text={`${points}/${totalPts} P`} />
                    </CircularProgressLabel>
                </CircularProgress>
            </HStack>
        </VStack>
    )
}

export default Result;

const ResultText = ({ text, color }: { text: string, color: string }) => {
    return <Text
        fontSize={'sm'}
        color={color}
        fontWeight={'medium'}>
        {text}
    </Text>
}

const Dot = ({ bg }: { bg: string }) => {
    return <div style={{
        width: '10px',
        height: '10px',
        background: bg,
        borderRadius: '50%',
    }}></div>
}