import { Box, Text } from "@chakra-ui/react"
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useAuthStore } from "../store/useAuthStore"
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { flexCenter } from "../theme";

function Navbar() {
    const { isAuth } = useAuthStore();
    //JSX
    return (
        <Box
            h='60px'
            boxShadow={'base'}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            paddingInline={{ base: '20px', md: '30px' }}
            paddingRight={{ base: '10px' }}
            bg='white'>
            <Link to="/" style={flexCenter}>
                <CheckCircleIcon color="primary.500" fontSize={{ base: 'xl', md: '2xl' }} marginInline={1} />
                <Text color='secondary.600' fontWeight='semibold'
                    fontSize='xl'>testportal</Text>
            </Link>
            {isAuth && <UserProfile />}
        </Box>
    )
}

export default Navbar