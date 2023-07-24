import {
  Button,
  ButtonGroup,
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

enum SortingMode {
  LowToHigh,
  HighToLow,
  NoSort,
}

const UsersPage = () => {
  return (
    <Box m={10} p={5} bg="white" borderRadius={10} shadow="md">
      <ButtonGroup variant="ghost">
        <Button m='1'
          //isLoading={reloading}
          colorScheme='blue'
          //onClick={reload}
          >Recharger</Button>
        <Button m='1'
          /*onClick={() => sortTable(
            gradeMode,
            setGradeMode,
            (a, b) => b.rating - a.rating,
            (a, b) => a.rating - b.rating
          )}
          rightIcon={gradeMode === SortingMode.HighToLow ?
            <ArrowUpIcon /> : <ArrowDownIcon />}*/
          >A-Z</Button>
      </ButtonGroup>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>email</Th>
            <Th>téléphone</Th>
            <Th>actions</Th>
          </Tr>
        </Thead>
        <Tbody>
        </Tbody>
      </Table>
    </Box>
  )
}

export default UsersPage;
