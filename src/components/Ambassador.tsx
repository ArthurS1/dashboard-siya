/*
 * A row of the ambassador program list.
 */

import {
  Tr,
  Td,
  Flex,
  Select,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import {
  CheckIcon,
} from '@chakra-ui/icons';
import {
  useState
} from 'react';

import AmbassadorData from '../interfaces/AmbassadorData';
import {
  useConfiguration
} from '../contexts/Configuration';
import { useMobileApi } from 'common/MobileApi';

const Ambassador = ({ for: user }: { for: AmbassadorData }) => {
  const conf = useConfiguration();
  const mobileApi = useMobileApi(conf);

  const [level, setLevel] = useState(user.amb_level);

  function updateLevel(id: string, level: number) {
    mobileApi.updateUserAmbassadorLevel(id, level)
      .then(() => setLevel(level));
  }

  return (
    <Tr>
      <Td>
        {user.amb_nb_of_recommendations}
      </Td>
      <Td>
        <Flex>
          <Select placeholder="sélectionez" value={level}
            onChange={(i) => setLevel(Number(i.target.value))}>
            <option value="0">niveau 0</option>
            <option value="1">niveau 1</option>
            <option value="2">niveau 2</option>
            <option value="3">niveau 3</option>
          </Select>
          <Tooltip label="sauvegarder">
            <IconButton
              mx={2}
              aria-label="sauvegarder"
              variant="ghost"
              colorScheme="green"
              onClick={() => updateLevel(user._id, level)}
              icon=<CheckIcon />
            />
          </Tooltip>
        </Flex>
      </Td>
      <Td>
        {user.amb_unique_code}
      </Td>
    </Tr>
  );
};

export default Ambassador;
