import * as React from "react"
import { Authentication } from "./Authentication"
import { ListView } from "./ListView"
import {
  ChakraProvider,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Box,
  Flex,
  Button,
  theme,
} from "@chakra-ui/react"
import AdminData from "./AdminData.interface"
import { SearchFeedback } from "./SearchFeedback"
import { ChartView } from "./ChartView"

const redirect = () => {
  window.location.href = "https://siya-eip.com/"
}

export const App = () => {
  const [adminData, setAdminData] = React.useState<AdminData | undefined>(undefined)

  return (<ChakraProvider theme={theme}>
    <Flex p='4' flexDirection='row' justifyContent='space-between' alignItems='center' w='100%'>
      <Box>
        <Heading>Dashboard Administrateur</Heading>
        <Text fontSize='sm'>Projet Siya EIP 2024</Text>
      </Box>
      <Box>
        <Button mx='1' onClick={redirect}>Retour au site</Button>
      </Box>
    </Flex>
    <Tabs>
      <TabList>
        <Tab>Connexion</Tab>
        <Tab>Liste</Tab>
        <Tab>Graphique</Tab>
        <Tab>Recherche</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Authentication dataSetter={setAdminData}></Authentication>
        </TabPanel>
        <TabPanel>
          <ListView data={adminData}></ListView>
        </TabPanel>
        <TabPanel>
          <ChartView data={adminData}></ChartView>
        </TabPanel>
        <TabPanel>
          <SearchFeedback data={adminData}></SearchFeedback>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </ChakraProvider>)
}
