import { Center, Heading } from "native-base"

interface IScreenHeader {
  title: string
}

export const ScreenHeader = ({ title }: IScreenHeader) => {
  return (
    <Center
      bg="gray.600"
      pb={6}
      pt={16}
    >
      <Heading
        color="gray.100"
        fontFamily="heading"
        fontSize="xl"
      >
        {title}
      </Heading>
    </Center>
  )
}
