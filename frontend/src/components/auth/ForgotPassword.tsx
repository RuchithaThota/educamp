import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text, VStack } from "@chakra-ui/react"
import { useAuthUI } from "../../hooks/useAuthUI"
import { useEffect, useRef, useState } from "react";
import { ErrorType, validate } from "../../helpers/validate";
import FormSubmitBtn from "../common/FormSubmitBtn";
import { postRequest } from "../../services/api";
import { FORGOT_PASSWORD_URL, VERIFY_RESET_PASSWORD_OTP_URL } from "../../services/endpoints";
import { useShowToast } from "../../hooks/useShowToast";
import FormInputWrapper from "../common/FormInputWrapper";

function ForgotPassword() {
    const { setIsForgotPassword, email, setEmail, setIsResetPassword } = useAuthUI();
    const showToast = useShowToast();
    const [err, setErr] = useState<ErrorType>({});
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const otpInputRef = useRef<HTMLInputElement>(null);
    //useEffect
    useEffect(() => {
        emailInputRef.current!.focus();
        setEmail('')
    }, [])
    //handleSendOTP
    const handleSendOTP = async () => {
        const errs = validate({ email: email });
        setErr(errs);
        if ('email' in errs) return;
        try {
            setLoading(true);
            const data = await postRequest(FORGOT_PASSWORD_URL, { email });
            showToast(data, 'success');
            setShowOtpField(true);
        } catch (error: any) {
            showToast(error.response.data, 'error');
            setEmail('');
        } finally {
            setLoading(false);
            setErr({})
        }
    }
    //useEffect
    useEffect(() => {
        if (showOtpField) otpInputRef.current?.focus();
        if (otp.length === 6) handleVerify();
    }, [showOtpField, otp])
    //handleVerify
    const handleVerify = async () => {
        const errs = validate({ otp: otp });
        setErr(errs);
        if ('otp' in errs) return;
        try {
            setLoading(true)
            const data = await postRequest(VERIFY_RESET_PASSWORD_OTP_URL, { email, otp });
            showToast(data, 'success');
            setIsResetPassword(true);
            setIsForgotPassword(false);
        } catch (error: any) {
            showToast(error.response.data, 'error');
        } finally {
            setLoading(false)
        }
    }
    //JSX
    return (
        <VStack spacing={'15px'} align={'stretch'}>
            <Box display='flex' alignItems='center'>
                <IconButton variant={'ghost'} aria-label="back" icon={<ArrowBackIcon />}
                    onClick={() => setIsForgotPassword(false)} />
                <Text marginLeft='10px' fontWeight={'medium'}>Forgot Password ?</Text>
            </Box>
            {!showOtpField ?
                <>
                    <FormInputWrapper
                        isInvalid={err.isEmailInvalid}
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        errorMsg={err.email}
                        inputRef={emailInputRef}
                    />
                    <FormSubmitBtn loading={loading} onClick={handleSendOTP} label="Send OTP" />
                </>
                :
                <>
                    <FormInputWrapper
                        isInvalid={err.isOtpInvalid}
                        name="otp"
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        label="OTP"
                        errorMsg={err.otp}
                        minLength={6}
                        inputRef={otpInputRef}
                    />
                    <FormSubmitBtn loading={loading} label="Verify" onClick={handleVerify} />
                </>
            }
        </VStack>
    )
}

export default ForgotPassword