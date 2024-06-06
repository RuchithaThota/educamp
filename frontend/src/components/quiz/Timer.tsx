import { Box, Center, Divider, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { useQuizStore } from '../../store/useQuizStore';
import { QUIZE_TIME } from '../../constants';

function Timer() {
    const [minutes, setMinutes] = useState(QUIZE_TIME);
    const [seconds, setSeconds] = useState(0);
    const { setTimeup } = useQuizStore();
    //timeoutCallback
    const timeoutCallback = () => {
        if (seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        } else {
            setSeconds(seconds - 1)
        }
    }
    //useEffect
    useEffect(() => {
        const timerId = setTimeout(timeoutCallback, 1000)
        if (seconds === 0 && minutes === 0) {
            setTimeup(true);
            clearTimeout(timerId);
            return;
        }
    }, [seconds, minutes])
    //JSX
    return (
        <Box bg={'white'}
            width={'100%'}
            boxShadow={'base'}
            padding="20px"
            display={'flex'}
            alignItems={'center'}>
            <Text fontSize={'16px'} fontWeight={'semibold'}>Mathematics Test</Text>
            <Center height='30px' marginInline={'10px'}>
                <Divider orientation='vertical' />
            </Center>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={'14px'} marginRight={'5px'} fontWeight={'medium'} color="grey.400">
                    Time Left :
                </Text>
                <Text fontSize='16px' fontWeight='bold' color="primary.600">
                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Text>
            </Box>
        </Box >
    )
}

export default Timer