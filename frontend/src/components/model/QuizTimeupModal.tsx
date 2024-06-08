import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { useFetchResultSubmit } from "../../hooks/fetch/useFetchResultSubmit";

const QuizTimeupModal = ({ isOpen }: { isOpen: boolean }) => {
    const [shouldFetchSubmitResult, setShouldFetchSubmitResult] = useState(false);
    const { loading } = useFetchResultSubmit(shouldFetchSubmitResult);
    //JSX
    return <Modal
        closeOnOverlayClick={false}
        isCentered
        size={'sm'}
        isOpen={isOpen}
        onClose={() => setShouldFetchSubmitResult(true)}>
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
                    isLoading={loading}
                    bg="primary.500"
                    _hover={{ bg: 'primary.600' }}
                    color="white"
                    fontSize={{ base: 'sm', md: 'md' }}
                    onClick={() => setShouldFetchSubmitResult(true)}>
                    Check Performance
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}


export default QuizTimeupModal