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

import UserMessage from "@interfaces/UserMessage"
import Complaint from "@components/Complaint"
import {
  CredentialsContext
} from "@common/Credentials"
import {
  apiGet
} from "common/ApiCall"

enum SortingMode {
  LowToHigh,
  HighToLow,
  NoSort,
}

const ComplaintsPage = () => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const [table, setTable] = React.useState<UserMessage[] | undefined>(undefined)
  const [dateMode, setDateMode] = React.useState(SortingMode.NoSort)
  const [reloading, setReloading] = React.useState(false)

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
    apiGet(
      "/feedback/getAll",
      {},
      (res) => {
        setTable(res.data.filter((e: UserMessage) => e.isPlainte === 1))
        setReloading(false)
      },
      (_) => {setReloading(false)},
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
            <Th>commentaire</Th>
            <Th>importance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {table?.map((e: UserMessage) => <Complaint message={e} key={e.id} />)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ComplaintsPage
