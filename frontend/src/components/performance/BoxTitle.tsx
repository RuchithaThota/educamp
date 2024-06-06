import { Text } from "@chakra-ui/react"

const BoxTitle = ({ title }: { title: string }) => {
    return <Text
        marginLeft={'5px'}
        letterSpacing={'1px'}
        textTransform={'uppercase'}
        fontSize={'11px'}
        fontWeight={'semibold'}>{title}</Text>
}



export default BoxTitle