import { ChangeEvent, useState } from "react";
import { Link, VStack } from "@chakra-ui/react"
import GoogleButton from "../common/GoogleButton"
import Divider from "../common/Divider"
import FormSubmitBtn from "../common/FormSubmitBtn";
import { useAuthUI } from "../../hooks/useAuthUI";
import { ErrorType, validate } from "../../helpers/validate";
import { postRequest } from "../../services/api";
import { LOGIN_URL } from "../../services/endpoints";
import { useShowToast } from "../../hooks/useShowToast";
import { login_token } from "../../env-variables";
import { LoginData, UserResponse } from "../../types";
import { useAuthStore } from "../../store/useAuthStore";
import FormInputWrapper from "../common/FormInputWrapper";
import FormPassword from "../common/FormPassword";
import { checkPropertiesExist } from "../../helpers/utils";

function Login() {
    const { setIsAuth, setAuthType } = useAuthStore();
    const { setIsForgotPassword } = useAuthUI();
    const showToast = useShowToast();
    const [login, setLogin] = useState<LoginData>({ email: '', password: '' });
    const [errors, setErrors] = useState<ErrorType>({});
    const [loading, setLoading] = useState(false);
    //handleLogin
    const handleLogin = async () => {
        const errs = validate(login);
        setErrors(errs);
        const properties = ['password', 'email'];
        const isNonExist = checkPropertiesExist(errs, properties)
        if (isNonExist)
            try {
                setLoading(true);
                const data: UserResponse = await postRequest(LOGIN_URL, login);
                localStorage.setItem(login_token, data.user.token);
                setIsAuth(true);
                setAuthType('email/password')
                showToast(data.msg, 'success');
            } catch (error: any) {
                if (typeof error.response.data === 'object') {
                    const validationErr: { [key: string]: string } = error.response.data.errors[0];
                    const err: string = Object.values(validationErr)[0];
                    showToast(err, 'error');
                } else {
                    showToast(error.response.data, 'error');
                }
            } finally {
                setLoading(false);
            }
    }
    //handleChange
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    //JSX
    return (
        <VStack spacing={'15px'}>
            <FormInputWrapper
                isInvalid={errors.isEmailInvalid}
                label="Email"
                name="email"
                type="email"
                value={login.email}
                onChange={handleChange}
                errorMsg={errors.email} />
            <FormPassword isInvalid={errors.isPasswordInvalid}
                label="Password"
                name="password"
                value={login.password}
                onChange={handleChange}
                errorMsg={errors.password} />
            <Link onClick={() => setIsForgotPassword(true)}
                marginLeft={'auto'} fontSize={'sm'}>
                Forgot Password ?
            </Link>
            <FormSubmitBtn loading={loading} onClick={handleLogin} label={'Login'} />
            <Divider />
            <GoogleButton />
        </VStack>
    )
}

export default Login