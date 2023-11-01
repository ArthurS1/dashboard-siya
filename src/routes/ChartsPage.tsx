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
import { useState } from "react"

import FeedbackData from "../interfaces/FeedbackData"
import NewsletterData from "../interfaces/NewsletterData"
import ApkDownloadsData from "interfaces/ApkDownloadsData"
import {
  useCredentials,
} from "../contexts/Credentials"
import {
  useConfiguration
} from "../contexts/Configuration"
import { useWebApi } from "common/WebApi"

interface DataPerDay {
  date: Date,
  data: number,
}

const ChartsPage = () => {
  const toast = useToast()

  const creds = useCredentials()
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const formatDate = (date: Date) => [
    date.getFullYear(),
    String(date.getMonth()).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join("-")
  const getTodayDate = () => new Date(Date.now())
  const getLastMonthDate = () => {
    let tmp = new Date(Date.now())
    tmp.setMonth(tmp.getMonth() - 1)
    return tmp
  }
  const [timeFrom, setTimeFrom] = useState(formatDate(getLastMonthDate()))
  const [timeTo, setTimeTo] = useState(formatDate(getTodayDate()))
  const [feedbacks, setFeedbacks] = useState<FeedbackData[] | undefined>(undefined)
  const [newletterAccounts, setNewsletterAccounts] = useState<NewsletterData[] | undefined>(undefined)
  const [apkDownloaded, setApkDownloaded] = useState<ApkDownloadsData[] | undefined>(undefined)
  const apply = () => {
    webApi.getAllFeedbacks()
      .then((res) => setFeedbacks(res.data))
      .catch((err) => toast(err))
    webApi.getAllSubscribers()
      .then((res) => setNewsletterAccounts(res.data))
      .catch((err) => toast(err))
    webApi.getApkDownloadNumbers()
      .then((res) => setApkDownloaded(res.data))
      .catch((err) => toast(err))
  }
  const sameDay = (d1: Date, d2: Date): boolean => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth === d2.getMonth
    )
  }
  const apkDownloadsData: DataPerDay[] | undefined =
    apkDownloaded
      ?.map((a: ApkDownloadsData): DataPerDay => { return {date: new Date(a.date), data: a.nbr} } )
      ?.reduce((acc: DataPerDay[], c: DataPerDay): DataPerDay[] => {
        if (acc.length === 0)
          return [c]
        else {
          let last = acc[acc.length]
          return acc.concat({date: c.date, data: c.data + last.data})
        }
      }, [])
  const newsletterAccountsData: DataPerDay[] | undefined =
    newletterAccounts?.reduce((acc: DataPerDay[] | undefined, val: NewsletterData): DataPerDay[] | undefined => {
      let currentValDate = new Date(val.date)

      if (acc === undefined)
        return [{ date: currentValDate, data: 1 }]
      if (sameDay(currentValDate, acc[acc.length - 1].date)) {
        acc[acc.length - 1].data += 1
      } else {
        acc.push({ date: currentValDate, data: 1 })
      }
      return acc
    }, undefined);

  const feedbacksData: DataPerDay[] | undefined = feedbacks?.reduce((acc: DataPerDay[] | undefined, val: FeedbackData): DataPerDay[] | undefined => {
    let currentValDate = new Date(val.date)

    if (acc === undefined)
      return [{ date: currentValDate, data: val.importance }]
    if (sameDay(currentValDate, acc[acc.length - 1].date)) {
      acc[acc.length - 1].data += val.importance
      acc[acc.length - 1].data /= 2
    } else {
      acc.push({ date: currentValDate, data: val.importance })
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
          onChange={event => setTimeFrom(event.currentTarget.value)} />
        <Text mx={2}>au</Text>
        <Input
          w="fit-content"
          minW="20rem"
          type="date"
          value={timeTo}
          onChange={event => setTimeTo(event.currentTarget.value)} />
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
            height={300}
            data={feedbacksData}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} height={10} />
            <YAxis label='retours' />
            <XAxis label='jours' />
            <Tooltip />
            <Line type="monotone" dataKey="data" stroke="#8884d8" />
          </LineChart>
        </GridItem>
        <GridItem>
          <Heading fontSize='lg'>Nouveaux inscrits newsletter / jour</Heading>
          <LineChart
            width={500}
            height={300}
            data={newsletterAccountsData}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} height={10} />
            <YAxis label='enregistrements' />
            <XAxis label='jours' />
            <Tooltip />
            <Line type="monotone" dataKey="data" stroke="#8884d8" />
          </LineChart>
        </GridItem>
        <GridItem>
          <Heading fontSize='lg'>Nombre cumulé de téléchargements de l'APK</Heading>
          <LineChart
            width={500}
            height={300}
            data={apkDownloadsData}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} height={10} />
            <YAxis label='apk telecharges' />
            <XAxis label='jours' />
            <Tooltip />
            <Line type="monotone" dataKey="data" stroke="#8884d8" />
          </LineChart>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default ChartsPage
