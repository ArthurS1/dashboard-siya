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

import Rating from "@components/Rating"
import Feedback from "@interfaces/Feedback.interface"
import {
  apiGet,
} from "@common/ApiCall"

enum Importance {
  Unused,
  Urgent,
  Important,
  Useless,
}

const UserFeedback = (f: Feedback) => {
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
      {
        email: "", // TODO
        pass: "", // TODO
      }
    )
  }

  return (
    <Tr key={f.id}>
      <Td>{f.email}</Td>
      <Td>{f.date}</Td>
      <Td>
        <Rating value={f.importance !== null ? f.importance : 0 } />
      </Td>
      <Td>{f.content}</Td>
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
            onClick={() => console.log('test')}
            icon=<CheckIcon />
          />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  )
}
