import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Spacer,
} from '@chakra-ui/react';
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { pagesMenuIndex } from './MenuPagesIndex';

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    Cookies.remove('email');
    Cookies.remove('password');
    navigate('/auth');
  };

  useEffect(() => {
    const email = Cookies.get('email');
    const password = Cookies.get('password');

    if (!email && !password) {
      navigate('/auth');
    } else if (location.pathname === '/') {
      navigate('/graphs');
    }

  }, [navigate, location]);

  return (
    <Flex direction="column" bg="gray.50" h="100vh">
      <Flex bg="white" p={2} shadow="lg">
        <Image mx={2} h={10} src="/logo.png" />
        <ButtonGroup colorScheme="linkedin">
          {pagesMenuIndex.map(e => {
            return (
              <Link key={e.path} to={e.path}>
                <Button
                  variant={location.pathname === e.path ? 'solid' : 'ghost'}
                  onClick={() => navigate(e.path)}
                >{e.title}</Button>
              </Link>
            );
          })}
        </ButtonGroup>
        <Spacer />
        <ButtonGroup colorScheme="linkedin">
          <Button variant="outline" onClick={logout}>
            Déconnexion
          </Button>
        </ButtonGroup>
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default Root;
