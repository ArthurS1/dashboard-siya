import React, { useContext } from "react"
import axios from "axios"
import {
  Button,
  ButtonGroup,
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons"

import Config from "../Config.json"
import UserMessage from "interfaces/UserMessage"
import Feedback from "@components/Feedback"
import {
  CredentialsContext
} from "@common/Credentials"

enum Sorting {
  LowToHigh,
  HighToLow,
  NoSort,
}

const FeedbackPage = () => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const [table, setTable] = React.useState<UserMessage[] | undefined>(undefined)
  const [gradeMode, setGradeMode] = React.useState(Sorting.NoSort)
  const [dateMode, setDateMode] = React.useState(Sorting.NoSort)
  const [loadingTable, setLoadingTable] = React.useState(false)

  const tableList = table?.map(
    (e: UserMessage) => <Feedback message={e} key={e.id} />
  )
  const sortByRating = () => {
    switch (gradeMode) {
      case Sorting.LowToHigh:
        table?.sort((a, b) => a.rating - b.rating)
        setGradeMode(Sorting.HighToLow)
        break;
      case Sorting.HighToLow:
        table?.sort((a, b) => b.rating - a.rating)
        setGradeMode(Sorting.LowToHigh)
        break;
      default:
        setGradeMode(Sorting.HighToLow)
    }
  }
  const sortByDate = () => {
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
          onClick={sortByRating}
          rightIcon={gradeMode === Sorting.HighToLow ? <ArrowUpIcon /> : <ArrowDownIcon />}
          >Note</Button>
        <Button m='1'
          onClick={sortByDate}
          rightIcon={dateMode === Sorting.HighToLow ? <ArrowUpIcon /> : <ArrowDownIcon />}
          >Date</Button>
      </ButtonGroup>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>utilisateur</Th>
            <Th>date</Th>
            <Th>note</Th>
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
