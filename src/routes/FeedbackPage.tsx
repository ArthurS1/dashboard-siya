import React, { useContext } from "react"
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
import Feedback from "@components/Feedback"
import {
  CredentialsContext
} from "@common/Credentials"
import {
  apiGet
} from "common/ApiCall"

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
  const [reloading, setReloading] = React.useState(false)

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
  const reload = () => {
    setReloading(true)
    apiGet(
      "/feedback/getAll",
      {},
      (res) => {
        setTable(res.data)
        setReloading(false)
      },
      toast,
      credentials
    )
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
          {table?.map((e: UserMessage) => <Feedback message={e} key={e.id} />)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FeedbackPage
