import { useEffect, useState } from "react"
import { getRequest } from "../services/api";
import { USER_PROFILE_URL } from "../services/endpoints";
import FallbackSpinner from "../components/common/FallbackSpinner";
import { useAuthStore } from "../store/useAuthStore";
import { useShowToast } from "../hooks/useShowToast";
import Instructions from "../components/quiz/Instructions";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const { user, setUser, setIsAuth, setAuthType } = useAuthStore();
    const showToast = useShowToast();
    //useEffect
    useEffect(() => {
        if (!user)
            getProfile();
    }, [])
    //getProfile
    const getProfile = async () => {
        try {
            setLoading(true)
            const data = await getRequest(USER_PROFILE_URL);
            setUser(data);
        } catch (error: any) {
            showToast(error.response.data, 'error');
            setIsAuth(false);
            setAuthType(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    //JSX
    return (
        <>
            {loading ? <FallbackSpinner /> : <Instructions />}
        </>
    )
}

export default Dashboard