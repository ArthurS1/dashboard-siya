import {
  Button,
  Input,
  Box,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react"
import {
  useNavigate
} from "react-router-dom"
import axios from "axios"
import React from "react"

import Config from "../Config.json"
import AdminData from "../AdminData.interface"

const AuthPage = ({dataSetter}: {dataSetter: (a: AdminData) => void}) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onLogginAttempt = () => {
    setLoading(true)
    axios({
      method: 'get',
      baseURL: Config.apiUrl,
      url: '/admin/getCurrAdmPass',
      params: {
        email,
        password,
      }
    }).then((res) => {
      console.log(res)
      navigate("/graphs")
      dataSetter({
        email,
        pass: password,
      })
      }, (err) => {
      console.log(err)
      toast({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    })
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
