import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useFetchResultSubmit } from "../../hooks/fetch/useFetchResultSubmit";
import { useState } from "react";
import { useQuizStore } from "../../store/useQuizStore";
import { useNavigate } from "react-router-dom";

type PreventInteractionModalProps = { isOpen: boolean, onClose: () => void }
const PreventInteractionModal = ({ isOpen, onClose }: PreventInteractionModalProps) => {
    const [shouldFetchSubmitResult, setShouldFetchSubmitResult] = useState(false);
    const { loading } = useFetchResultSubmit(shouldFetchSubmitResult);
    const { answers } = useQuizStore();
    const navigate = useNavigate();
    //handleClose
    const handleClose = () => {
        if (answers.length > 0) {
            setShouldFetchSubmitResult(true)
        } else {
            onClose();
            navigate('/')
        }
    }
    //JSX
    return <Modal
        isCentered
        size={'sm'}
        isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontWeight={'semibold'}>
                Leave quiz?
            </ModalHeader>
            <ModalBody fontSize={'sm'} fontWeight={'normal'}>
                once you leave the quiz you can't restart again.
                Submitted answers will be saved.
                Are you sure to leave?
            </ModalBody>
            <ModalFooter>
                <Button
                    isLoading={loading}
                    onClick={handleClose}
                    colorScheme="red" marginRight={'15px'}>Leave</Button>
                <Button onClick={onClose}>Got it</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default PreventInteractionModal