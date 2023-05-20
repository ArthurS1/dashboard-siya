import {
  Heading,
  Box,
  Button,
  Text,
  Input,
  useToast,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import {
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts"
import React from "react"

import DataRow from "@interfaces/DataRow.interface"
import {
  CredentialsContext,
} from "@common/Credentials"
import { apiGet } from "@common/ApiCall"

interface FeedbacksData {
  date: Date,
  grades: number,
}

const ChartsPage = () => {
  const credentials = React.useContext(CredentialsContext);
  const formatDate = (date: Date) =>
    [date.getMonth(), date.getDate(), date.getFullYear()].join("/")
  const now = new Date(Date.now())
  const [timeFrom, setTimeFrom] = React.useState(formatDate(now))
  const [timeTo, setTimeTo] = React.useState(formatDate(now))
  const [table, setTable] = React.useState<DataRow[] | undefined>(undefined)
  const toast = useToast()
  const apply = () => {
    apiGet(
      "/feedback/getAll",
      {},
      (res) => setTable(res.data),
      (_) => {},
      toast,
      credentials
    )
  }
  const sameDay = (d1: Date, d2: Date) : boolean => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth === d2.getMonth
    )
  }
  const registrationData = [
    {
      n: 0,
      day: new Date("18-01-23")
    },
    {
      n: 0,
      day: new Date("19-01-23")
    }
  ]

  // TODO: remove the useless typing
  const feedbacksData : FeedbacksData[] | undefined = table?.reduce((acc: FeedbacksData[] | undefined, val: DataRow): FeedbacksData[] | undefined => {
    let currentValDate = new Date(val.date)

    if (acc === undefined)
      return [{ date: currentValDate , grades: val.importance }]
    if (sameDay(currentValDate, acc[acc.length - 1].date)) {
      acc[acc.length - 1].grades += val.importance
      acc[acc.length - 1].grades /= 2
    } else {
      acc.push({ date: currentValDate , grades: val.importance })
    }
    return acc
  }, undefined)

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <Flex align="center" justify="center" w="100%">
        <Input
          w="fit-content"
          minW="20rem"
          type="date"
          value={timeFrom}
          onChange={event => setTimeFrom(event.currentTarget.value)}/>
        <Text  mx={2}>au</Text>
        <Input
          w="fit-content"
          minW="20rem"
          type="date"
          value={timeTo}
          onChange={event => setTimeTo(event.currentTarget.value)}/>
        <Button
          mx={2}
          colorScheme="blue"
          variant="ghost"
          onClick={apply}>Appliquer</Button>
      </Flex>
      <Grid my={10} justifyItems="center" templateColumns="repeat(2, 1fr)">
        <GridItem>
        <Heading fontSize='lg'>Moyenne des retours / jour</Heading>
        <LineChart
        width={500}
        height={30}
        data={feedbacksData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis label='retours'/>
          <XAxis label='jours'/>
          <Tooltip />
          <Line type="monotone" dataKey="grades" stroke="#8884d8" />
        </LineChart>
        </GridItem>
        <GridItem>
          <Heading fontSize='lg'>Nouveaux inscrits newsletter / jour</Heading>
          <LineChart
          width={500}
          height={300}
          data={registrationData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis label='enregistrements'/>
            <XAxis label='jours'/>
            <Tooltip />
            <Line type="monotone" dataKey="grades" stroke="#8884d8" />
          </LineChart>
        </GridItem>
       </Grid>
    </Box>
  )
}

export default ChartsPage
