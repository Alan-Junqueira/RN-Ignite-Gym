import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { IExerciseDTO } from '@dtos/ExerciseDTO'

interface IExerciseCard extends TouchableOpacityProps {
  data: IExerciseDTO
}

export const ExerciseCard = ({data, ...props }: IExerciseCard) => {
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
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading
            fontSize="lg"
            color="white"
            fontFamily="heading"
          >
            {data.name}
          </Heading>

          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {data.series} séries x {data.repetitions} repetições
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
