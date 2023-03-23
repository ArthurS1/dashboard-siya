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
  useContext, useState
} from "react"

import UserMessage from "@interfaces/UserMessage"
import {
  apiPost,
} from "@common/ApiCall"
import {
  CredentialsContext
} from "@common/Credentials"

const Complaint = ({message}: {message: UserMessage}) => {
  const credentials = useContext(CredentialsContext)
  const toast = useToast()
  const [importance, setImportance] = useState(message.importance ?? 0)
  const updateImportance = (id: number, importance: number) => {
    apiPost(
      '/feedback/changeImportance',
      {
        feedback: {
          id,
          importance,
        }
      },
      toast,
      credentials
    )
  }

  return (
    <Tr>
      <Td>{message.email}</Td>
      <Td>{message.date}</Td>
      <Td maxW={80}>{message.content}</Td>
      <Td>
        <Flex>
          <Select placeholder="sélectionez" value={importance}
            onChange={(i) => setImportance(Number(i.target.value))}>
            <option value="1">inutile</option>
            <option value="2">important</option>
            <option value="3">urgent</option>
          </Select>
          <Tooltip label="sauvegarder">
          <IconButton
            mx={2}
            aria-label="sauvegarder"
            variant="ghost"
            colorScheme="green"
            onClick={() => updateImportance(message.id, importance)}
            icon=<CheckIcon />
          />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  )
}

export default Complaint
