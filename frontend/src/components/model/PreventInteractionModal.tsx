import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../store/useQuizStore";

type PreventInteractionModalProps = { isOpen: boolean, onClose: () => void }
const PreventInteractionModal = ({ isOpen, onClose }: PreventInteractionModalProps) => {
    const navigate = useNavigate();
    const { setEndTime } = useQuizStore();
    //JSX
    return <Modal
        isCentered
        size={'sm'}
        isOpen={isOpen} onClose={onClose}>
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
                    onClick={() => {
                        onClose(); navigate('/');
                        setEndTime(new Date().toUTCString())
                    }}
                    colorScheme="red" marginRight={'15px'}>Leave</Button>
                <Button onClick={onClose}>Got it</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default PreventInteractionModal