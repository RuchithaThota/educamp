import { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text, VStack } from "@chakra-ui/react"
import { useAuthUI } from "../../hooks/useAuthUI";
import FormSubmitBtn from "../common/FormSubmitBtn";
import { ErrorType, validate } from "../../helpers/validate";
import { useShowToast } from "../../hooks/useShowToast";
import { postRequest } from "../../services/api";
import { RESET_PASSWORD_URL } from "../../services/endpoints";
import FormPassword from "../common/FormPassword";

function ResetPassword() {
    const { setIsResetPassword, email } = useAuthUI();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr] = useState<ErrorType>({});
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    //handleResetPassword
    const handleResetPassword = async () => {
        const err = validate({ password: confirmPassword });
        setErr(err);
        if (!err.isPasswordInvalid && password.trim() !== confirmPassword.trim()) {
            setErr(prev => ({ ...prev, password: "password didn't match", isPasswordInvalid: true }))
        }
        if (!err.isPasswordInvalid && password.trim() === confirmPassword.trim()) {
            try {
                setLoading(true);
                const data = await postRequest(RESET_PASSWORD_URL, { email, password: confirmPassword })
                showToast(data, 'success');
                setIsResetPassword(false);
            } catch (error: any) {
                showToast(error.response.data, 'error');
            } finally {
                setLoading(false)
            }
        }
    }
    //JSX
    return (
        <VStack spacing={'15px'} align={'stretch'}>
            <Box display='flex' alignItems='center'>
                <IconButton
                    variant={'ghost'}
                    aria-label="back"
                    icon={<ArrowBackIcon />}
                    onClick={() => setIsResetPassword(false)} />
                <Text marginLeft='10px' fontWeight={'medium'}>Reset Password </Text>
            </Box>
            <Text fontSize={'sm'} fontWeight={'semibold'} color="secondary.500">{email}</Text>
            <FormPassword
                isInvalid={err.isPasswordInvalid}
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMsg={""}
            />
            <FormPassword
                name="password"
                isInvalid={err.isPasswordInvalid}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                errorMsg={err.password}
            />
            <FormSubmitBtn loading={loading} onClick={handleResetPassword} label="Reset Password" />
        </VStack>
    )
}

export default ResetPassword