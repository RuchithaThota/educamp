import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Container } from "@chakra-ui/react";

function ProtectedRoute() {
    const { isAuth } = useAuthStore()
    return (
        <>
            {isAuth ?
                <Container
                    bg="background.primary"
                    maxW={'5xl'}
                    width='100%'
                    marginBlock='30px'
                    height={'calc(100vh - 30px)'}>
                    <Outlet />
                </Container>
                : <Navigate to="/" />}
        </>
    );
}

export default ProtectedRoute