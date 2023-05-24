import { HStack, Heading, Text, VStack } from 'native-base'
import React from 'react'

export const HomeHeader = () => {
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <VStack>
        <Text
          color="gray.100"
          fontSize="md"
        >
          Olá
        </Text>
        <Heading
          color="gray.100"
          fontSize="md"
        >
          Alan
        </Heading>
      </VStack>
    </HStack>
  )
}
