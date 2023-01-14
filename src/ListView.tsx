import {
  Button,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import Config from "./Config.json"
import React from "react"
import AdminData from "./AdminData.interface"
import DataRow from "./DataRow.interface"

enum Sorting {
  LowToHigh,
  HighToLow,
  NoSort,
}

export const ListView = ({data}: {data: AdminData | undefined}) => {
  const toast = useToast()
  const [table, setTable] = React.useState<DataRow[] | undefined>(undefined)
  const [gradeMode, setGradeMode] = React.useState(Sorting.NoSort)
  const [dateMode, setDateMode] = React.useState(Sorting.NoSort)
  const tableList = table?.map((e: DataRow) => (
  <Tr key={e.id}>
    <Td>{e.email}</Td>
    <Td>{e.importance}</Td>
    <Td>{e.content}</Td>
    <Td>{e.date}</Td>
  </Tr>
  ))
  const sortGrade = () => {
    switch (gradeMode) {
      case Sorting.LowToHigh:
        table?.sort((a, b) => a.importance - b.importance)
        setGradeMode(Sorting.HighToLow)
        break;
      case Sorting.HighToLow:
        table?.sort((a, b) => b.importance - a.importance)
        setGradeMode(Sorting.LowToHigh)
        break;
      default:
        setGradeMode(Sorting.HighToLow)
    }
  }
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
    if (!data) {
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
        email: data.email,
        password: data.pass,
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
  <Box>
    <Text>Trier par:</Text>
    <Button m='1' onClick={sortGrade}>{gradeMode == Sorting.HighToLow ? "Note (Plus haute)" : "Note (Plus basse)"}</Button>
    <Button m='1' onClick={sortDate}>{dateMode == Sorting.HighToLow ? "Date (Plus récent)" : "Date (Plus ancienne)"}</Button>
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
    <Button m='1' colorScheme='blue' onClick={load}>Recharger</Button>
  </Box>
  )
}
