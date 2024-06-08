import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { QuestionOption } from "../../types"

type RadioQuestionOptionProps = {
    options: QuestionOption[],
    selectedOptionId: string,
    changeSelectedOptionId: (value: string) => void
}

const RadioQuestionOption = ({ options, selectedOptionId, changeSelectedOptionId }: RadioQuestionOptionProps) => {
    return <RadioGroup
        value={selectedOptionId || ''}
        onChange={changeSelectedOptionId}>
        <Stack spacing={5} direction='column'>
            {options.map((optionObj) => {
                return <Box
                    key={optionObj._id}
                    padding='5px'
                    _hover={{ bg: 'grey.200' }}
                    borderRadius={'base'}>
                    <Radio
                        width={'100%'}
                        size={'md'}
                        colorScheme={'whatsapp'}
                        value={optionObj._id}>
                        {optionObj.option}
                    </Radio>
                </Box>
            })}
        </Stack>
    </RadioGroup>
}
export default RadioQuestionOption;