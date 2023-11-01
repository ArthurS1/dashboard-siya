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
import UserData from "../interfaces/User"
import {
  useConfiguration
} from "../contexts/Configuration"
import User from "../components/User"
import {
  default as ToggleableArray,
  Order
} from "../common/ToggleableArray"
import { useMobileApi } from "common/MobileApi"

const UsersPage = () => {
  const conf = useConfiguration()
  const mobileApi = useMobileApi(conf)

  const [reloading, setReloading] = useState(false)
  const [users, setUsers] = useState(new ToggleableArray<UserData>(0))
  const toast = useToast()

  const reload = () => {
    setReloading(true)
    refreshAllUsers()
      .then((a) => setUsers(new ToggleableArray(...a)))
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
    setUsers(new ToggleableArray(...(users.filter((a) => a._id !== id))))
  }
  const userList = users.map((u) => <User key={u._id} for={u} onRemove={removeRowWithId} />)

  async function refreshAllUsers(): Promise<UserData[]> {
    const users = await mobileApi.getAllUsers()
    return users.data
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
          onClick={() => users.sortToggle({
            fromHighToLow: (a, b) => Number(b.email > a.email),
            fromLowToHigh: (a, b) => Number(a.email > b.email)
          })}
          rightIcon={users.order === Order.HighToLow ?
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
