import { Center, HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TAppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'

export const Exercise = () => {
  const navigation = useNavigation<TAppNavigatorRoutesProps>()
  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack
        px={8}
        bg="gray.600"
        pt={12}
      >
        <TouchableOpacity
          onPress={handleGoBack}
        >
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text
              color="gray.200"
              ml={1}
              textTransform="capitalize"
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRejiKHVdNS4RTek4sQpksVGIO0XwLUmkrWbg&usqp=CAU" }}
          alt='Nome do exercício'
          mb={3}
          resizeMode='cover'
          rounded="lg"
        />
      </VStack>
    </VStack >
  )
}
