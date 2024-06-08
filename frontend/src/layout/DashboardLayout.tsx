import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Container } from "@chakra-ui/react";
import FallbackSpinner from "../components/common/FallbackSpinner";
import { useFetchQuiz } from "../hooks/fetch/useFetchQuiz";
import useFetchProfile from "../hooks/fetch/useFetchProfile";

function DashboardLayout() {
    const { isAuth } = useAuthStore();
    const { loading: porfileLoading } = useFetchProfile();
    const { loading: quizLoading } = useFetchQuiz();
    //JSX
    return (
        <>
            {isAuth ?
                (porfileLoading || quizLoading) ? <FallbackSpinner /> :
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

export default DashboardLayout