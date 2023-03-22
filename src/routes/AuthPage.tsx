import {
  useNavigate
} from "react-router-dom"
import axios from "axios"
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
    if (document.cookie !== "") {
      const cookies = document.cookie.split(';')
      for (let cookie in cookies) {
        console.log(cookie);
      }
      dispatch({
        type: "logged_out",
        data: null,
      })
      navigate("/graphs")
    }
  })

  const onLogginAttempt = () => {
    setLoading(true)
    apiGet(
      "/admin/getCurrAdmPass",
      {email, password},
      (_) => {
        dispatch({
          type: "modified",
          data: {
            email: email,
            password: password,
          }
        })
        document.cookie = `email=${email};max-age=600`
        document.cookie = `password=${password};max-age=600`
        navigate("/graphs")
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
