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
  useToast,
} from '@chakra-ui/react';
import {
  DownloadIcon,
} from '@chakra-ui/icons';
import {
  useFilePicker
} from 'use-file-picker';

import EmailsSettingsData from '../interfaces/EmailsSettingsData';

const EmailsSettings = ({ state, setState }: {
  state: EmailsSettingsData,
  setState: any, // eslint-disable-line
}) => {

  const toast = useToast();
  const [openFileSelector] = useFilePicker({
    accept: '.csv',
    multiple: false,
    onFilesSuccessfulySelected:
      (files) => getEmailsFromCsvFile(files.filesContent[0].content)
  });

  const getEmailsFromCsvFile = (s: string) => {
    const emails = s.slice(0, -1).split(',');
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const hasErrors = emails.map((e) => re.test(e)).includes(false);

    console.log(emails);
    console.log(emails.map((e) => re.test(e)));
    if (hasErrors) {
      toast({
        title: 'Erreur',
        description: 'Un ou plusieurs mails du fichier sont invalides.'
          + 'Verifiez que votre fichier est terminé par NULL.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else
      state.csv = emails;
  };

  return (
    <Modal
      isOpen={state.isModalOpen}
      onClose={() => setState({ ...state, isModalOpen: false })}
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
              onChange={(_) => // eslint-disable-line
                setState({ ...state, sendToAllUsers: !state.sendToAllUsers })}
              defaultChecked={true}
            />
          </Flex>
          <Button
            rightIcon=<DownloadIcon />
            onClick={() => openFileSelector()}
            my={5}
            disabled={state.sendToAllUsers}
          >Télécharger un fichier</Button>
          <Box hidden={state.sendToAllUsers || state.csv?.length === 0}>
            <Text><b>Le mail sera envoyé à:</b></Text>
            <Box
              mb={5}
              borderColor={'gray.200'}
              borderRadius="md"
              borderWidth="0.2rem"
              p={2}>
              {state.csv?.map((e) => <Text key={e}>{e}</Text>)}
            </Box>
          </Box>
          <Text fontSize="xs">
            {'Envoyez un fichier CSV contenant une'
             + ' colonne étant la liste des emails à envoyer'}
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default EmailsSettings;
