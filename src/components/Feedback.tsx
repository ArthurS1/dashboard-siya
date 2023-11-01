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
  useState
} from "react"

import Rating from "../components/Rating"
import UserMessage from "../interfaces/UserMessage"
import {
  useWebApi,
} from "../common/WebApi"
import {
  useConfiguration
} from "../contexts/Configuration"
import {
  useCredentials
} from "../contexts/Credentials"

const Feedback = ({message}: {message: UserMessage}) => {
  const toast = useToast()

  const creds = useCredentials()
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const [importance, setImportance] = useState(message.importance ?? 0)
  const updateImportance = (id: number, importance: number) => {
    webApi.setFeedbackImportance(id, importance)
      .catch((err) => toast(err))
  }

  return (
    <Tr>
      <Td>{message.email}</Td>
      <Td>{message.date}</Td>
      <Td>
        <Rating value={message.rating !== null ? message.rating : 0 } />
      </Td>
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

export default Feedback
