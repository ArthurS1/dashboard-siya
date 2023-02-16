import {
  Heading,
  Box,
  Button,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react"
import AdminData from "../AdminData.interface"
import {
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts"
import React from "react"
import axios from "axios"
import Config from "../Config.json"
import DataRow from "../DataRow.interface"

interface FeedbacksData {
  date: Date,
  grades: number,
}

export const ChartView = ({data}: {data: AdminData | undefined}) => {
  const [timeFrom, setTimeFrom] = React.useState('1939-09-01')
  const [timeTo, setTimeTo] = React.useState('1945-09-02')
  const [table, setTable] = React.useState<DataRow[] | undefined>(undefined)
  const toast = useToast()
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
  const apply = () => {
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
  const sameDay = (d1: Date, d2: Date) : boolean => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth === d2.getMonth
    )
  }

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
    <Box>
      <Box m={2}>
        <Text> Du : </Text>
        <Input my={2} type='date' value={timeFrom} onChange={event => setTimeFrom(event.currentTarget.value)}/>
        <Text> Au : </Text>
        <Input my={2} type='date' value={timeTo} onChange={event => setTimeTo(event.currentTarget.value)}/>
        <Button my={2} colorScheme='blue' onClick={apply}>Appliquer</Button>
      </Box>
      <Heading fontSize='lg'>Moyenne des retours / jour</Heading>
      <LineChart
        width={500}
        height={300}
        data={feedbacksData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis label='retours'/>
        <XAxis label='jours'/>
        <Tooltip />
        <Line type="monotone" dataKey="grades" stroke="#8884d8" />
      </LineChart>
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
    </Box>
  )
}
