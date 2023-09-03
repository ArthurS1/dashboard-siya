import {
  Button,
  ButtonGroup,
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons"
import {
  useState
} from "react"
import Config from "../Config.json"
import Axios from "axios"

import UserData from "@interfaces/User"
import User from "@components/User"

enum SortingMode {
  LowToHigh,
  HighToLow,
  NoSort,
}

async function refreshAllUsers(): Promise<UserData[]> {
    let users = (await Axios.get(`${Config.mobileApiUrl}/users/getAll`)).data;
    return users;
}

const UsersPage = () => {
  const [reloading, setReloading] = useState(false)
  const [users, setUsers] = useState<UserData[]>([])
  const [emailMode, setEmailMode] = useState(SortingMode.NoSort)
  const toast = useToast()

  const reload = () => {
    setReloading(true)
    refreshAllUsers()
      .then((a) => setUsers(a))
      .then((_) => setReloading(false))
      .catch((err) => toast({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      }))
  }
  const removeRowWithId = (id: string) => {
    setUsers(users.filter((a) => a._id !== id))
  }
  const userList = users.map((u) => <User key={u._id} for={u} onRemove={removeRowWithId} />)
  const sortTable = (
    mode: SortingMode,
    setMode: (a: SortingMode) => void,
    sortHighToLow: (a: any, b: any) => number,
    sortLowToHigh: (a: any, b: any) => number
  ) => {
    switch (mode) {
      case SortingMode.LowToHigh:
        users?.sort(sortHighToLow)
        setMode(SortingMode.HighToLow)
        break;
      case SortingMode.HighToLow:
        users?.sort(sortLowToHigh)
        setMode(SortingMode.LowToHigh)
        break;
      default:
        setMode(SortingMode.HighToLow)
    }
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
          emailMode,
          setEmailMode,
          (a, b) => Number(b.email > a.email),
          (a, b) => Number(a.email > b.email)
        )}
        rightIcon={emailMode === SortingMode.HighToLow ?
          <ArrowUpIcon /> : <ArrowDownIcon />}
        >A-Z</Button>
      </ButtonGroup>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>email</Th>
            <Th>téléphone</Th>
            <Th>actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userList}
        </Tbody>
      </Table>
    </Box>
  )
}

export default UsersPage;
