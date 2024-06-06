import { Badge } from "@chakra-ui/react"

function Chip({ label, colorScheme, color }: {
    label: string,
    color?: string
    colorScheme: string | undefined
}) {
    return (
        <Badge fontSize={'12px'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
            paddingInline={3}
            paddingBlock={1}
            color={color}
            colorScheme={colorScheme}
            borderRadius={'full'}>
            {label}
        </Badge>
    )
}

export default Chip