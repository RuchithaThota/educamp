import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useAuthStore } from "../store/useAuthStore"
import { ChevronDownIcon } from "@chakra-ui/icons";
import { login_token } from "../env-variables";
import { useQuizStore } from "../store/useQuizStore";

function UserProfile() {
    const { user, authType, setAuthType, setIsAuth, setUser } = useAuthStore();
    const { setQuestions, setAnswers, setQuiz } = useQuizStore();
    //handleLogout
    const handleLogout = () => {
        localStorage.removeItem(login_token);
        setIsAuth(false);
        setAuthType(null);
        setUser(null);
        setQuestions([]);
        setAnswers([]);
        setQuiz({ title: '', description: "", timeLeft: "", instructions: [] })
    }
    if (!user) return null;
    const { username, name, email, profileUrl } = user;
    //JSX
    return (
        <Menu>
            <MenuButton variant='ghost' as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar name={authType === 'google' ? username : name}
                    src={authType === 'google' ? profileUrl : undefined}
                    width={'35px'} height={'35px'} />
            </MenuButton>
            <MenuList>
                <MenuGroup title="Profile">
                    <MenuItem fontSize={'sm'}>
                        {authType === 'google' ? username : name}</MenuItem>
                    <MenuItem fontSize={'sm'}>{email}</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem fontSize={'md'}
                    _hover={{ color: 'red' }}
                    color='tomato' fontWeight={'medium'} onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </Menu >
    )
}

export default UserProfile