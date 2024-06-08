import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import BoxTitle from "./BoxTitle";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useQuizStore } from "../../store/useQuizStore";
import { getTimeDifference, getTimePercentage } from "../../helpers/utils";

function TotalTime({ createdAt, updatedAt }: { createdAt: string, updatedAt: string }) {
    const { quiz } = useQuizStore();
    const startTime = new Date(createdAt).toLocaleTimeString();
    const endTime = new Date(updatedAt).toLocaleTimeString();
    const date = new Date(updatedAt).toLocaleDateString();
    const timeTaken = getTimeDifference(startTime.split(' ')[0], endTime.split(' ')[0]);
    const timeTakenPercentage = getTimePercentage(timeTaken, quiz.timeLeft);
    //JSX
    return (
        <Box bg="white" boxShadow={'base'} w={'100%'} padding={'15px'}>
            <BoxTitle title="Timer" />
            <div style={{
                marginBlock: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}>
                <ClockIcon width={'18px'} height='18px' />
                <Text
                    fontSize={'xl'}
                    fontWeight={'semibold'}
                    marginLeft={'5px'}>
                    Total Time</Text>
            </div>
            <div style={{ display: 'flex', marginLeft: '23px' }}>
                <TotalTimeText color={'secondary.400'} text={timeTaken} />
                <TotalTimeText color={'grey.500'} text={`/${quiz.timeLeft}`} />
            </div>
            <div style={{ width: '70%', marginBlock: '15px', marginLeft: '23px' }}>
                <Slider aria-label='time-taken-slider'
                    focusThumbOnChange={false}
                    colorScheme='pink' value={timeTakenPercentage}>
                    <SliderTrack
                        borderRadius={'full'}
                        height={'10px'}>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </div>
            <Box
                width={{ md: '80%' }}
                display={'flex'}
                justifyContent={{ md: 'space-between' }}
                flexWrap={'wrap'}
                marginLeft={'23px'}
                gap="20px">
                <TimeSlice label={"Start Time"} value={startTime} />
                <TimeSlice label={"End Time"} value={endTime} />
                <TimeSlice label={"Date"} value={date} />
            </Box>
        </Box>
    )
}

export default TotalTime;

const TotalTimeText = ({ text, color }: { text: string, color: string }) => {
    return <Text
        fontSize={'20px'}
        marginLeft={'5px'}
        color={color}
        fontWeight={'semibold'}>
        {text}
    </Text>
}

const TimeSlice = ({ value, label }: { value: string, label: string }) => {
    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text color={"grey.500"} fontWeight={'medium'} fontSize={'sm'}>{label}</Text>
        <Text fontSize={'sm'} marginLeft={'10px'} fontWeight={'medium'}>{value}</Text>
    </div>
}