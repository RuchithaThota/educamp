import { Box, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { DIFFICULTY, LEVEL_COLORS } from "../../types";
import { useQuizStore } from "../../store/useQuizStore";
import { getPercentage } from "../../helpers/utils";
import { DIFFICULTY_LEVELS } from "../../constants";


function DifficultyBreakdown() {
    const { questions, answers } = useQuizStore();
    // countAndPercentageByDifficulty
    const countAndPercentageByDifficulty = () => {
        const counts = DIFFICULTY_LEVELS.map(level => {
            return { level, total: 0, attempted: 0, percentage: 0, color: '' }
        })
        counts[0].color = LEVEL_COLORS.EASY;
        counts[1].color = LEVEL_COLORS.MEDIUM;
        counts[2].color = LEVEL_COLORS.HARD;
        questions.forEach(q => {
            q.difficulty === DIFFICULTY.EASY ? counts[0].total++ :
                q.difficulty === DIFFICULTY.MEDIUM ? counts[1].total++ : counts[2].total++;
        })
        answers.forEach(aq => {
            const diff = questions.find(q => q._id === aq.questionId)?.difficulty;
            diff === DIFFICULTY.EASY ? counts[0].attempted++ : diff === DIFFICULTY.MEDIUM ? counts[1].attempted++ :
                counts[2].attempted++;
        });
        counts.forEach(count => {
            count.percentage = getPercentage(count.attempted, count.total);
        })
        return counts;
    }
    const counts = countAndPercentageByDifficulty();
    console.log(counts);

    //JSX
    return (
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
    )
}

export default DifficultyBreakdown;

const ResultText = ({ text, color }: { text: string, color: string }) => {
    return <Text
        fontSize={'sm'}
        color={color}
        fontWeight={'medium'}>
        {text}
    </Text>
}