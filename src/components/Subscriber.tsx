import {
  Td,
  Tr,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input
} from '@chakra-ui/react';
import {
  useDisclosure
} from '@chakra-ui/react';
import {
  useState
} from 'react';

import UserData from '../interfaces/User';
import {
  useConfiguration
} from '../contexts/Configuration';
import {
  useMobileApi
} from '../common/MobileApi';
import { useNavigate } from 'react-router-dom';

const User = (
  { for: user, onRemove: f}:
  { for: UserData, onRemove: (id: string) => void }
  ) => {
  const navigate = useNavigate();
  const conf = useConfiguration();
  const mobileApi = useMobileApi(conf);

  const { isOpen, onOpen: onDeleteButtonPressed, onClose } = useDisclosure();
  const [emailVerification, setEmailVerification] = useState('');

  const deleteUser = () => {
    mobileApi.deleteUser(user._id)
      .then(() => {
          f(user._id);
          onClose();
      })
      .catch((err) => console.log(err));
  };

  const onProfileButtonPressed = (id: string) => {
    navigate(`/user/${id}`);
  };

 return (
    <>
      <Tr>
        <Td>
          {user.email}
        </Td>
        <Td>
          {user.phoneNumber}
        </Td>
        <Td>
          <ButtonGroup>
            <Button
              colorScheme="gray"
              onClick={() => onProfileButtonPressed(user._id)}>
              Profil
            </Button>
            <Button colorScheme="red" onClick={onDeleteButtonPressed}>
              Supprimer
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Supprimer ce compte définitivement ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <b>Vous allez définitivement supprimer le compte {user.email}.</b>
            Veuillez entrer l'email de l'utilisateur pour confirmer.
            <Input
              my={5}
              placeholder="email"
              onChange={(a) => setEmailVerification(a.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              isDisabled={emailVerification !== user.email}
              onClick={deleteUser}>
              Supprimer définitivement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default User;
