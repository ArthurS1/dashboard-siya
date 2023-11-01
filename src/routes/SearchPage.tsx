import { Button,
  InputGroup,
  Input,
  InputRightAddon,
  useToast,
  Box,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react"
import React, { useContext } from "react"

import {
  useWebApi
} from "../common/WebApi"
import FeedbackData from "../interfaces/FeedbackData"
import {
  useConfiguration
} from "../contexts/Configuration"
import {
  CredentialsContext,
} from "../contexts/Credentials"

const SearchPage = () => {

  const creds = useContext(CredentialsContext)
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const toast = useToast()
  const [table, setTable] = React.useState<FeedbackData[] | undefined>(undefined)
  const [searchBox, setSearchBox] = React.useState('')
  const searchResult = table?.filter((e) => e.content.includes(searchBox))
  const tableList = searchResult?.map((e: FeedbackData) => (
        <Tr key={e.id}>
        <Td>{e.email}</Td>
        <Td>{e.importance}</Td>
        <Td>{e.content}</Td>
        <Td>{e.date}</Td>
        </Tr>
        ))
  const search = () => {
    if (!creds.data) {
      toast({
        title: 'Erreur',
        description: 'Vérifiez que vous êtes connecté',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    }
    webApi.getAllFeedbacks()
      .then((res) => setTable(res.data))
      .catch((err) => toast(err))
  }

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <InputGroup>
        <Input value={searchBox} onChange={event => setSearchBox(event.currentTarget.value)} placeholder="rechercher parmis les retour" />
        <InputRightAddon>
          <Button onClick={search}>Rechercher</Button>
        </InputRightAddon>
      </InputGroup>
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
       {tableList}
      </Tbody>
    </Table>
    <p>nombre de résultats: {tableList?.length}</p>
    </Box>
  )
}

export default SearchPage
