import { Button } from "@chakra-ui/react"
import { MouseEventHandler } from "react"

type FormSubmitBtnProps = {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    label: string,
    loading: boolean
}

function FormSubmitBtn({ onClick, label, loading }: FormSubmitBtnProps) {
    return (
        <Button
            bg="primary.500"
            _hover={{ bg: 'primary.600' }}
            color="white"
            w={'100%'}
            fontSize={{ base: 'sm', md: 'md' }}
            onClick={onClick}
            isLoading={loading}>
            {label}
        </Button>
    )
}

export default FormSubmitBtn