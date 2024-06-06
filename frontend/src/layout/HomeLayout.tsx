import { Navigate, Outlet } from "react-router-dom"
import AuthUIProvider from "../context/AuthUIProvider"
import { useAuthStore } from "../store/useAuthStore"

function HomeLayout() {
    const { isAuth } = useAuthStore();
    return (
        <>
            {isAuth ? <Navigate to="/dashboard" /> :
                <AuthUIProvider>
                    <Outlet />
                </AuthUIProvider>
            }
        </>
    )
}

export default HomeLayout