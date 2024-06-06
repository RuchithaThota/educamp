import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Signup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import ForgotPassword from "../components/auth/ForgotPassword"
import ResetPassword from "../components/auth/ResetPassword"
import { useAuthUI } from "../hooks/useAuthUI"

function Homepage() {
    const { isForgotPassword, isResetPassword } = useAuthUI();
    //JSX
    return (
        <>
            <Container
                display='flex'
                justifyContent='center'
                alignItems='center'
                height="calc(100vh - 60px)">
                <Box
                    bg="white"
                    maxW="450px"
                    width='100%'
                    borderRadius='lg'
                    margin="0 auto"
                    boxShadow="base"
                    color="black"
                    paddingInline={'16px'}
                    paddingBlock={'28px'}>
                    {!isForgotPassword && !isResetPassword &&
                        <Tabs variant='soft-rounded' colorScheme="green">
                            <TabList>
                                <Tab w='50%' fontSize='16px'>Login</Tab>
                                <Tab w='50%' fontSize='16px'>Signup</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel><Login /></TabPanel>
                                <TabPanel><Signup /></TabPanel>
                            </TabPanels>
                        </Tabs>}
                    {isForgotPassword && <ForgotPassword />}
                    {isResetPassword && <ResetPassword />}
                </Box>
            </Container>
        </>
    )
}

export default Homepage