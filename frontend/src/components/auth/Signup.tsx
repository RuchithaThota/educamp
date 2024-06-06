import { ChangeEvent, useState } from "react"
import { VStack } from "@chakra-ui/react"
import GoogleButton from "../common/GoogleButton"
import Divider from "../common/Divider"
import { ErrorType, validate } from "../../helpers/validate"
import FormSubmitBtn from "../common/FormSubmitBtn"
import { SignupData, UserResponse } from "../../types"
import { postRequest } from "../../services/api"
import { SIGNUP_URL } from "../../services/endpoints"
import { login_token } from "../../env-variables"
import { useAuthStore } from "../../store/useAuthStore"
import { useShowToast } from "../../hooks/useShowToast"
import FormInputWrapper from "../common/FormInputWrapper"
import FormPassword from "../common/FormPassword"
import { checkPropertiesExist } from "../../helpers/utils"

function Signup() {
    const [errors, setErrors] = useState<ErrorType>({});
    const [signup, setSignup] = useState<SignupData>({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { setIsAuth, setAuthType } = useAuthStore();
    const showToast = useShowToast();
    //handleSignup
    const handleSignup = async () => {
        const errs = validate(signup);
        setErrors(errs);
        const properties = ['name', 'password', 'email'];
        const isNonExist = checkPropertiesExist(errs, properties)
        if (isNonExist)
            try {
                setLoading(true);
                const data: UserResponse = await postRequest(SIGNUP_URL, signup);
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
        setSignup(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    //JSX
    return (
        <VStack spacing={'15px'}>
            <FormInputWrapper
                isInvalid={errors.isNameInvalid}
                label="Name"
                name="name"
                type="text"
                value={signup.name}
                onChange={handleChange}
                errorMsg={errors.name}
            />
            <FormInputWrapper
                isInvalid={errors.isEmailInvalid}
                label="Email"
                name="email"
                type="email"
                value={signup.email}
                onChange={handleChange}
                errorMsg={errors.email}
            />
            <FormPassword
                isInvalid={errors.isPasswordInvalid}
                label="Password"
                name="password"
                value={signup.password}
                onChange={handleChange}
                errorMsg={errors.password}
            />
            <FormSubmitBtn onClick={handleSignup} label="Signup" loading={loading} />
            <Divider />
            <GoogleButton />
        </VStack>
    )
}

export default Signup