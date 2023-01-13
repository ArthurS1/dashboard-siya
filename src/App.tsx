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

const redirect = () => {
  window.location.href = "https://siya-eip.com/"
}

export const App = () => (
  <ChakraProvider theme={theme}>
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
      </TabList>
      <TabPanels>
        <TabPanel>
          <Authentication></Authentication>
        </TabPanel>
        <TabPanel>
          <ListView></ListView>
        </TabPanel>
        <TabPanel>
          <p>Graphique</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </ChakraProvider>
)
