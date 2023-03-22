import React, { useContext } from "react"
import axios from "axios"
import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Tooltip,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
} from "@chakra-ui/icons"

import Config from "../Config.json"
import DataRow from "@interfaces/DataRow.interface"
import {
  CredentialsContext,
} from "@common/Credentials"

enum Sorting {
  LowToHigh,
  HighToLow,
  NoSort,
}

const FeedbackPage = () => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const [table, setTable] = React.useState<DataRow[] | undefined>(undefined)
  const [dateMode, setDateMode] = React.useState(Sorting.NoSort)
  const [loadingTable, setLoadingTable] = React.useState(false)
  const tableList = table?.map((e: DataRow) => (
    <Tr key={e.id}>
    <Td>{e.email}</Td>
    <Td>{e.date}</Td>
    <Td>{e.content}</Td>
    <Td>
      <Flex>
      <Select placeholder="non traité">
        <option>urgent</option>
        <option>important</option>
        <option>inutile</option>
      </Select>
      <Tooltip label="sauvegarder">
        <IconButton
          mx={2}
          aria-label="sauvegarder"
          variant="ghost"
          colorScheme="green"
          icon=<CheckIcon />
          />
      </Tooltip>
      </Flex>
    </Td>
  </Tr>
  ))
  const sortDate = () => {
    switch (dateMode) {
      case Sorting.LowToHigh:
        table?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        setDateMode(Sorting.HighToLow)
        break;
      case Sorting.HighToLow:
        table?.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        setDateMode(Sorting.HighToLow)
        setDateMode(Sorting.LowToHigh)
        break;
      default:
        setDateMode(Sorting.HighToLow)
    }
  }
  const load = () => {
    setLoadingTable(true)
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
      baseURL: Config.apiUrl,
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
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }).then(_ => setLoadingTable(false))
  }

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <ButtonGroup variant="ghost">
        <Button m='1'
          isLoading={loadingTable}
          colorScheme='blue'
          onClick={load}
          >Recharger</Button>
        <Button m='1'
          onClick={sortDate}
          rightIcon={dateMode === Sorting.HighToLow ? <ArrowUpIcon /> : <ArrowDownIcon />}
          >Date</Button>
      </ButtonGroup>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>utilisateur</Th>
            <Th>date</Th>
            <Th>commentaire</Th>
            <Th>importance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableList}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FeedbackPage
