import {
  Button,
  Input,
  Box,
} from "@chakra-ui/react"

export const Authentication = () => (
  <Box>
    <Input m='1' placeholder="admin email"></Input>
    <Input type='password' m='1' placeholder="admin password"></Input>
    <Button m='1' colorScheme='green'>Connexion</Button>
    <Button m='1' colorScheme='red'>Déconnexion</Button>
  </Box>
)
