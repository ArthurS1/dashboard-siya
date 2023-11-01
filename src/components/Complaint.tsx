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
  CheckIcon,
  EmailIcon,
  DownloadIcon,
} from "@chakra-ui/icons"
import {
  useState
} from "react"

import UserMessage from "../interfaces/UserMessage"
import {
  useWebApi,
} from "../common/WebApi"
import {
  useCredentials
} from "../contexts/Credentials"
import {
  useConfiguration
} from "../contexts/Configuration"

const Complaint = ({ message }: { message: UserMessage }) => {
  const toast = useToast()

  const creds = useCredentials()
  const conf = useConfiguration()
  const webApi = useWebApi(conf, creds)

  const [importance, setImportance] = useState(message.importance ?? 0)
  const updateImportance = (id: number, importance: number) => {
    webApi.setFeedbackImportance(id, importance)
      .catch((err) => toast(err))
  }
  const mailTo = (email: string) => {
    window.location.href = `mailto:${email}`
  }
  const getAttachment = (id: number) => {
    window.open(
      `${conf.baseUrlFor("SHOWCASE_API")}feedback/getImgById?email=${creds.data?.email}&password=${creds.data?.password}&id=${id}`,
    '_blank');
  }

  return (
    <Tr>
      <Td>
        {message.email}
        <Tooltip label="contacter">
          <IconButton
            mx={2}
            aria-label="contacter"
            variant="ghost"
            colorScheme="blue"
            onClick={() => mailTo(message.email)}
            icon=<EmailIcon />
          />
        </Tooltip>
      </Td>
      <Td>{message.date}</Td>
      <Td maxW={80}>{message.content}</Td>
      <Td maxW={80}>
        <Tooltip label="document">
          <IconButton
            mx={2}
            aria-label="document"
            variant="ghost"
            colorScheme="blue"
            isDisabled={message.file === ''}
            onClick={() => getAttachment(message.id)}
            icon=<DownloadIcon />
          />
        </Tooltip>
      </Td>
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
