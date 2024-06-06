import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { ChangeEvent } from "react"

type FormInputWrapperProps = {
    isInvalid: boolean | undefined,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    errorMsg: string | undefined,
    label: string,
    name: string,
    type: string,
    inputRef?: React.RefObject<HTMLInputElement>,
    minLength?: number
}

function FormInputWrapper({
    isInvalid,
    value,
    onChange,
    label,
    errorMsg,
    name,
    type,
    inputRef,
    minLength
}: FormInputWrapperProps) {
    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormLabel fontSize='sm'>{label}</FormLabel>
            <Input ref={inputRef} fontSize='sm'
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                minLength={minLength} />
            {errorMsg && <FormErrorMessage fontSize={'10px'}>{errorMsg}</FormErrorMessage>}
        </FormControl>
    )
}

export default FormInputWrapper