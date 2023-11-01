import {
  Box,
  Button,
  CloseButton,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react';

//TODO : wtf why from signalspage
import { Signal } from '../routes/SignalsPage';

const SlideOver = ({ signal, setShow }: { signal: Signal, setShow: any }) => { // eslint-disable-line

  return (
    <Flex
      boxShadow="2xl"
      position="fixed"
      direction="column"
      borderLeftRadius="2xl"
      top={0}
      right={0}
      h="100%"
      backgroundColor="white"
      justify="space-between">
      <Box>
        <CloseButton onClick={() => setShow(false)} />
        <Box p={5}>
          <Box py={4}>
            <Text fontSize="sm">Date du signalement</Text>
            <Text>{signal.created_at}</Text>
          </Box>
          <Box py={4}>
            <Text fontSize="sm">Dernière mise à jour</Text>
            <Text>{signal.last_updated_at}</Text>
          </Box>
          <Box py={4} display={signal.verified ? '' : 'none'}>
            <Badge colorScheme="green">VERIFIED</Badge>
          </Box>
        </Box>
      </Box>
      <Box p={5}>
        <Button disabled={true} colorScheme="pink">Profil Utilisateur</Button>
      </Box>
    </Flex>
  );
};

export default SlideOver;
