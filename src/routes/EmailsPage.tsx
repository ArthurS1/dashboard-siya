import EmailsSettings from "../components/EmailsSettings"
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableTextarea,
  EditablePreview,
  IconButton,
  useToast,
} from "@chakra-ui/react"
import {
  SettingsIcon
} from "@chakra-ui/icons"
import {
  useState,
} from "react"

import {
  useCredentials
} from "../contexts/Credentials"
import { useConfiguration } from "contexts/Configuration"
import { useWebApi } from "common/WebApi"

const EmailsPage = () => {
  const toast = useToast()

  const creds = useCredentials()
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const [settings, setSettings] = useState({
    isModalOpen: false,
    sendToAllUsers: true,
    csv: undefined,
  })
  const [emailContent, setEmailContent] = useState("Texte de l'email")

  const sendEmail = (content: string) => {
    if (settings.csv) {
      webApi.sendEmail(content, settings.csv)
        .catch((err) => toast(err))
    } else {
      webApi.sendEmail(content, undefined)
        .catch((err) => toast(err))
    }
  }

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <Editable h="50vh" value={emailContent} onChange={
        (content) => setEmailContent(content)
      }>
        <EditablePreview h="100%" />
        <EditableTextarea h="100%" />
      </Editable>
      <ButtonGroup variant="ghost">
        <Button colorScheme="blue" onClick={() => sendEmail(emailContent)}>Envoyer</Button>
        <Button colorScheme="red" onClick={() => setEmailContent("")}>Effacer</Button>
        <IconButton
          onClick={() => setSettings({ ...settings, isModalOpen: true })}
          aria-label="Settings"
          icon=<SettingsIcon />
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
