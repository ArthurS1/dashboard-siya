import {
  Button,
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
import FeedbackData from "@interfaces/FeedbackData"
import axios from "axios"
import Config from "../Config.json"
import {
  CredentialsContext,
} from "@common/Credentials"

const SearchPage = () => {
  const credentials = useContext(CredentialsContext)
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
    if (!credentials.data) {
      toast({
        title: 'Erreur',
        description: 'Vérifiez que vous êtes connecté',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    }
    axios({
      method: 'get',
      baseURL: Config.webApiUrl,
      url: '/feedback/getAll',
      params: {
        email: credentials.data.email,
        password: credentials.data.password,
      }
    }).then((res) => {
      setTable(res.data)
    }, (err) => {
      console.log(err)
      toast({
        title: 'Erreur',
        description: 'Erreur lors du chargement des données (voir console)',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
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
