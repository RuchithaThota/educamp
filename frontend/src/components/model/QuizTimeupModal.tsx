/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../store/useQuizStore";
import { useEffect } from "react";
import { getCurrentTime } from "../../helpers/utils";

const QuizTimeupModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { timeup, setTimeup, setEndTime } = useQuizStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (timeup) {
            onOpen();
            setEndTime(getCurrentTime())
        }
    }, [timeup])
    const onCloseModal = () => {
        onClose(); setTimeup(false); navigate('/dashboard/view-performance')
    }
    //JSX
    return <Modal
        closeOnOverlayClick={false}
        isCentered
        size={'sm'}
        isOpen={isOpen}
        onClose={onCloseModal}  >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontWeight={'semibold'}>
                Time Up
            </ModalHeader>
            <ModalBody fontSize={'sm'} fontWeight={'normal'}>
                Time's up! Your quiz session has ended. Thank you for participating.
            </ModalBody>
            <ModalFooter>
                <Button
                    bg="primary.500"
                    _hover={{ bg: 'primary.600' }}
                    color="white"
                    fontSize={{ base: 'sm', md: 'md' }}
                    onClick={onCloseModal}>
                    Check Performance
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}


export default QuizTimeupModal