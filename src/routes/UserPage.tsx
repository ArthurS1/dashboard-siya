import {
  Button,
  Box,
  Flex,
  Table,
  Tbody,
  Th,
  Tr,
  Td,
  Text,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import {
} from '@chakra-ui/icons';
import {
  useLoaderData,
  useNavigate
} from 'react-router-dom';
import {
  useEffect, useState,
} from 'react';

import { useConfiguration } from 'contexts/Configuration';
import { useMobileApi } from 'common/MobileApi';
import UserData from 'interfaces/User';

const UserPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const userId = useLoaderData() as string;
  const conf = useConfiguration();
  const webApi = useMobileApi(conf);
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    webApi.getUser(userId)
      .then((res) => setUser(res.data))
      .catch((err) => toast(err));
  }, []);

  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <Button
        mx={2}
        colorScheme="linkedin"
        variant="ghost"
        onClick={() => navigate('/users')}>
        Retour
      </Button>
      <Flex flexDirection='column'>
        <Flex my={10} justifyContent='center' alignItems='center'>
          <Avatar mx={10} name={user?.username} size='xl' />
          <Text mx={10} fontSize='3xl'>{user?.username}</Text>
        </Flex>
        <Table>
          <Tbody>
            <Tr>
              <Th>Clef</Th>
              <Th>Valeur</Th>
            </Tr>
            <Tr>
              <Td>Pseudo</Td>
              <Td>{user?.username}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{user?.email}</Td>
            </Tr>
            <Tr>
              <Td>Téléphone</Td>
              <Td>{user?.phoneNumber}</Td>
            </Tr>
            <Tr>
              <Td>Dernière connexion</Td>
              <Td>{user?.last_login}</Td>
            </Tr>
            <Tr>
              <Td>Nombre de connexions uniques</Td>
              <Td>{user?.login_count}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
};

export default UserPage;

