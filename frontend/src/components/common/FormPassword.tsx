import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement } from
    "@chakra-ui/react"
import { ChangeEvent, useState } from "react";

type FormPasswordProps = {
    isInvalid: boolean | undefined,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    errorMsg: string | undefined,
    label: string,
    name: string,
}

function FormPassword({ isInvalid, value, onChange, label, errorMsg, name }: FormPasswordProps) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    //JSX
    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormLabel fontSize='sm'>{label}</FormLabel>
            <InputGroup>
                <Input fontSize='sm'
                    name={name}
                    type={isShowPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange} />
                <InputRightElement>
                    <IconButton
                        size='md'
                        variant='unstyled'
                        aria-label={isShowPassword ? 'view-password' : 'hide-password'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        icon={isShowPassword ? <ViewIcon /> : <ViewOffIcon />} />
                </InputRightElement>
            </InputGroup>
            {errorMsg && <FormErrorMessage fontSize={'10px'}> {errorMsg}</FormErrorMessage>}
        </FormControl>
    )
}

export default FormPassword