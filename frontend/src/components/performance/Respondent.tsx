import { Box, Text } from '@chakra-ui/react'
import BoxTitle from './BoxTitle'
import { UserIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '../../store/useAuthStore'

function Respondent() {
    const { authType, user } = useAuthStore();
    //JSX
    return (
        <Box bg="white" boxShadow={'base'} w={'100%'} padding={'15px'}>
            <BoxTitle title="Respondent" />
            <div style={{
                marginBlock: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}>
                <UserIcon width={'18px'} height='18px' />
                <Text
                    fontSize={'xl'}
                    fontWeight={'semibold'}
                    marginLeft={'5px'}>
                    {authType === 'google' ? user?.username : user?.name}</Text>
            </div>
        </Box>
    )
}

export default Respondent