import {
  StarIcon
} from "@chakra-ui/icons"

const Rating = ({value}: {value: number}) => {
  const stars = value > 6 ? 5 : value

  return (
    <>
      { [...Array(stars)].map(_ => (<StarIcon m="1px" boxSize={3} />)) }
    </>
  )
}

export default Rating
