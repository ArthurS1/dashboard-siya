import { useState } from "react"
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

import UserMessage from "interfaces/UserMessage"
import Feedback from "../components/Feedback"
import {
  useCredentials
} from "../contexts/Credentials"
import {
  useWebApi
} from "../common/WebApi"
import { useConfiguration } from "contexts/Configuration"

enum SortingMode {
  LowToHigh,
  HighToLow,
  NoSort,
}

const FeedbackPage = () => {
  const toast = useToast()

  const creds = useCredentials()
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const [table, setTable] = useState<UserMessage[] | undefined>(undefined)
  const [gradeMode, setGradeMode] = useState(SortingMode.NoSort)
  const [dateMode, setDateMode] = useState(SortingMode.NoSort)
  const [reloading, setReloading] = useState(false)

  const sortTable = (
    mode: SortingMode,
    setMode: (a: SortingMode) => void,
    sortHighToLow: (a: any, b: any) => number,
    sortLowToHigh: (a: any, b: any) => number
  ) => {
    switch (mode) {
      case SortingMode.LowToHigh:
        table?.sort(sortHighToLow)
        setMode(SortingMode.HighToLow)
        break;
      case SortingMode.HighToLow:
        table?.sort(sortLowToHigh)
        setMode(SortingMode.LowToHigh)
        break;
      default:
        setMode(SortingMode.HighToLow)
    }
  }
  const reload = () => {
    setReloading(true)
    webApi.getAllFeedbacks()
    .then((res) => {
        setTable(res.data.filter((e: UserMessage) => e.isComplaint === 0))
        setReloading(false)
      })
    .catch((err) => toast(err))
  }

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <ButtonGroup variant="ghost">
        <Button m='1'
          isLoading={reloading}
          colorScheme='blue'
          onClick={reload}
          >Recharger</Button>
        <Button m='1'
          onClick={() => sortTable(
            gradeMode,
            setGradeMode,
            (a, b) => b.rating - a.rating,
            (a, b) => a.rating - b.rating
          )}
          rightIcon={gradeMode === SortingMode.HighToLow ?
            <ArrowUpIcon /> : <ArrowDownIcon />}
          >Note</Button>
        <Button m='1'
          onClick={() => sortTable(
            dateMode,
            setDateMode,
            (a, b) => Date.parse(b.date) - Date.parse(a.date),
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
          )}
          rightIcon={dateMode === SortingMode.HighToLow ?
            <ArrowUpIcon /> : <ArrowDownIcon />}
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
          {table?.map((e: UserMessage) => <Feedback message={e} key={e.id} />)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FeedbackPage
