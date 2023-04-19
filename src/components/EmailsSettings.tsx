import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Switch,
  Text,
} from "@chakra-ui/react"
import {
  DownloadIcon,
} from "@chakra-ui/icons"
import {
  useFilePicker
} from "use-file-picker"
import {
  useState
} from "react"

import EmailsSettingsData from "@interfaces/EmailsSettingsData.interface"

const EmailsSettings = ({state, setState}: {
  state: EmailsSettingsData,
  setState: any,
  }) => {

  const [parsedEmails, setParsedEmails] : [string[], any] = useState([])
  const [openFileSelector] = useFilePicker({
    accept: ".csv",
    multiple: false,
    onFilesSuccessfulySelected:
      (files) => getEmailsFromCsvFile(files.filesContent[0].content)
  })

  const getEmailsFromCsvFile = (s: string) => {
    setParsedEmails(s.split(','))
  }

  return (
    <Modal
      isOpen={state.isModalOpen}
      onClose={() => setState({...state, isModalOpen: false})}
      isCentered
      >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Paramètres des emails</ModalHeader>
        <ModalCloseButton />
        <Box px={6} pb={6}>
          <Flex alignItems="center">
            <Text mr={2}>Envoyer à tous les utilisateurs</Text>
            <Switch
              colorScheme="pink"
              size="lg"
              onChange={(_) => setState({...state, sendToAllUsers: !state.sendToAllUsers})}
              defaultChecked={true}
              />
          </Flex>
          <Button
            rightIcon=<DownloadIcon />
            onClick={() => openFileSelector()}
            my={5}
            disabled={state.sendToAllUsers}
            >Télécharger un fichier</Button>
          <Box hidden={state.sendToAllUsers && parsedEmails.length !== 0}>
            <Text><b>Will be sent to:</b></Text>
            <Box mb={5} borderColor={"gray.200"} borderRadius="md" borderWidth="0.2rem" p={2}>
              {parsedEmails.map((e) => <Text>{e}</Text>)}
            </Box>
          </Box>
          <Text fontSize="xs">Envoyez un fichier CSV contenant une colonne étant la liste des emails à envoyer</Text>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default EmailsSettings
