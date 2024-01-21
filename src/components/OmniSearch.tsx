import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Button,
  Text,
  Spacer,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import {
  Search2Icon,
} from '@chakra-ui/icons';
import {
  InstantSearch,
  useSearchBox,
  UseSearchBoxProps,
  UseHitsProps,
  useHits,
} from 'react-instantsearch';
import {
  useState,
} from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import { buildSearchClient } from 'common/Typesense';
import { useConfiguration } from 'contexts/Configuration';
import User from 'interfaces/User';

function OmniHits(props: UseHitsProps) {
  const { hits, results } = useHits(props);
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>{results?.nbHits} résultats trouvés</TableCaption>
      <Tbody> {
        hits.map((hit) => (
          <Tr key={hit.objectID}>
            <Td>
              <Flex direction='row' alignItems='center' w='100%'>
                <Text>{(hit as unknown as User).email}</Text>
                <Spacer />
                <Button onClick={
                  () => navigate(`/user/${(hit as unknown as User)._id}`)
                  }>
                  Profile
                  </Button>
              </Flex>
            </Td>
          </Tr>
        ))
      }
      </Tbody>
    </Table>
  );
}

function OmniSearchBox(
  props: UseSearchBoxProps & { focusToggle: (a: boolean) => void }
) {
  const { query, refine } = useSearchBox(props);
  const [_, setInputValue] = useState(query);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <InputGroup mx={5} w='25rem'>
      <InputLeftElement pointerEvents='none'>
        <Search2Icon color='gray.300' />
      </InputLeftElement>
      <Input
        placeholder='rechercher un retour, un utilisateur, ...'
        variant='filled'
        onChange={(event) => {
          setQuery(event.target.value);
          event.stopPropagation();
          event.preventDefault();
        }}
        onBlur={() => new Promise(r => setTimeout(r, 100))
                        .then(() => props.focusToggle(false))}
        onFocus={() => props.focusToggle(true)}
      />
    </InputGroup>
  );
}

function OmniSearch() {
  const conf = useConfiguration();
  const searchClient = buildSearchClient(conf);
  const [focus, setFocus] = useState(false);

  // add an error boundary ?
  return (
    <Box>
      <InstantSearch indexName="users" searchClient={searchClient}>
        <OmniSearchBox focusToggle={setFocus} />
        <Box
          hidden={!focus}
          position="absolute"
          zIndex={99}
          p={2}
          mx={5}
          w='25rem'
          maxH='50vh'
          bg="white"
          borderRadius={10}
          overflow='scroll'
          shadow="xl"
          >
          <OmniHits />
        </Box>
      </InstantSearch >
    </Box >
  );
}

export default OmniSearch;
