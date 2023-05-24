import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

interface IExerciseCard extends TouchableOpacityProps {

}

export const ExerciseCard = ({ ...props }: IExerciseCard) => {
  return (
    <TouchableOpacity
      {...props}
    >
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRejiKHVdNS4RTek4sQpksVGIO0XwLUmkrWbg&usqp=CAU" }}
          alt='Image do exercício'
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode='center'
        />

        <VStack flex={1}>
          <Heading
            fontSize="lg"
            color="white"
          >
            Remada curvada
          </Heading>

          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}
