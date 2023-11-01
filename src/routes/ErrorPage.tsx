import {
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import {
  Link
} from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Text fontSize="5xl">
        Page introuvable
      </Text>
      <Link to="/">
        <Button colorScheme="pink" m={3}>
          Revenir à la page principale
        </Button>
      </Link>
    </Flex>
  );
};

export default ErrorPage;
