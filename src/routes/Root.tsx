import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Spacer,
} from "@chakra-ui/react"

export const Root = () => {
  return (
    <Flex p={2} shadow="lg">
      <Image mx={2} h={10} src="/logo.svg"/>
      <ButtonGroup variant="ghost" colorScheme="pink">
        <Button>Graphiques</Button>
        <Button>Retours Utilisateurs</Button>
        <Button>Plaintes</Button>
        <Button>Recherche</Button>
        <Button>Newsletter</Button>
      </ButtonGroup>
      <Spacer />
      <ButtonGroup colorScheme="pink">
        <Button hidden variant="outline">
          Logout
        </Button>
        <Button>
          Login
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
