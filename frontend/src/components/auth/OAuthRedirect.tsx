import { useEffect } from "react"
import { login_token } from "../../env-variables";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useShowToast } from "../../hooks/useShowToast";
import FallbackSpinner from "../common/FallbackSpinner";

function OAuthRedirect() {
    const { setIsAuth, setAuthType } = useAuthStore();
    const navigate = useNavigate();
    const showToast = useShowToast();
    //useEffect
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        if (token) {
            localStorage.setItem(login_token, token);
            setIsAuth(true);
            setAuthType('google')
        }
        else {
            showToast("Something went wrong!", 'error')
            navigate('/');
        }
    }, [])
    //JSX
    return (
        <FallbackSpinner />
    )
}

export default OAuthRedirect