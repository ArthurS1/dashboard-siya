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

import EmailsSettingsData from "@interfaces/EmailsSettingsData.interface"

const EmailsSettings = ({state, setState}: {
  state: EmailsSettingsData,
  setState: any,
  }) => {

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
              onChange={(a) => setState({...state, sendToAllUsers: a})}
              isChecked={state.sendToAllUsers}
              />
          </Flex>
          <Button
            rightIcon=<DownloadIcon />
            my={5}
            disabled={!state.sendToAllUsers}
            >Télécharger un fichier</Button>
          <Text fontSize="xs">Envoyez un fichier CSV contenant une colonne étant la liste des emails à envoyer</Text>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default EmailsSettings
