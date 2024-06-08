import { useEffect, useState } from 'react';
import { Box, Center, Divider, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useQuizStore } from '../../store/useQuizStore';
import { flexCenter } from '../../theme';
import QuizTimeupModal from '../model/QuizTimeupModal';

function Timer() {
    const { quiz } = useQuizStore();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft('00:00:30'));
    const { isOpen, onOpen, onClose } = useDisclosure();
    //useEffect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const [hours, minutes, seconds] = prevTimeLeft.split(':').map(Number);
                let totalSeconds = hours * 3600 + minutes * 60 + seconds;
                if (totalSeconds <= 0) {
                    clearInterval(timer);
                    onOpen();
                    return "00:00:00";
                }
                totalSeconds -= 1;
                const newHours = Math.floor(totalSeconds / 3600);
                const newMinutes = Math.floor((totalSeconds % 3600) / 60);
                const newSeconds = totalSeconds % 60;
                return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:
                ${newSeconds.toString().padStart(2, '0')}`;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    //JSX
    return (
        <Box bg={'white'}
            width={'100%'}
            boxShadow={'base'}
            padding="20px"
            display={'flex'}
            alignItems={'center'}>
            <Heading size={{ base: 'sm', md: 'md' }} fontWeight={'semibold'}>{quiz.title}</Heading>
            <Center height='30px' marginInline={'10px'}>
                <Divider orientation='vertical' />
            </Center>
            <div style={flexCenter}>
                <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={'medium'} color="grey.500">Time Left :</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} marginLeft={'5px'} fontWeight='bold' color="primary.600">
                    {timeLeft}
                </Text>
            </div>
            <QuizTimeupModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}

function calculateTimeLeft(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:
    ${seconds.toString().padStart(2, '0')}`;
}

export default Timer;
