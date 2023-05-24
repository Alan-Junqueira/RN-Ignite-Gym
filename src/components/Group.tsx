import { Text } from "native-base"

interface IGroup {
  name: string
}

export const Group = ({ name }: IGroup) => {
  return (
    <Text
      color="gray.200"
      textTransform="uppercase"
      fontSize="xs"
      fontWeight="bold"
    >{
        name}
    </Text>
  )
}
