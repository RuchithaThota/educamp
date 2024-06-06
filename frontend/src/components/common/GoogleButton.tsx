import { Button, Image } from '@chakra-ui/react';
import googleIcon from '../../assets/googleIcon.png';
import { backend_base_url } from '../../env-variables';
function GoogleButton() {

    return (
        <Button
            variant={'outline'}
            width='100%'
            fontSize={'sm'}
            onClick={() => window.open(`${backend_base_url}/auth/google`, '_self')}
            leftIcon={<Image src={googleIcon} alt='googleIcon' h={'1.4rem'} marginRight={'10px'} />}>
            Continue with Google
        </Button>
    )
}

export default GoogleButton