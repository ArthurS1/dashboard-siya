import EmailsSettings from "../components/EmailsSettings"
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableTextarea,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react"
import {
  SettingsIcon
} from "@chakra-ui/icons"
import * as React from "react"

const EmailsPage = () => {
  // Settings State
  const [settings, setSettings] = React.useState({
    isModalOpen: false,
    sendToAllUsers: false,
    csv: undefined,
  })

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
    <Editable h="50vh" defaultValue='Email Text'>
      <EditablePreview h="100%" />
      <EditableTextarea h="100%" />
    </Editable>
    <ButtonGroup variant="ghost">
      <Button colorScheme="blue">Envoyer</Button>
      <Button colorScheme="red">Effacer</Button>
      <IconButton
        onClick={() => setSettings({...settings, isModalOpen: true})}
        aria-label="Settings"
        icon=<SettingsIcon/>
        />
    </ButtonGroup>
    <EmailsSettings
      state={settings}
      setState={setSettings}
      />
    </Box>
  )
}

export default EmailsPage
