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
    useContext,
} from "react"

import {
  CredentialsContext
} from "@common/Credentials"
import {
  apiPost
} from "@common/ApiCall"

const EmailsPage = () => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const [settings, setSettings] = useState({
    isModalOpen: false,
    sendToAllUsers: true,
    csv: undefined,
  })
  const [emailContent, setEmailContent] = useState("Texte de l'email")

  const sendEmail = (content: string) => {
    apiPost(
      "/newsletter/customizedMail",
      { template: content },
      toast,
      credentials
    )
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
