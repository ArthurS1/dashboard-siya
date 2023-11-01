import {
  Box,
  Button,
  ButtonGroup,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  useToast
} from "@chakra-ui/react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons"
import {
  useState
} from "react"

import AmbassadorData from "../interfaces/AmbassadorData"
import Ambassador from "../components/Ambassador"
import {
  useConfiguration
} from "../contexts/Configuration"
import { useMobileApi } from "common/MobileApi"

enum SortingMode {
  LowToHigh,
  HighToLow,
  NoSort,
}


const ReferralsPage = () => {
  const toast = useToast()

  const conf = useConfiguration()
  const mobileApi = useMobileApi(conf)

  const [table, setTable] = useState<AmbassadorData[]>([])
  const [reloading, setReloading] = useState(false)
  const [levelMode, setLevelMode] = useState(SortingMode.NoSort)
  const [shareMode, setShareMode] = useState(SortingMode.NoSort)

  function sortToggle<T>(
    table: Array<T> | undefined,
    state: SortingMode,
    setState: (a: SortingMode) => void,
    { fromHighToLow: f1, fromHighToLow: f2 }:
      {
        fromHighToLow: (a: T, b: T) => number,
        fromLowToHigh: (a: T, b: T) => number,
      }
  ) {
    switch (state) {
      case SortingMode.LowToHigh:
        table?.sort(f1)
        setState(SortingMode.HighToLow)
        break;
      case SortingMode.HighToLow:
        table?.sort(f2)
        setState(SortingMode.LowToHigh)
        break;
      default:
        setState(SortingMode.HighToLow)
    }
  }

  async function refreshAllUsers(): Promise<AmbassadorData[]> {
    const users = await mobileApi.getAllUsers()
    return users.data;
  }

  const reload = () => {
    setReloading(true)
    refreshAllUsers()
      .then((a) => setTable(a))
      .then((_) => setReloading(false))
      .catch((err) => toast({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      }))
  }
  const ambassadorList = table.map((e) => <Ambassador key={e._id} for={e} />)

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <ButtonGroup variant="ghost">
        <Button m='1'
          isLoading={reloading}
          colorScheme='blue'
          onClick={reload}
        >Recharger</Button>
        <Button m='1'
          onClick={() => sortToggle<AmbassadorData>(
            table,
            levelMode,
            setLevelMode,
            {
              fromHighToLow: (a, b) => b.amb_level - a.amb_level,
              fromLowToHigh: (a, b) => a.amb_level - b.amb_level
            }
          )}
          rightIcon={levelMode === SortingMode.HighToLow ?
            <ArrowUpIcon /> : <ArrowDownIcon />}
        >Niveau</Button>
        <Button m='1'
          onClick={() => sortToggle<AmbassadorData>(
            table,
            shareMode,
            setShareMode,
            {
              fromHighToLow: (a, b) => b.amb_nb_of_recommendations - a.amb_nb_of_recommendations,
              fromLowToHigh: (a, b) => a.amb_nb_of_recommendations - b.amb_nb_of_recommendations
            }
          )}
          rightIcon={shareMode === SortingMode.HighToLow ?
            <ArrowUpIcon /> : <ArrowDownIcon />}
        >Nombre de partages</Button>
      </ButtonGroup>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>nombre de partages</Th>
            <Th>niveau</Th>
            <Th>identifiant</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ambassadorList}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ReferralsPage
