import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Spacer,
  Box,
} from "@chakra-ui/react"
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom"
import {
  useEffect,
  useState,
} from "react"
import Cookies from "js-cookie"

interface MenuItem {
  buttonContent: string,
  path: string,
}

const Root = () => {
  const [solid, setSolid] = useState(0)
  const pages: MenuItem[] = [
    {
      buttonContent: "Graphiques",
      path: "/graphs"
    },
    {
      buttonContent: "Retours utilisateurs",
      path: "/feedbacks"
    },
    {
      buttonContent: "Plaintes",
      path: "/complaints"
    },
    {
      buttonContent: "Recherche",
      path: "/search"
    },
    {
      buttonContent: "Newsletter",
      path: "/emails"
    }
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    Cookies.remove("email")
    Cookies.remove("password")
    navigate("/auth")
  }

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/graphs")
    }
  }, [navigate, location])

  return (
    <Box bg="gray.50" h="100vh">
    <Flex bg="white" p={2} shadow="lg">
      <Image mx={2} h={10} src="/logo.svg"/>
      <ButtonGroup colorScheme="pink">
        {pages.map(e => {
          return (
            <Link to={e.path}>
              <Button
                variant={location.pathname === e.path ? "solid" : "ghost"}
                onClick={() => setSolid(0)}
                >{e.buttonContent}</Button>
            </Link>
          )
        })}
      </ButtonGroup>
      <Spacer />
      <ButtonGroup colorScheme="pink">
        <Button variant="outline" onClick={logout}>
          Déconnexion
        </Button>
      </ButtonGroup>
    </Flex>
    <Outlet />
    </Box>
  )
}

export default Root
