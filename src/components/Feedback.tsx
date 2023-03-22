import {
  Tr,
  Td,
  Flex,
  Select,
  Tooltip,
  IconButton,
  useToast,
} from "@chakra-ui/react"
import {
  CheckIcon
} from "@chakra-ui/icons"
import {
  useContext
} from "react"

import Rating from "@components/Rating"
import UserMessage from "@interfaces/UserMessage"
import {
  apiGet
} from "@common/ApiCall"
import {
  CredentialsContext
} from "@common/Credentials"

enum Importance {
  Unused,
  Urgent,
  Important,
  Useless,
}

const Feedback = ({message}: {message: UserMessage}) => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const updateImportance = (id: number, importance: Importance) => {
    apiGet(
      '/feedback/changeImportance',
      {
        feedback: {
          id,
          importance,
        }
      },
      (res) => console.log("test"),
      toast,
      credentials
    )
  }

  return (
    <Tr>
      <Td>{message.email}</Td>
      <Td>{message.date}</Td>
      <Td>
        <Rating value={message.importance !== null ? message.importance : 0 } />
      </Td>
      <Td>{message.content}</Td>
      <Td>
        <Flex>
          <Select placeholder="non traité" value="true">
            <option>urgent</option>
            <option>important</option>
            <option>inutile</option>
          </Select>
          <Tooltip label="sauvegarder">
          <IconButton
            mx={2}
            aria-label="sauvegarder"
            variant="ghost"
            colorScheme="green"
            onClick={() => updateImportance(message.id, 1)}
            icon=<CheckIcon />
          />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  )
}

export default Feedback
