import {
  Button,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React from "react"
import Config from "../Config.json"
import AdminData from "../AdminData.interface"

export const Authentication = ({dataSetter}: {dataSetter: (a: AdminData) => void}) => {
  const toast = useToast()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onLogginAttempt = () => {
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
      toast({
        title: 'Connecté',
        description: 'Connecté avec succès',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      dataSetter({
        email,
        pass: password,
      })
      }, (err) => {
      console.log(err)
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la connexion (voir console)',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  const onLogoutAttempt = () => {
    toast({
      title: 'Déconnecté',
      description: 'Clef administrateur effacée avec succès',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    dataSetter({
      email: '',
      pass: ''
    })
  }

  return (
  <Box>
    <Input m='1' value={email} onChange={event => setEmail(event.currentTarget.value)} placeholder="admin email"></Input>
    <Input type='password' m='1' value={password} onChange={event => setPassword(event.currentTarget.value)} placeholder="admin password"></Input>
    <Button m='1' colorScheme='green' onClick={onLogginAttempt}>Connexion</Button>
    <Button m='1' colorScheme='red' onClick={onLogoutAttempt}>Déconnexion</Button>
  </Box>
  )
}
