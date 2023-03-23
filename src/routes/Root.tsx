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

const Root = () => {
  const [solid, setSolid] = useState(0)
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
        <Link to="/graphs">
          <Button
            variant={solid === 0 ? "solid" : "ghost"}
            onClick={() => setSolid(0)}
            >Graphiques</Button>
        </Link>
        <Link to="/feedbacks">
          <Button
            variant={solid === 1 ? "solid" : "ghost"}
            onClick={() => setSolid(1)}
            >Retours Utilisateurs</Button>
        </Link>
        <Link to="/complaints">
          <Button
            variant={solid === 2 ? "solid" : "ghost"}
            onClick={() => setSolid(2)}
            >Plaintes</Button>
        </Link>
        <Link to="/search">
          <Button
            variant={solid === 3 ? "solid" : "ghost"}
            onClick={() => setSolid(3)}
            >Recherche</Button>
        </Link>
        <Link to="/emails">
          <Button
            variant={solid === 4 ? "solid" : "ghost"}
            onClick={() => setSolid(4)}
            >Newsletter</Button>
        </Link>
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
