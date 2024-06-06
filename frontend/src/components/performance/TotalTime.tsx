import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import BoxTitle from "./BoxTitle";
import { ClockIcon } from "@heroicons/react/24/outline";
import { getTimeDifference, getTimePercentage } from "../../helpers/utils";
import { useQuizStore } from "../../store/useQuizStore";
import { QUIZE_TIME } from "../../constants";
import { InfoIcon } from "@chakra-ui/icons";

function TotalTime() {
    const { startTime, endTime } = useQuizStore();
    const timeTaken = getTimeDifference(startTime, endTime);
    const timeTakenPercentage = getTimePercentage(timeTaken);
    const getHourMinutes = (time: string) => {
        const [hour, minutes, seconds] = time.split(',')[1].trim().split(' ')[0].split(':');
        return `${hour}:${minutes}:${seconds}`
    }
    const [hours, minutes, seconds] = timeTaken.split(':').map(Number);
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
                <Text
                    fontSize={'20px'}
                    marginLeft={'5px'}
                    fontWeight={'semibold'}
                    color={'secondary.400'}>
                    {timeTaken}
                </Text>
                <Text
                    fontSize={'20px'}
                    marginLeft={'5px'}
                    color={'grey.500'}
                    fontWeight={'semibold'}>
                    / 00:{QUIZE_TIME}:00
                </Text>
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
                <TimeSlice label={"Start Time"} value={getHourMinutes(startTime)} />
                <TimeSlice label={"End Time"} value={getHourMinutes(endTime)} />
                <TimeSlice label={"Date"} value={endTime.split(',')[0].trim()} />
                <Box display={'flex'}>
                    <InfoIcon color={'grey.500'} width={'12px'} marginRight={'10px'} />
                    <Text
                        fontSize={'12px'} fontWeight={'medium'} color={'grey.500'}>
                        The quiz, scheduled for {QUIZE_TIME} minute, was completed in
                        {hours ? ` ${hours} hours` : minutes ? ` ${minutes} minutes` : ` ${seconds} seconds`},
                        starting at {getHourMinutes(startTime)} and finishing at {getHourMinutes(endTime)}{' '}
                        on {endTime.split(',')[0].trim()}</Text>
                </Box>
            </Box>
        </Box >
    )
}

export default TotalTime;

const TimeSlice = ({ value, label }: { value: string, label: string }) => {
    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text color={"grey.500"} fontWeight={'medium'} fontSize={{ base: "sm", md: 'medium' }}>{label}</Text>
        <Text fontSize={'sm'} marginLeft={'10px'} fontWeight={'medium'}>{value}</Text>
    </div>
}