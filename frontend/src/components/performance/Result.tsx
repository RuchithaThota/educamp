import { CircularProgress, CircularProgressLabel, HStack, Text, VStack } from "@chakra-ui/react"
import BoxTitle from "./BoxTitle"
import Chip from "../common/Chip";
import { getPerformanceMessage } from "../../helpers/utils";
import DifficultyBreakdown from "./DifficultyBreakdown";
import ScoreDifficulyBreakdown from "./ScoreDifficulyBreakdown";

type ResultProps = {
    percentage: number,
    score: number,
    totalScore: number
}

function Result({ percentage, score, totalScore }: ResultProps) {
    const { title, color } = getPerformanceMessage(percentage);
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
            <ScoreDifficulyBreakdown />
            <HStack>
                <DifficultyBreakdown />
                <CircularProgress
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    size={'150px'}
                    value={percentage} color={color}>
                    <CircularProgressLabel>
                        {percentage}%
                        <Text
                            fontSize={'sm'}
                            color={'primary.500'}
                            fontWeight={'medium'}>
                            {`${score}/${totalScore} P`}
                        </Text>
                    </CircularProgressLabel>
                </CircularProgress>
            </HStack>
        </VStack>
    )
}

export default Result;
