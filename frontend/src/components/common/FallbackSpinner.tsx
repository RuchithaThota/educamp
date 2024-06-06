import { Container, Spinner } from "@chakra-ui/react"

function FallbackSpinner() {
    return (
        <Container display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height="calc(100vh - 60px)">
            <Spinner colorScheme="blue" />
        </Container >
    )
}

export default FallbackSpinner