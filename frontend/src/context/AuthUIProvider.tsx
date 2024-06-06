import { ReactNode, createContext, useState } from "react"

type AuthUIProviderProps = {
    children: ReactNode
}

type AuthUIContextType = {
    isForgotPassword: boolean,
    setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>,
    isResetPassword: boolean,
    setIsResetPassword: React.Dispatch<React.SetStateAction<boolean>>,
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

const initialValues = {
    isForgotPassword: false,
    setIsForgotPassword: () => { },
    isResetPassword: false,
    setIsResetPassword: () => { },
    email: '',
    setEmail: () => { }
}

export const AuthUIContext = createContext<AuthUIContextType>(initialValues);


function AuthUIProvider({ children }: AuthUIProviderProps) {
    const [isForgotPassword, setIsForgotPassword] = useState(initialValues.isForgotPassword)
    const [isResetPassword, setIsResetPassword] = useState(initialValues.isResetPassword)
    const [email, setEmail] = useState(initialValues.email)
    //JSX
    return (
        <AuthUIContext.Provider value={{
            isForgotPassword, setIsForgotPassword, isResetPassword, setIsResetPassword,
            email, setEmail
        }}>
            {children}
        </AuthUIContext.Provider>
    )
}

export default AuthUIProvider