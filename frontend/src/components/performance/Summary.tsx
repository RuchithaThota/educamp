import { Box, Stack, Text } from "@chakra-ui/react"
import BoxTitle from "./BoxTitle"
import { BellIcon } from "@heroicons/react/24/outline"
import { getPerformanceMessage } from "../../helpers/utils"

function Summary({ percentage }: { percentage: number }) {
    const performance = getPerformanceMessage(percentage);
    //JSX
    return (
        <Box bg="white" boxShadow={'base'} w={'100%'} padding={'15px'}>
            <BoxTitle title="Summary" />
            <div style={{
                marginBlock: '20px',
                display: 'flex',
                gap: '5px'
            }}>
                <BellIcon width={'20px'} height='20px' color="#8b5cf6" />
                <Stack spacing={'15px'}>
                    <Text
                        fontSize={'14px'}
                        marginLeft={'5px'}>
                        Thank you for taking the test!</Text>
                    <Text
                        fontSize={'13px'}
                        marginLeft={'5px'}
                        fontWeight={'medium'}>
                        {performance.message}
                    </Text>
                </Stack>
            </div>
        </Box>
    )
}

export default Summary