import {
  useNavigate
} from "react-router-dom"
import {
  useContext,
  useState,
  useEffect,
} from "react"
import {
  Button,
  Input,
  Box,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react"
import Cookies from "js-cookie"

import {
  apiGet
} from "@common/ApiCall"
import {
  CredentialsDispatchContext
} from "@common/Credentials"

const AuthPage = () => {
  const dispatch = useContext(CredentialsDispatchContext)
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const email = Cookies.get("email")
    const password = Cookies.get("password")

    if (email && password) {
      navigate("/graphs")
    }
  }, [navigate])

  const onLogginAttempt = () => {
    setLoading(true)
    apiGet(
      "/admin/getCurrAdmPass",
      {email, password},
      (_) => {
        dispatch({
          type: "modified",
          data: {
            email,
            password,
          }
        })
        Cookies.set("email", email, {expires: 1})
        Cookies.set("password", password, {expires: 1})
        navigate("/graphs")
      },
      (_) => {
        setLoading(false);
      },
      toast,
      {data: null}
    )
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.50"
    >
      <Text fontSize="5xl">Connectez-vous</Text>
      <Box m={10} p={5} bg="white" borderRadius={10} shadow="md" w="30rem">
        <Input
          m={1}
          value={email}
          onChange={event => setEmail(event.currentTarget.value)}
          placeholder="email"
          />
        <Input
          m={1} type='password'
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
          placeholder="admin password"
          />
        <Button
          m={1}
          isLoading={loading}
          colorScheme='pink'
          w="100%"
          onClick={onLogginAttempt}
          >Connexion</Button>
      </Box>
    </Flex>
  )
}

export default AuthPage
