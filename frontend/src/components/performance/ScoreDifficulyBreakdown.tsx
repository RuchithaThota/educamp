import { HStack, Text } from "@chakra-ui/react"
import { DIFFICULTY, LEVEL_COLORS } from "../../types";
import { DIFFICULTY_LEVELS } from "../../constants";
import { useQuizStore } from "../../store/useQuizStore";

function ScoreDifficulyBreakdown() {
    const { questions, answers } = useQuizStore();
    // getPointByLevel
    const getPointByLevel = () => {
        return DIFFICULTY_LEVELS.map((level) => {
            return (
                questions.find((q) => q.difficulty == level)?.points || 0
            );
        });
    }
    // getDifficulyLevel
    const getDifficulyLevel = (questionId: string) => {
        return questions.find(q => q._id === questionId)?.difficulty;
    }
    // totalPointsByLevel
    const getTotalPointsByLevel = () => {
        return questions.reduce(
            (obj, q) => {
                switch (q.difficulty) {
                    case DIFFICULTY.EASY:
                        obj.easy += parseInt(q.points) || 0;
                        break;
                    case DIFFICULTY.MEDIUM:
                        obj.medium += parseInt(q.points) || 0;
                        break;
                    case DIFFICULTY.HARD:
                        obj.hard += parseInt(q.points) || 0;
                        break;
                    default:
                        break;
                }
                return obj;
            },
            { easy: 0, medium: 0, hard: 0 }
        );
    }
    // attemptedPointsByLevel
    const getAttemptedPointsByLevel = () => {
        const pt = getPointByLevel().map(Number);
        return answers.reduce(
            (obj, tq) => {
                const difficulty = getDifficulyLevel(tq.questionId)
                if (!tq.isCorrect) return obj;
                switch (difficulty) {
                    case DIFFICULTY.EASY:
                        obj.easy += pt[0] || 0;
                        break;
                    case DIFFICULTY.MEDIUM:
                        obj.medium += pt[1] || 0;
                        break;
                    case DIFFICULTY.HARD:
                        obj.hard += pt[2] || 0;
                        break;
                    default:
                        break;
                }
                return obj;
            },
            { easy: 0, medium: 0, hard: 0 }
        );
    }
    const attemptedLevelpts = getAttemptedPointsByLevel();
    const levelPts = getTotalPointsByLevel();
    //JSX
    return (
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
    )
}

export default ScoreDifficulyBreakdown;

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