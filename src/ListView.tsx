import {
  Button,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

export const ListView = () => (
  <Box>
    <Text>Trier par:</Text>
    <Button mx='1'>Note (Plus haute)</Button>
    <Button mx='1'>Date (Plus récent)</Button>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>utilisateur</Th>
          <Th>note</Th>
          <Th>retour</Th>
          <Th>date</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Arthur</Td>
          <Td>1/5</Td>
          <Td>Je me suis fais agressé dans la rue meme avec l'application, je ne recommande pas</Td>
          <Td>31 BC</Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
)
